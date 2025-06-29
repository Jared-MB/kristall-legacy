import { DeepPartial } from "typeorm";

export interface RawRepository<T> {
    find?(data: DeepPartial<T>): Promise<T[]>
    create?(data: DeepPartial<T>): T
    save?(data: DeepPartial<T> | DeepPartial<T>[]): Promise<T | T[]>
}