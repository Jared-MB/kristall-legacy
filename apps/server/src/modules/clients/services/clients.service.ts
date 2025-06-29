import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { CreateClientDto } from '../dtos/create-client.dto';
import { DeleteClientDto } from '../dtos/delete-client.dto';
import { UpdateClientCriteriaDto } from '../dtos/update-client.dto';
import { Client } from '../models/client.entity';
import { ClientsRepository } from '../repositories/clients.repository';

@Injectable()
export class ClientsService {
  constructor(
    /**
     * @deprecated
     */
    @InjectRepository(Client)
    private readonly deprecatedClientRepository: Repository<Client>,
    private readonly clientsRepository: ClientsRepository,
  ) { }

  async findByShopId(shopId: string, { active }: { active?: boolean } = { active: undefined }): Promise<Client[]>{
    const searchActiveClients = typeof active === 'boolean'
    
    const clients = await this.clientsRepository.find({
      shop: {
        _id: shopId,
      },
      isActive: searchActiveClients ? (active ? 1 : 0) : undefined,
    })

    return clients;
  }

  async save({ name, shopId }: { name: string, shopId: string }) {
    const newClient = await this.clientsRepository.save({
      name,
      shop: {
        _id: shopId,
      },
    });

    return newClient;
  }

  async update({ _id, shopId}: UpdateClientCriteriaDto, { name }: CreateClientDto){
    const updatedClient = await this.clientsRepository.update<CreateClientDto>({
      _id,
      shopId,
    }, {
      name,
    })

    return updatedClient;
  }

  async softDelete({ _id, shopId }: UpdateClientCriteriaDto){
    const deletedClient = await this.clientsRepository.update<DeleteClientDto>({
      _id,
      shopId,
    }, {
      isActive: 0,
    })

    return deletedClient;
  }

  /**
   * @deprecated Use getByShop instead
   */
  async searchClientByShopID(shopID: string, query: { take: number, skip: number, client?: string } = { take: 7, skip: 0 }) {
    return await this.deprecatedClientRepository.find({
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

  /**
   * @deprecated
   */
  async getByShop(shopId: string, query: { take: number, skip: number, name?: string } = { take: 7, skip: 0 }) {
    return await this.deprecatedClientRepository.find({
      where: {
        shop: {
          _id: shopId,
        },
        name: query.name ? ILike(`%${query.name}%`) : undefined,
      },
      take: query.take,
      skip: query.skip,
    });
  }

  /**
   * @deprecated
   */
  async getByName(name: string, shopId: string) {
    return await this.deprecatedClientRepository.findOne({
      where: { name: Like(`%${name}%`), shop: { _id: shopId } }
    })
  }

  /**
   * Increment the purchases of a client
   * @param id The client id
   * @param increment The increment value
   * @default increment = 1
   * @deprecated
   */
  async incrementPurchases(id: string, increment = 1) {
    return await this.deprecatedClientRepository.increment({
      _id: id,
    }, 'purchases', increment);
  }

  /**
   * @deprecated
   */
  async addClientToDB(client: Client, shop: { _id: string}) {
    const newClient = this.deprecatedClientRepository.create({
      name: client.name,
      shop: {
        _id: shop._id,
      }
    });
    return await this.deprecatedClientRepository.save(newClient);
  }

  /**
   * @deprecated
   */
  async updateClient(client: Client) {
    return await this.deprecatedClientRepository.save(client);
  }

  /**
   * @deprecated
   */
  async deleteClient(clientId: string, shopId: string) {
    const affectedRows = await this.deprecatedClientRepository.delete({
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
