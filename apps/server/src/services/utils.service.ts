import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {

    public parseQuery<T>(query: Record<string, string>, allowedQueries: string[]): T {
        const parsedQuery = Object.fromEntries(Object.entries(query).map(([key, value]) => {
            if (value === 'true') {
                return [key, true]
            }
            if (value === 'false') {
                return [key, false]
            }
            return [key, value]
        }).filter(([key]) => {
            return allowedQueries.includes(key.toString())
        })) as T
        return parsedQuery
    }

}
