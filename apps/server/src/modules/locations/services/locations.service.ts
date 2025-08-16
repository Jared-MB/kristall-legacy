import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CriteriaDto } from 'src/dtos/update-criteria.dto';
import { SubscriptionFeatureLimitException } from 'src/exceptions/subscription-feature-limit.exception';
import { Context } from 'src/interfaces/context';
import { RESTRICTIONS } from 'src/utilities';
import { Repository } from 'typeorm';
import { DeliveryLocation, Location, StripePlans } from '../../../entities';
import { CreateLocationDto } from '../dtos/create-location.dto';
import { UpdateLocationDto } from '../dtos/update-location.dto';
import { LocationRepository } from '../repositories/location.repository';

@Injectable()
export class LocationsService {
  constructor(
    private readonly locationRepository: LocationRepository,
    /**
     * @deprecated
     */
    @InjectRepository(Location)
    private readonly deprecatedLocationRepository: Repository<Location>,
    /**
     * @deprecated
     */
    @InjectRepository(DeliveryLocation)
    private readonly deprecatedDeliveryLocationRepository: Repository<DeliveryLocation>,
  ) { }

  public async save(location: CreateLocationDto, { shopId, permissions, plan }: Context) {
    const maxLocations = RESTRICTIONS.MAX_LOCATIONS[plan]

    const canCreateLocation = await this.canCreateLocation({
      plan,
      shopId,
      permissions,
    })

    if (!canCreateLocation){
      throw new SubscriptionFeatureLimitException({
        entity: 'locations',
        maxAllowed: maxLocations,
      })
    }

    return await this.locationRepository.save({
      name: location.name,
      address: location?.address,
      phone: location?.phone ? Number(location.phone) : undefined,
      shop: {
        _id: shopId,
      }
    })
  }

  async canCreateLocation({
    plan,
    shopId,
    permissions
  }: { plan: StripePlans, shopId: string, permissions: string }) {
    const locationsCount = await this.locationRepository.count({
      _id: shopId,
    })

    const maxLocations = RESTRICTIONS.MAX_LOCATIONS[plan]

    if (locationsCount >= maxLocations){
      return false
    }

    return true;
  }

  async update(criteria: CriteriaDto, location: UpdateLocationDto){
    return await this.locationRepository.update(criteria, location);
  }

  async getById(id: string): Promise<Location | null>{
    return await this.locationRepository.findOne({
      _id: id
    })
  }

  /**
   * Get a location by its id
   * @param id The id of the location
   * @param retrieveShop Whether to retrieve the Shop relation
   * @returns The location with Shop relation
   * @default retrieveShop = true
   */
  async getLocation(id: string, retrieveShop = true) {
    return await this.deprecatedLocationRepository.findOne({
      where: { _id: id },
      relations: {
        shop: retrieveShop
      },
    });
  }

  /**
   * @deprecated
   */
  async createLocation(location: Partial<Location>) {
    // const _idLocation = randomUUID();
    const newLocation = this.deprecatedLocationRepository.create({
      ...location,
      // _id: _idLocation,
    });
    const deliveryLocation = this.deprecatedDeliveryLocationRepository.create({
      ...location,
      // _id: randomUUID(),
      isLocal: true,
    })

    await this.deprecatedDeliveryLocationRepository.save(deliveryLocation);

    return await this.deprecatedLocationRepository.save(newLocation);
  }

  async getAllDeliveryLocations(shopId: string) {
    return await this.deprecatedDeliveryLocationRepository.find({
      where: { shop: { _id: shopId } },
      order: {
        address: 'ASC',
      },
      relations: ['shop'],
    });
  }

  async getLocations(shopId: string) {
    const locations = await this.deprecatedLocationRepository.find({
      where: { shop: { _id: shopId } },
      order: {
        name: 'ASC',
      }
    });
    return locations;
  }

  async updateLocation(
    criteria: CriteriaDto,
    locationToUpdate: UpdateLocationDto,
  ) {
    const location = await this.locationRepository.findOne(criteria)

    if (!location){
      throw new NotFoundException('Location not found')
    }

    return await this.locationRepository.update(criteria, locationToUpdate);
  }

  async createDeliveryLocation(deliveryLocation: Omit<DeliveryLocation, '_id'>) {
    const _id = randomUUID();
    const newDeliveryLocation = this.deprecatedDeliveryLocationRepository.create({
      ...deliveryLocation,
      _id,
    });
    return await this.deprecatedDeliveryLocationRepository.save(newDeliveryLocation);
  }
}
