import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Image } from 'src/entities';
import { CreateImageDto } from '../dto';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
    ) { }

    create(image: CreateImageDto) {
        return this.imageRepository.create(image);
    }

    async save(image: Image) {
        return await this.imageRepository.save(image);
    }

    async remove(image: Image) {
        return await this.imageRepository.remove(image);
    }

    /**
     * @deprecated Use create instead
     */
    async addImage(image: Image) {
        console.log(image)
        const newImage = this.imageRepository.create(image);
        return await this.imageRepository.save(newImage);
    }

    async removeImageById(_id: string | undefined) {

        if (!_id) {
            return
        }

        const image = await this.imageRepository.findOneBy({
            _id,
        });
        if (!image) throw new Error('Something went wrong');
        return await this.imageRepository.delete({
            _id,
        });
    }
}
