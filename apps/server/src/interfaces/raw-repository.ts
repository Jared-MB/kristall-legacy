import type { CriteriaDto } from "src/dtos/update-criteria.dto";
import type { DeepPartial, DeleteResult, ObjectLiteral, UpdateResult } from "typeorm";
import { Repository } from "typeorm";

export interface RawRepository<T extends ObjectLiteral> {
    find?(data: DeepPartial<T>): Promise<T[]>
    findOne?(data: DeepPartial<T>): Promise<T | null>
    create?(data: DeepPartial<T>): T
    save?(data: DeepPartial<T> | DeepPartial<T>[]): Promise<T | T[]>
    count?(data: DeepPartial<T>): Promise<number>
    /**
     * Update an entity by criteria
     * 
     * @param criteria Entity criteria to update
     * @param data Data to update, this data will be merged with the entity, its not necessary to pass all the data again, so don't pass the _id and shopId unless is what you want to update
     * @returns 
     */
    update?(criteria: CriteriaDto, data: DeepPartial<T>): Promise<UpdateResult | undefined>
    /**
     * This is a unsafe method that returns the raw repository.
     * 
     * **DON'T USE THIS METHOD UNLESS YOU KNOW WHAT YOU ARE DOING**
     * 
     * @deprecated Mark as deprecated because it can break the application if not used carefully, its just for 
     * specific use cases like raw queries or complex queries that are not supported by the repository
     * @returns 
     */
    unsafe_repository?(): Repository<T>
    /**
     * Hard delete an entity by criteria, it will delete the entity from the database
     * 
     * @param criteria Entity criteria to delete
     * @returns 
     */
    hardDelete?(criteria: CriteriaDto): Promise<DeleteResult | undefined>
    /**
     * Soft delete an entity by criteria, it will update the entity with the isActive field to 0
     * 
     * @param criteria Entity criteria to delete
     * @returns 
     */
    softDelete?(criteria: CriteriaDto): Promise<UpdateResult | undefined>
}