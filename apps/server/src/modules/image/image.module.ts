import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageController } from './controllers';

import { Utils } from '@kristall/server/src/utilities';
import { ImageService } from './services';

import { Image } from '@kristall/server/src/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Image])],
    controllers: [ImageController],
    providers: [ImageService, Utils],
    exports: [ImageService],
})
export class ImageModule { }
