import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "src/interfaces/repository";
import { DeepPartial, Repository as TypeOrmRepository } from "typeorm";
import { VirtualShowroomConfig } from "../models/virtual-showroom-config.model";

@Injectable()
export class VirtualShowroomConfigRepository implements Repository<VirtualShowroomConfig> {

    constructor(
        @InjectRepository(VirtualShowroomConfig)
        private readonly virtualShowroomConfigRepository: TypeOrmRepository<VirtualShowroomConfig>
    ) { }

    public async create(data: DeepPartial<VirtualShowroomConfig>){
        return this.virtualShowroomConfigRepository.create(data)
    }

    public async save(data: VirtualShowroomConfig){
        return this.virtualShowroomConfigRepository.save(data)
    }

    public async findOne(id: string){
        return this.virtualShowroomConfigRepository.findOne({
            where: {
                _id: id,
            }
        })
    }

    public async findBy(data: DeepPartial<VirtualShowroomConfig>){
        return this.virtualShowroomConfigRepository.findOne({
            where: data,
            relations: {
                cardImageOne: true,
                cardImageTwo: true,
                cardImageThree: true,
                cardImageFour: true,
            }
        })
    }

    public async findAll(){
        return this.virtualShowroomConfigRepository.find() 
    }

    public async delete(id: string): Promise<boolean> {
        try {
            await this.virtualShowroomConfigRepository.delete({
                _id: id
            });
            
            return true
        } catch (error) {
            return false;
        }
    }

}
