import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageController } from './controllers';

import { Utils } from 'src/utilities';
import { ImageService } from './services';

import { Image } from 'src/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Image])],
    controllers: [ImageController],
    providers: [ImageService, Utils],
    exports: [ImageService],
})
export class ImageModule { }
