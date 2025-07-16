import type { UpdateCriteriaDto } from "src/dtos/update-criteria.dto";
import type { DeepPartial, UpdateResult } from "typeorm";

export interface RawRepository<T> {
    find?(data: DeepPartial<T>): Promise<T[]>
    findOne?(data: DeepPartial<T>): Promise<T | null>
    create?(data: DeepPartial<T>): T
    save?(data: DeepPartial<T> | DeepPartial<T>[]): Promise<T | T[]>
    count?(data: DeepPartial<T>): Promise<number>
    update?(criteria: UpdateCriteriaDto, data: DeepPartial<T>): Promise<UpdateResult | undefined>
}