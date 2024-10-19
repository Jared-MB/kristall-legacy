import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSettingServerDto } from '../dtos';
import { Setting } from '../models';

@Injectable()
export class SettingsService {

    constructor(
        @InjectRepository(Setting)
        private readonly settingRepository: Repository<Setting>
    ) { }

    /**
     * Check if a shop has settings and if not create one
     */
    async hasSettings(shopId: string): Promise<Setting> {
        const settings = await this.findByShopId(shopId)
        if (!settings) {
            const newSetting = this.create({
                shop: {
                    _id: shopId
                }
            })
            return await this.save(newSetting)
        }
        return settings
    }

    async findByShopId(_id: string): Promise<Setting | null> {
        return await this.settingRepository.findOne({
            where: {
                shop: {
                    _id
                }
            }
        })
    }

    create(setting: CreateSettingServerDto): Setting {
        return this.settingRepository.create(setting)
    }

    async save(setting: Setting): Promise<Setting> {
        return this.settingRepository.save(setting)
    }

    async update(partialSetting: Partial<Setting>, shopId: string) {

        const settings = await this.hasSettings(shopId)

        return this.settingRepository.update({
            _id: partialSetting._id ?? settings._id,
            shop: {
                _id: shopId
            }
        }, partialSetting)
    }
}
