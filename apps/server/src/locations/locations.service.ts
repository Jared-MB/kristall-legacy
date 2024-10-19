import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { DeliveryLocation, Location } from '../entities';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(DeliveryLocation)
    private readonly deliveryLocationRepository: Repository<DeliveryLocation>,
  ) { }

  /**
   * Get a location by its id
   * @param id The id of the location
   * @param retrieveShop Whether to retrieve the Shop relation
   * @returns The location with Shop relation
   * @default retrieveShop = true
   */
  async getLocation(id: string, retrieveShop = true) {
    return await this.locationRepository.findOne({
      where: { _id: id },
      relations: {
        shop: retrieveShop
      },
    });
  }

  async createLocation(location: Partial<Location>) {
    // const _idLocation = randomUUID();
    const newLocation = this.locationRepository.create({
      ...location,
      // _id: _idLocation,
    });
    const deliveryLocation = this.deliveryLocationRepository.create({
      ...location,
      // _id: randomUUID(),
      isLocal: true,
    })

    await this.deliveryLocationRepository.save(deliveryLocation);

    return await this.locationRepository.save(newLocation);
  }

  async getAllDeliveryLocations(shopId: string) {
    return await this.deliveryLocationRepository.find({
      where: { shop: { _id: shopId } },
      order: {
        address: 'ASC',
      },
      relations: ['shop'],
    });
  }

  async getLocations(shopId: string) {
    const locations = await this.locationRepository.find({
      where: { shop: { _id: shopId } },
      order: {
        name: 'ASC',
      }
    });
    return locations;
  }

  async updateLocation(
    id: string,
    location: Partial<Location>,
    shopID: string,
  ) {
    const locationToUpdate = await this.locationRepository.findOne({
      where: {
        _id: id,
        shop: {
          _id: shopID,
        },
      },
    });

    if (!locationToUpdate) {
      throw new Error('Location not found');
    }

    const updatedLocation = this.locationRepository.create({
      ...locationToUpdate,
      ...location,
    });

    await this.locationRepository.save(updatedLocation);
    return updatedLocation;
  }

  async createDeliveryLocation(deliveryLocation: Omit<DeliveryLocation, '_id'>) {
    const _id = randomUUID();
    const newDeliveryLocation = this.deliveryLocationRepository.create({
      ...deliveryLocation,
      _id,
    });
    return await this.deliveryLocationRepository.save(newDeliveryLocation);
  }
}
