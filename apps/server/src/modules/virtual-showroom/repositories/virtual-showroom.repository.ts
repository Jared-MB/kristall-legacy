import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateVirtualShowroomServerDto } from "../dtos";
import { VirtualShowroom } from "../models/virtual-showroom.model";

@Injectable()
export class VirtualShowroomRepository {

    constructor(
        @InjectRepository(VirtualShowroom)
        private readonly virtualShowroomRepository: Repository<VirtualShowroom>
    ) {}

    public async create(data: CreateVirtualShowroomServerDto) {
        return this.virtualShowroomRepository.create(data)
    }

    public async save(virtualShowroom: VirtualShowroom) {
        return this.virtualShowroomRepository.save(virtualShowroom)
    }

    public async findOneById(id: string){
        return this.virtualShowroomRepository.findOne({
            where: {
                _id: id
            }
        })
    }

}