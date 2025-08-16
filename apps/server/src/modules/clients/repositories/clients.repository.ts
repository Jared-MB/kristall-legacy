import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CriteriaDto } from "src/dtos/update-criteria.dto";
import { RawRepository } from "src/interfaces/raw-repository";
import { DeepPartial, Repository } from "typeorm";
import { CreateClientDto } from "../dtos/create-client.dto";
import { DeleteClientDto } from "../dtos/delete-client.dto";
import { Client } from "../models/client.entity";

@Injectable()   
export class ClientsRepository implements RawRepository<Client>{

    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
    ) { }

    async find(data: DeepPartial<Client>) {
        return await this.clientRepository.find({
            where: {
                _id: data?._id,
                shop: {
                    _id: data?.shop?._id
                },
                name: data?.name,
                purchases: data?.purchases,
                isActive: data?.isActive,
            }
        });
    }

    async save(data: DeepPartial<Client> | DeepPartial<Client>[]) {
        if (Array.isArray(data)) {
            return await this.clientRepository.save(data);
        }
        return await this.clientRepository.save(data);
    }

    async update<T extends (CreateClientDto | DeleteClientDto)>(criteria: CriteriaDto, data: T) {
        try {
            return await this.clientRepository.update({
                _id: criteria._id,
                shop: {
                    _id: criteria.shopId,
                },
            }, data);
        }
        catch(err: unknown){
            return undefined;
        }
    }
}