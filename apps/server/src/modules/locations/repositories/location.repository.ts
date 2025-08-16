import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CriteriaDto } from "src/dtos/update-criteria.dto";
import { Location } from "src/entities";
import { RawRepository } from "src/interfaces/raw-repository";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class LocationRepository implements RawRepository<Location> {

    constructor(
        @InjectRepository(Location)
        private readonly locationRepository: Repository<Location>,
    ){}

    public async find(data: DeepPartial<Location>): Promise<Location[]> {
        return await this.locationRepository.find({
            where: {
                _id: data?._id,
                shop: {
                    _id: data?.shop?._id
                },
                name: data?.name,
                address: data?.address,
                phone: data?.phone,
            }
        })
    }

    public async findOne(data: DeepPartial<Location>): Promise<Location | null>{
        return await this.locationRepository.findOne({
            where: {
                _id: data?._id,
                shop: {
                    _id: data?.shop?._id
                },
                name: data?.name,
                address: data?.address,
                phone: data?.phone,
            }
        })
    }

    public async save(data: DeepPartial<Location>): Promise<Location> {
        return await this.locationRepository.save(data);
    }

    public async count(data: DeepPartial<Location>): Promise<number>{
        return await this.locationRepository.count({
            where: {
                shop: {
                    _id: data.shop?._id
                }
            }
        })
    }

    public async update(criteria: CriteriaDto, data: DeepPartial<Location>) {
        return await this.locationRepository.update({
            _id: criteria._id,
            shop: {
                _id: criteria.shopId
            }
        }, data);
    }
}