import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client, Shop } from '@/server/entities';
import { ILike, Like, Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) { }

  /**
   * @deprecated Use getByShop instead
   */
  async searchClientByShopID(shopID: string, query: { take: number, skip: number, client?: string } = { take: 7, skip: 0 }) {
    return await this.clientRepository.find({
      where: {
        shop: {
          _id: shopID,
        },
        name: query.client ? ILike(`%${query.client}%`) : ILike('%%'),
      },
      take: query.take,
      skip: query.skip,
    });
  }

  async getByShop(shopId: string, query: { take: number, skip: number, client?: string } = { take: 7, skip: 0 }) {
    return await this.clientRepository.find({
      where: {
        shop: {
          _id: shopId,
        },
        name: query.client ? ILike(`%${query.client}%`) : ILike('%%'),
      },
      take: query.take,
      skip: query.skip,
    });
  }

  async getByName(name: string, shopId: string) {
    return await this.clientRepository.findOne({
      where: { name: Like(`%${name}%`), shop: { _id: shopId } }
    })
  }

  /**
   * Increment the purchases of a client
   * @param id The client id
   * @param increment The increment value
   * @default increment = 1
   */
  async incrementPurchases(id: string, increment = 1) {
    return await this.clientRepository.increment({
      _id: id,
    }, 'purchases', increment);
  }

  async addClientToDB(client: Client, shop: Shop) {
    const newClient = this.clientRepository.create({
      name: client.name,
      shop
    });
    return await this.clientRepository.save(newClient);
  }

  async updateClient(client: Client) {
    return await this.clientRepository.save(client);
  }

  async deleteClient(clientId: string, shopId: string) {
    const affectedRows = await this.clientRepository.delete({
      _id: clientId,
      shop: {
        _id: shopId,
      }
    });
    if (affectedRows.affected === 0) {
      throw new Error('No client found');
    }
    return true;
  }
}
