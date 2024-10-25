import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseInterceptors
} from '@nestjs/common';

import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

import { Cookies } from 'src/decorators/cookie.decorator';

import { ImageService } from 'src/modules/image/services/image.service';
import { AuthService } from 'src/services/auth.service';
import { TokenService, Utils } from 'src/utilities';
import { BatchService, LocationProductService, ProductsService } from '../services';

import { addMonth } from '@formkit/tempo';
import { Image, LocationProduct, ProductBatch } from 'src/entities';
import { ResponseInterceptor } from 'src/interceptors';
import { CreateBatchClientDto, CreateLocationProductDto, CreateProductClientDto, CreateProductServerDto, EditProductClientDto } from '../dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly batchesService: BatchService,
    private readonly utils: Utils,
    private readonly tokenService: TokenService,
    private readonly locationProductService: LocationProductService,
    private readonly authService: AuthService,
    private readonly imageService: ImageService
  ) { }

  // #region REFACTOR
  @Get()
  async getProducts(
    @Query() query: {
      take: string, skip: string, name: string, location: string, orderBy: {
        tag: string,
        order: 'ASC' | 'DESC',
      }, category: string
    },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const cookie = req.cookies['session'];
    const payload = this.tokenService.decodeCookie(cookie);
    if (!payload) {
      return res.status(404).json({ message: 'No route found' });
    }

    const location = query.location ? query.location : '';
    const take = query.take ? +query.take : 10;
    const skip = query.skip ? +query.skip : 0;
    const name = query.name ? query.name : undefined;
    const orderBy = query.orderBy ? query.orderBy : {
      order: 'ASC' as 'ASC' | 'DESC',
      tag: ''
    };
    const category = query.category ? query.category : '';

    const products = this.productsService.getProducts(payload.shop._id, { take, skip, name, orderBy, category, location });
    return this.utils.adaptResponse(products, res);
  }

  // #region CREATE PRODUCT
  @Post()
  async createProduct(
    @Body() product: CreateProductClientDto,
    @Cookies('session') session: string
  ) {

    const user = this.authService.decodeCookie(session)
    if (!user) throw new ForbiddenException()

    const productId = randomUUID()

    const locationsProducts = this.locationProductService.createMany(
      product.locations.map(location => ({
        productId,
        ...location
      }))
    )

    try {
      await this.locationProductService.saveMany(locationsProducts)
    } catch {
      throw new InternalServerErrorException('Error saving locations products', {
        cause: new Error('Error saving locations products'),
        description: 'Error saving locations products'
      })
    }

    let batches: ProductBatch[] | undefined = undefined
    if (product.batches && product.batches?.length > 0 && product.batchEnabled) {
      const mappedBatches = this.batchesService.addLocationsProducts(
        locationsProducts,
        product.batches
      )
      batches = await this.batchesService.createMany(mappedBatches)
      try {
        await this.batchesService.saveMany(batches)
      }
      catch {
        await this.locationProductService.removeMany(locationsProducts)
        throw new InternalServerErrorException('Error saving batches', {
          cause: new Error('Error saving batches'),
          description: 'Error saving batches'
        })
      }
    }

    let image: Image | undefined = undefined
    if (product.image) {
      image = this.imageService.create(product.image)
      try {
        await this.imageService.save(image)
      }
      catch {
        await this.locationProductService.removeMany(locationsProducts)
        batches && await this.batchesService.removeMany(batches)
        throw new InternalServerErrorException('Error saving image', {
          cause: new Error('Error saving image'),
          description: 'Error saving image'
        })
      }
    }

    const stock = locationsProducts.reduce((acc, locationProduct) => acc + locationProduct.stock, 0)

    const productToCreate: CreateProductServerDto = {
      _id: productId,
      batchEnabled: product.batchEnabled ? 1 : 0,
      category: {
        _id: product.category
      },
      code: String(product.code),
      locations: locationsProducts,
      name: product.name,
      price: product.price,
      shop: user.shop,
      stock: stock,
      image: image,
      cost: product.cost
    }

    const productCreated = this.productsService.create(productToCreate)
    try {
      return await this.productsService.save(productCreated)
    }
    catch (error) {
      batches && await this.batchesService.removeMany(batches)
      await this.locationProductService.removeMany(locationsProducts)
      image && await this.imageService.remove(image)
      throw new InternalServerErrorException('Error saving product', {
        cause: new Error('Error saving product'),
        description: 'Error saving product'
      })
    }
  }

  // #region REFACTOR 
  @Get('id/:id')
  async getProductById(
    @Param() param: { id: string },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const cookie = req.cookies['session'];
    const payload = this.tokenService.decodeCookie(cookie);
    if (!payload) {
      return res.status(404).json({ message: 'No route found' });
    }
    const product = this.productsService.getProductById(param.id, payload.shop._id);
    return this.utils.adaptResponse(product, res);
  }

  // #region EDIT PRODUCT
  @Put('id/:id')
  async editProduct(
    @Body() product: EditProductClientDto,
    @Cookies('session') session: string,
    @Param() param: { id: string },
  ) {
    const user = this.authService.decodeCookie(session)
    if (!user) throw new ForbiddenException()

    if (product._id !== param.id) {
      throw new BadRequestException()
    }

    const productExists = await this.productsService.exist(product._id, user.shop._id)

    if (!productExists) {
      throw new BadRequestException()
    }

    const locations = {
      created: [] as LocationProduct[],
      uncreated: [] as Omit<CreateLocationProductDto, 'productId'>[]
    }
    for (const location of product.locations) {
      if ((location as LocationProduct)._id) {
        locations.created.push(location as LocationProduct)
      }
      else {
        locations.uncreated.push(location as Omit<CreateLocationProductDto, 'productId'>)
      }
    }
    const newLocations = this.locationProductService.createMany(locations.uncreated.map(location => ({
      ...location,
      productId: product._id
    })))

    const productLocations = locations.created.concat(newLocations)
    const allLocations = await this.locationProductService.findByProductId(product._id)

    const unusedLocations = allLocations.filter(location => !productLocations.find(productLocation => productLocation._id === location._id))

    // * REMOVED UNUSED LOCATIONS BELOW BECAUSE WE NEED TO REMOVE THE UNUSED BATCHES FIRST
    try {
      await this.locationProductService.saveMany(productLocations)
    }
    catch {
      throw new InternalServerErrorException('Error saving locations', {
        cause: new Error('Error saving locations'),
        description: 'Error saving locations'
      })
    }

    if (product.batchEnabled) {
      const batches = {
        created: [] as ProductBatch[],
        uncreated: [] as CreateBatchClientDto[]
      }

      let productBatches: ProductBatch[] = []
      if (product.batches && product.batches?.length > 0) {
        for (const batch of product.batches) {
          if ((batch as ProductBatch)._id) {
            batches.created.push({
              ...batch,
              expirationDate: new Date(batch.expirationDate)
            } as ProductBatch)
          }
          else {
            batches.uncreated.push(batch as CreateBatchClientDto)
          }
        }

        let newBatches = [] as ProductBatch[]

        if (batches.uncreated.length > 0) {
          const mappedBatches = this.batchesService.addLocationsProducts(
            productLocations,
            batches.uncreated
          )

          newBatches = await this.batchesService.createMany(mappedBatches)
        }

        productBatches = batches.created.concat(newBatches)
      }

      const allBatches = await this.batchesService.getByProductId(product._id)
      const unusedBatches = allBatches.filter(batch => !productBatches.find(productBatch => productBatch._id === batch._id))

      const save = this.batchesService.saveMany(productBatches)
      const remove = this.batchesService.removeMany(unusedBatches)
      try {
        await Promise.all([save, remove])
      }
      catch {
        await this.locationProductService.removeMany(productLocations)
        await this.locationProductService.saveMany(allLocations)

        await this.batchesService.removeMany(productBatches)
        await this.batchesService.saveMany(allBatches)

        throw new InternalServerErrorException('Error saving batches', {
          cause: new Error('Error saving batches'),
          description: 'Error saving batches'
        })
      }
    } else {
      try {
        const allBatches = await this.batchesService.getByProductId(product._id)
        await this.batchesService.removeMany(allBatches)
      }
      catch {
        await this.locationProductService.removeMany(productLocations)
        await this.locationProductService.saveMany(allLocations)

        throw new InternalServerErrorException('Error removing batches', {
          cause: new Error('Error removing batches'),
          description: 'Error removing batches'
        })
      }
    }

    // * REMOVED HERE BECAUSE WE NEED TO REMOVE THE UNUSED BATCHES FIRST
    try {
      await this.locationProductService.removeMany(unusedLocations)
    }
    catch {

      await this.locationProductService.removeMany(productLocations)
      await this.locationProductService.saveMany(allLocations)

      throw new InternalServerErrorException('Error removing unused locations', {
        cause: new Error('Error removing unused locations'),
        description: 'Error removing unused locations'
      })
    }

    if (product.image) {
      const image = this.imageService.create(product.image)
      try {
        await this.imageService.save(image)
      }
      catch {
        await this.locationProductService.removeMany(productLocations)
        await this.locationProductService.saveMany(allLocations)

        throw new InternalServerErrorException('Error saving image', {
          cause: new Error('Error saving image'),
          description: 'Error saving image'
        })
      }
    }

    const updatedProductProposal: CreateProductServerDto = {
      _id: product._id,
      batchEnabled: product.batchEnabled ? 1 : 0,
      category: {
        _id: product.category
      },
      code: String(product.code),
      cost: product.cost,
      locations: productLocations,
      name: product.name,
      price: product.price,
      shop: user.shop,
      stock: productLocations.reduce((acc, location) => acc + location.stock, 0),
      image: product.image
    }

    const updatedProduct = this.productsService.create(updatedProductProposal)

    try {
      await this.productsService.save(updatedProduct)
    }
    catch {
      await this.locationProductService.removeMany(productLocations)
      await this.locationProductService.saveMany(allLocations)

      throw new InternalServerErrorException('Error saving product', {
        cause: new Error('Error saving product'),
        description: 'Error saving product'
      })
    }
  }

  @UseInterceptors(new ResponseInterceptor())
  @Delete(':id')
  async deleteProduct(
    @Param() param: { id: string },
    @Cookies('session') session: string
  ) {
    const user = this.authService.decodeCookie(session)

    if (!user) {
      throw new UnauthorizedException()
    }

    if (!param.id) {
      throw new NotFoundException()
    }

    const product = await this.productsService.getProductById(param.id, user.shop._id)

    if (!product) {
      throw new NotFoundException()
    }



    const batches = product.locations.flatMap((location) => location.productBatches)
    const removeBatches = this.batchesService.removeMany(batches)

    const locations = this.locationProductService.removeMany(product.locations)

    try {
      await Promise.all([removeBatches, locations])
      await this.productsService.remove(product)
      await this.imageService.removeImageById(product.image?._id)
    }
    catch (err) {
      throw new InternalServerErrorException('Error removing batches', {
        cause: new Error('Error removing batches'),
        description: 'Error removing batches'
      })
    }

    return {
      success: true
    }
  }

  // #region REFACTOR
  @Get('best-sellers')
  async getBestSellers(
    @Query() query: { take: string, skip: string },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const cookie = req.cookies['session'];
    const payload = this.tokenService.decodeCookie(cookie);
    if (!payload) {
      return res.status(404).json({ message: 'No route found' });
    }
    const products = this.productsService.getBestSellers(payload.shop._id, +query.take, +query.skip);
    return this.utils.adaptResponse(products, res);
  }

  @UseInterceptors(new ResponseInterceptor())
  @Get("by-location")
  async getProductsByLocation(
    @Cookies('session') session: string,
    @Query() query: { location: string, take: number, skip: number, name: string, code: string },
  ) {
    const user = this.authService.decodeCookie(session);
    if (!user) {
      throw new UnauthorizedException();
    }

    const take = query.take ? +query.take : 10;
    const skip = query.skip ? +query.skip : 0;
    const name = query.name ? query.name : '';
    const data = await this.productsService.getProductsByLocation(query.location, take, skip, name, query.code);
    return data
  }

  @Get('print')
  async printProducts(
    @Res() res: Response,
    @Req() req: Request,
    @Query() query: { location: string },
  ) {
    const cookie = req.cookies['session'];
    const payload = this.tokenService.decodeCookie(cookie);
    if (!payload) {
      return res.status(404).json({ message: 'No route found' });
    }
    const products = this.productsService.getProductsToPrint(query.location, payload.shop._id);
    return this.utils.adaptResponse(products, res);
  }

  @Get('inventory-cut-off')
  async getInventoryCutOff(
    @Res() res: Response,
    @Req() req: Request,
    @Body() body: {
      location: string,
      from: string,
      to: string,
      onlySoldProducts: 'on' | 'off',
    },
  ) {
    const session = req.cookies['session'];
    const payload = this.tokenService.decodeCookie(session);
    if (!payload) {
      return res.status(404).json({ message: 'No route found' });
    }
    const products = this.productsService.getInventoryCutOff(body, payload.shop._id);
    return this.utils.adaptResponse(products, res);
  }

  @Put('edit-locations/:id')
  async addLocation(
    @Body() body: { locations: LocationProduct[] },
    @Param() param: { id: string },
    @Res() res: Response,
  ) {
    const product = this.productsService.editLocationsProduct(
      body.locations,
      param.id,
    );
    return this.utils.adaptResponse(product, res);
  }

  @Get('batches')
  async getBatches(
    @Cookies('session') session: string,
  ) {
    const user = this.authService.decodeCookie(session)
    if (!user) throw new ForbiddenException()
    const initialDate = new Date()
    const finalDate = addMonth(initialDate, 4)
    const batches = await this.productsService.getProductsInDateRange({
      shopId: user.shop._id,
      startDate: initialDate,
      endDate: finalDate
    });
    return batches;
  }
}