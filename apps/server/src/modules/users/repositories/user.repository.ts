import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class UserRepository {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){ }

    public async findById(userId: string){
        return this.userRepository.findOne({ where: { _id: userId } })
    }

    public async findByStripeId(stripeId: string){
        return this.userRepository.findOne({
            where: {
                stripeId
            }
        })
    }

    public async create(user: DeepPartial<User>){
        return this.userRepository.create(user)
    }

    public async save(user: User){
        return this.userRepository.save(user)
    }
}