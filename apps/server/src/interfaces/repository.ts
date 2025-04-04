export interface Repository<T> {
    findOne: (id: string) => Promise<T | null>
    findAll: () => Promise<T[]>
    findBy?: (data: Partial<T>) => Promise<T | null>
    create: (data: T) => Promise<T> 
    save: (data: T) => Promise<T>
    delete: (id: string) => Promise<boolean>
}