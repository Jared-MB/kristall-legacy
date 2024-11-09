import { Controller, Delete, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Utils } from '@kristall/server/src/utilities';
import { ImageService } from '../services/image.service';

@Controller('image')
export class ImageController {
    constructor(
        private readonly imageService: ImageService,
        private readonly utils: Utils,
    ) { }

    @Delete('delete-image/:id')
    async deleteImage(@Param() param: { id: string }, @Res() res: Response) {
        const image = this.imageService.removeImageById(param.id);
        return this.utils.adaptResponse(image, res);
    }

    // @Post('add-image')
    // async addImage(@Res() res: Response, @Body() body: { image: File }) {
    //   const image = this.imageService.addImage(body.image);
    //   return this.utils.adaptResponse(image, res);
    // }
}
