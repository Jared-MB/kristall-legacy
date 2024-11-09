import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { randomUUID } from 'crypto';
import { DataSource, ILike, Repository } from 'typeorm';

import { ImageService } from '@kristall/server/src/modules/image/services/image.service';
import { Utils } from '@kristall/server/src/utilities';

import { Image, Location, LocationProduct, Product, ProductBatch, Shop } from '@kristall/server/src/entities';
import { CreateProductServerDto, DateRangeDto } from '../dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(LocationProduct)
    private readonly locationProductRepository: Repository<LocationProduct>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly utils: Utils,
    private readonly imageService: ImageService,
    private dataSource: DataSource
  ) { }

  create(product: CreateProductServerDto) {
    return this.productRepository.create(product);
  }

  save(product: Product) {
    return this.productRepository.save(product);
  }

  /**
   * Update a Product by its id
   * @param id The id of the product
   * @param product The new data to update
   * @returns The updated product
   */
  update(id: string, product: Partial<Product>) {
    return this.productRepository.update({
      _id: id
    }, product);
  }

  exist(_id: string, shopId: string) {
    return this.productRepository.exists({
      where: {
        _id,
        shop: {
          _id: shopId
        }
      }
    })
  }

  remove(product: Product) {
    return this.productRepository.remove(product)
  }

  // #region Get Products To Print
  async getProductsToPrint(location: string, shopId: string) {
    // const products = await this.productRepository.find({
    //   where: {
    //     shop: { _id: shopId },
    //     locations: {
    //       locationId: location,
    //     }
    //   },
    //   select: {
    //     _id: true,
    //     name: true,
    //     price: true,
    //     locations: {
    //       stock: true,
    //       locationId: true,
    //     }
    //   },
    //   relationLoadStrategy: 'join',
    // });
    // return products;
    try {
      const products = await this.dataSource
        .getRepository('product')
        .createQueryBuilder('product')
        .innerJoin('location_product', 'location_product', 'location_product."productId" = product._id')
        .select(['product._id AS _id', 'product.name AS name', 'product.price AS price', 'location_product.stock AS stock'])
        .where('location_product."locationId" = :location', { location })
        .andWhere('product.shop_id = :shopId', { shopId })
        .getRawMany();

      // .andWhere('location_product.location_id = :location', { location })
      // .subQuery()
      // .select('location_product.stock', 'stock')
      // .addSelect('location_product.location_id', 'locationId')
      // .from(LocationProduct, 'location_product')
      // .where('location_product.product_id = product._id')
      // .andWhere('location_product.location_id = :location', { location })
      console.log(products);
      return products;
    }
    catch (error) {
      console.log(error);
      throw new Error('Something went wrong');
    }
  }

  // #region Get Inventory CutOff
  async getInventoryCutOff(payload: {
    location: string,
    from: string,
    to: string,
    onlySoldProducts: 'on' | 'off',
  }, shopId: string) {

  }

  // #region Add Product To DB
  /**
   * @deprecated
   */
  async addProductToDB(product: Product & { batches?: Pick<ProductBatch, 'expirationDate' | 'locationProduct' | 'stock'>[] }, shop: Shop) {
    const _id = await this.utils.generateUUID();
    product._id = _id;
    product.shop = shop;

    // ADD LOCATIONS
    const locations = [] as LocationProduct[]

    const locationsProduct = product.locations.map((location) => {
      location._id = randomUUID();
      location.productId = _id;
      locations.push(location)
      return this.locationProductRepository.save(location);
    })

    product.stock = product.locations.reduce((acc, location) => acc + location.stock, 0);
    product.locations = locations;

    await Promise.all(locationsProduct);

    // ADD BATCHES IF IS INDICATED
    // if (product.batchEnabled && product?.batches) {
    //   const batches = product.batches.map((batch) => {
    //     const location = locations.find(location => location.locationId === batch.locationProduct.locationId)
    //     if (!location) {
    //       throw new Error('Location not found')
    //     }
    //     return this.batchService.createAndSave({
    //       expirationDate: batch.expirationDate,
    //       locationProduct: location,
    //       stock: batch.stock,
    //     })
    //   })
    //   await Promise.all(batches)
    // }

    let image = null;
    try {
      if (product.image) {
        image = await this.imageService.addImage(product.image);
        product.image = image;
      }
      const newProduct = this.productRepository.create(product);
      return await this.productRepository.save(newProduct);
    }
    catch (error) {
      if (image) {
        await this.imageRepository.delete({
          _id: image._id,
        });
      }
      await this.locationProductRepository.delete({
        productId: _id,
      });
      throw new Error('Something went wrong');
    }
  }

  // #region Edit Locations Product
  /**
  * @deprecated
  */
  async editLocationsProduct(locations: LocationProduct[], productId: string) {
    const product = await this.productRepository.findOne({
      where: { _id: productId },
      relations: ['image', 'locations', 'category'],
    });
    if (!product) throw new Error('Something went wrong');

    const oldLocations = product.locations.map((location) => {
      const loc = locations.find(
        (ploc) => ploc.locationId === location.locationId,
      );
      if (loc) {
        location.stock = loc.stock;
        return location;
      }
      return location;
    });

    // Check if the locations already exist in the db an return the new ones
    const newLocations = locations.filter(
      (location) =>
        !product.locations.some(
          (loc) =>
            loc._id === location._id || loc.locationId === location.locationId,
        ),
    );

    const newLocationsWithIds = newLocations.map((location) => {
      const id = randomUUID();
      location._id = id;
      return location;
    });

    const locationsToSave = newLocationsWithIds.map((location) =>
      // Save the new locations in the db to prevent foreign key error
      this.locationProductRepository.save(location),
    );

    // Wait for the locations to be saved
    await Promise.all(locationsToSave);

    const updatePromises = oldLocations.map((location) =>
      this.locationProductRepository.update(
        { _id: location._id },
        { stock: location.stock },
      ),
    );

    await Promise.all(updatePromises);

    const allLocations = [...oldLocations, ...newLocationsWithIds];

    // Reassign the locations to the product with the new ones already saved

    let stock = 0;
    allLocations.forEach((location) => {
      stock += location.stock;
    });

    product.locations = allLocations;
    product.stock = stock;

    // Save the product with the new locations
    const newProduct = this.productRepository.create(product);
    await this.productRepository.save(newProduct);
    return product;
  }

  /**
  * @deprecated
  */
  async editProductInDB(product: Product) {

    const isProductInDB = await this.productRepository.exist({
      where: { _id: product._id }
    })

    if (!isProductInDB) {
      throw new Error('Product not found')

    }

    const unsavedLocations = product.locations.map(location => {
      if (!location._id) {
        return this.locationProductRepository.create({
          ...location,
          _id: randomUUID(),
        })
      }
      return location
    })

    try {
      await this.locationProductRepository.save(unsavedLocations);
    }
    catch (error) {
      console.log('Error saving locations', error)
      throw new Error('Something went wrong')
    }

    const locations = await this.locationProductRepository.find({
      where: {
        productId: product._id
      }
    })

    const unusedLocations = locations.filter(location => !unsavedLocations.some(unsavedLocation => unsavedLocation._id === location._id))
    try {
      unsavedLocations.length > 0 && await this.locationProductRepository.remove(unusedLocations)

    }
    catch (error) {
      console.log('Error removing locations', error)
      throw new Error('Something went wrong')
    }

    product.updatedAt = new Date();
    product.locations = unsavedLocations;

    if (product.image) {
      const image = await this.imageService.addImage(product.image);
      product.image = image;
    }

    try {
      return await this.productRepository.save(product);
    }
    catch (error) {
      console.log('Error saving product', error)
      throw new Error('Something went wrong')
    }
  }

  /**
  * @deprecated
  */
  async deleteProductFromDB(_id: string, token: string) {
    const product = await this.productRepository.findOne({
      where: { _id },
      relations: ['image', 'locations'],
    });
    if (!product) throw new Error('Something went wrong');
    await this.locationProductRepository.delete({
      productId: _id,
    });
    await this.productRepository.delete({
      _id,
    });
    await this.imageRepository.delete({
      _id: product.image._id,
    });
    return;
  }

  /**
  * @deprecated
  */
  async getProducts(shopId: string, options: {
    take: number,
    skip: number,
    name?: string,
    category?: string,
    orderBy?: {
      tag: string,
      order: 'ASC' | 'DESC'
    },
    location?: string
  }) {
    const { take, skip, name, category, orderBy = {
      tag: 'createdAt',
      order: 'ASC'
    } } = options;

    const count = await this.productRepository.count({
      where: {
        shop: { _id: shopId },
        category: category ? { _id: category } : undefined,
        name: name ? ILike(`%${name}%`) : undefined,
        locations: options.location ? { locationId: options.location } : undefined
      },
    })
    const products = await this.productRepository.find({
      where: {
        shop: { _id: shopId },
        category: category ? { _id: category } : undefined,
        name: name ? ILike(`%${name}%`) : undefined,
        locations: options.location ? { locationId: options.location } : undefined
      },
      relations: ['image', 'locations', 'category'],
      // order: {
      //   [orderBy.tag]: orderBy.order
      // },
      take,
      skip,
    });

    // let filteredProducts = [...products]
    // if (name) {
    //   filteredProducts = products.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()));
    // }

    // const count = filteredProducts.length;

    return {
      entities: products,
      next: products.length === take ? skip + take : null,
      previous: skip - take >= 0 ? skip - take : null,
      page: Math.ceil(skip / take) + 1,
      hasMore: count > skip + take,
      totalPages: Math.ceil(count / take)
    };
  }

  async getProductById(productId: string, shopId: string) {
    const product = await this.productRepository.findOne({
      where: { _id: productId, shop: { _id: shopId } },
      // relations: ['image', 'locations', 'category'],
      relations: {
        locations: {
          productBatches: {
            locationProduct: true,
          }
        },
        image: true,
        category: true
      },
    });

    return product;
  }

  async getBestSellers(shopId: string, take: number = 10, skip: number = 0) {
    const products = await this.productRepository.find({
      where: {
        shop: { _id: shopId },
      },
      order: {
        totalSales: 'DESC',
      },
      take,
      skip,
      select: ['_id', 'name', 'totalSales'],
    });
    return products;
  }

  /**
  * @deprecated
  */
  async getProductsByLocation(locationId: string, take?: number, skip = 0, name?: string, code?: string) {

    if (!locationId) {
      return []
    }

    const products = await this.productRepository.find({
      where: {
        locations: {
          locationId,
        },
      },
      relations: ['image', 'locations'],
      take,
      skip,
      select: {
        _id: true,
        name: true,
        code: true,
        stock: true,
        price: true,
        cost: true,
      }
    });

    let filteredProducts = products.map(product => {
      const { locations, ...rest } = product

      const location = locations.find(location => location.locationId === locationId)

      return {
        ...rest,
        stock: location?.stock
      }
    });

    if (name) {
      filteredProducts = filteredProducts.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()));
    }
    else if (code) {
      filteredProducts = filteredProducts.filter((product) => product.code.toLowerCase().includes(code.toLowerCase()));
    }

    return filteredProducts
  }

  async getProductsForPublic(shopId: string, take: number = 10, skip: number = 0) {
    const products = await this.productRepository.find({
      where: {
        shop: { _id: shopId },
      },
      relations: ['image', 'category'],
      order: {
        name: 'ASC',
      },
      skip,
      take,
    });
    return products;
  }

  /**
   * 
   * @deprecated
   */
  async getBestSellersProductsForPublic(shopId: string, take = 10, skip = 0) {
    const products = await this.productRepository.find({
      where: {
        shop: { _id: shopId },
      },
      relations: ['image', 'category'],
      order: {
        totalSales: 'DESC',
      },
      take,
      skip,
    });
    return products;
  }

  async getNewestProductsForPublic(shopId: string, take = 10, skip = 0) {
    const products = await this.productRepository.find({
      where: {
        shop: { _id: shopId },
      },
      relations: ['image', 'category'],
      order: {
        createdAt: 'DESC',
      },
      take,
      skip,
    });
    return products;
  }

  async getProductsInDateRange(getProductsDto: DateRangeDto): Promise<any> {
    const { shopId, startDate, endDate } = getProductsDto;

    const products = await this.productRepository.createQueryBuilder('product')
      .innerJoin('product.shop', 'shop')
      .innerJoin('product.locations', 'locationProduct')
      .innerJoin('locationProduct.productBatches', 'productBatch')
      .where('shop._id = :shopId', { shopId })
      .andWhere('productBatch.expirationDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .select([
        'product._id AS "productId"',
        'product.name AS name',
        'product.price AS price',
        'productBatch.stock AS stock',
        'productBatch.expirationDate AS "expirationDate"',
        'productBatch.locationProduct AS "locationProduct"',
        'productBatch._id AS "_id"'
      ])
      .orderBy('productBatch.expirationDate', 'ASC')
      .getRawMany() as {
        productId: string,
        name: string,
        price: number,
        stock: number,
        expirationDate: Date,
        locationProduct: string
        _id: string
      }[];

    const promisesProducts = products.map(async product => {
      const locationProduct = await this.locationProductRepository.findOne({
        where: {
          _id: product.locationProduct,
        }
      });

      if (!locationProduct) {
        throw new Error('Location product not found')
      }

      const locationName = await this.locationRepository.findOne({
        where: {
          _id: locationProduct.locationId
        },
        select: {
          name: true
        }
      })

      return {
        ...product,
        locationProduct: locationName?.name
      }
    })

    const productsWithLocation = await Promise.all(promisesProducts)

    const productsByDate: {
      [key: string]: any[]
    } = {}

    for (const product of productsWithLocation) {
      if (productsByDate[product.expirationDate.toDateString()] === undefined) {
        productsByDate[product.expirationDate.toDateString()] = []
      }
      productsByDate[product.expirationDate.toDateString()].push(product)
    }

    return productsByDate;
  }

}
