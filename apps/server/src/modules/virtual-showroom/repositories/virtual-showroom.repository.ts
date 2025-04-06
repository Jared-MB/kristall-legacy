import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOptionsRelations, Repository } from "typeorm";
import { VirtualShowroom } from "../models/virtual-showroom.model";

import { Repository as R } from "src/interfaces/repository";

@Injectable()
export class VirtualShowroomRepository implements Partial<R<VirtualShowroom>> {

    constructor(
        @InjectRepository(VirtualShowroom)
        private readonly virtualShowroomRepository: Repository<VirtualShowroom>
    ) {}

    public async create(data: DeepPartial<VirtualShowroom>) {
        return this.virtualShowroomRepository.create(data)
    }

    public async save(virtualShowroom: VirtualShowroom) {
        return this.virtualShowroomRepository.save(virtualShowroom)
    }

    public async findBy(data: DeepPartial<VirtualShowroom>, config?: { withConfig: boolean }){
        const relations = this.loadRelations(!!config?.withConfig)
        return this.virtualShowroomRepository.findOne({
            where: data,
            relations
        })
    }

    public async findOneById(id: string, config?: { withConfig: boolean }): Promise<VirtualShowroom | null> {
        const relations = this.loadRelations(!!config?.withConfig)
        return this.virtualShowroomRepository.findOne({
            where: {
                _id: id
            },
            relations
        })
    }

    private loadRelations(load: boolean){
        if (!load){
            return undefined
        }

        const relations: FindOptionsRelations<VirtualShowroom> = {
            virtualShowroomConfig: {
                cardImageOne: true,
                cardImageTwo: true,
                cardImageThree: true,
                cardImageFour: true,
            }
        }

        return relations
    }

}