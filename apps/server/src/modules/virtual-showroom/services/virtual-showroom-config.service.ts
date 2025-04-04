import { Injectable } from "@nestjs/common";

import { Image } from "src/entities";
import { ImageService } from "src/modules/image/services/image.service";
import { VirtualShowroomConfig } from "../models/virtual-showroom-config.model";
import { VirtualShowroomConfigRepository } from "../repositories/virtual-showroom-config.repository";

@Injectable()
export class VirtualShowroomConfigService {

    constructor(
        private readonly virtualShowroomConfigRepository: VirtualShowroomConfigRepository,
        private readonly imageService: ImageService
    ) { }

    public async getConfigByVS(virtualShowroomId?: string){
        if (!virtualShowroomId) return null
        
        return await this.virtualShowroomConfigRepository.findBy({ 
            virtualShowroom: {
                _id: virtualShowroomId
            }
         })
    }

    public async getConfig(configId: string){
        return await this.virtualShowroomConfigRepository.findOne(configId)
    }

    public async create(){
        const config = await this.virtualShowroomConfigRepository.create({})
        return await this.virtualShowroomConfigRepository.save(config)
    }

    public async updateConfig(configId: string | null, data: Partial<VirtualShowroomConfig>){
        let config: VirtualShowroomConfig | null = null
        if (configId){
            config = await this.getConfigByVS(configId)
        }

        let newImages = new Set<Image>();
        try {
            const images = this.extractPanelImages(data)
            newImages = new Set(images)
            await this.imageService.saveMany(images)
        }
        catch (e){
            console.log(e)
            return null
        }

        if (!config) {
            config = await this.virtualShowroomConfigRepository.create({
                ...data
            })
        }
        else {
            const images = this.extractPanelImages(config)
            const oldImages = new Set(images)

            const difference = oldImages.difference(newImages)

            console.log(difference)

            config = {
                ...config,
                ...data
            }

        }

        const update = await this.virtualShowroomConfigRepository.save(config)
        return update
    }

    private extractPanelImages(config: Partial<VirtualShowroomConfig>): Image[]{
        const { cardImageOne, cardImageTwo, cardImageThree, cardImageFour } = config
        const images = [cardImageOne, cardImageTwo, cardImageThree, cardImageFour].filter((image) => image !== undefined)
        return images
    }
}
