import { Injectable } from "@nestjs/common";

import { Image } from "src/entities";
import { ImageService } from "src/modules/image/services/image.service";
import { VirtualShowroomConfig } from "../models/virtual-showroom-config.model";
import { VirtualShowroomConfigRepository } from "../repositories/virtual-showroom-config.repository";
import { VirtualShowroomService } from "./virtual-showroom.service";

@Injectable()
export class VirtualShowroomConfigService {

    constructor(
        private readonly virtualShowroomConfigRepository: VirtualShowroomConfigRepository,
        private readonly virtualShowroomService: VirtualShowroomService,
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

    public async updateConfig(virtualShowroomId: string, data: Partial<VirtualShowroomConfig>): Promise<{
        unusedImages: Image[]
    } | null>{
        let config = await this.getConfigByVS(virtualShowroomId)
        let unusedImages: Image[] = []

        try {
            const images = this.extractPanelImages(data)
            images.length > 0 && await this.imageService.saveMany(images)
        }
        catch (e){
            console.log(e)
            return null
        }

        if (!config) {
            config = await this.virtualShowroomConfigRepository.create({
                ...data
            })
            this.virtualShowroomService.connectConfig(virtualShowroomId, config)
            await this.virtualShowroomConfigRepository.save(config)
            return { unusedImages }
        }
        else {
            const oldConfig = structuredClone(config)

            config = {
                ...config,
                ...data
            }

            await this.virtualShowroomConfigRepository.save(config)

            unusedImages = this.getUnusedImages(oldConfig, config)

            try {
                await this.imageService.removeMany(unusedImages)
                return { unusedImages }
            }
            catch (e){
                console.log(e)
                return null
            }
        }
    }

    private extractPanelImages(config: Partial<VirtualShowroomConfig>): Image[]{
        const { cardImageOne, cardImageTwo, cardImageThree, cardImageFour } = config
        const images = [cardImageOne, cardImageTwo, cardImageThree, cardImageFour].filter((image) => image !== undefined)
        return images
    }

    private getUnusedImages(oldConfig: VirtualShowroomConfig, newConfig: VirtualShowroomConfig): Image[]{
        const oldImages = this.extractPanelImages(oldConfig)
        const newImages = this.extractPanelImages(newConfig)

        // THIS IS O^2 BUT IT'S NOT THAT BAD BECAUSE THERE ARE ONLY FOUR IMAGES
        const difference = oldImages.filter((image) => {
            if (!image) return false
            const isOnNew = newImages.find(newImage => newImage?._id === image._id)
            return !isOnNew
        })

        return difference
    }
}
