import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';


/**
 * Cache service to handles redis
 */
@Injectable()
export class CacheService {

    private readonly CACHE_KEYS = {
        id: 'stripe:user:id',
        stripe: 'stripe:customer',
        priceId: 'stripe:price'
    } as const;

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    private getCacheKey = (slug: string, key: keyof typeof this.CACHE_KEYS) => `${this.CACHE_KEYS[key]}:${slug}`

    /**
     * Set a value in the cache
     * @param key The key to set
     * @param value The value to set
     * @param cacheKey The cache key to use
     * @default 'stripe'
     * @param ttl The time to live for the cache
     */
    public async set(key: string, value: any, cacheKey: keyof typeof this.CACHE_KEYS = 'stripe', ttl: number | undefined = undefined) {
        const cacheKeyValue = this.getCacheKey(key, cacheKey);
        await this.cacheManager.set(cacheKeyValue, value, ttl );
    }

    /**
     * Get a value from the cache
     * @param key The key to get
     * @param cacheKey The cache key to use
     * @default 'stripe'   
     * @returns The value from the cache
     */
    public async get<T = unknown>(key: string, cacheKey: keyof typeof this.CACHE_KEYS = 'stripe'): Promise<T | null> {
        const cacheKeyValue = this.getCacheKey(key, cacheKey);
        return await this.cacheManager.get<T>(cacheKeyValue);
    }
}
