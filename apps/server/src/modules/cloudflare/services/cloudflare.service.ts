import { Injectable } from '@nestjs/common';
import Cloudflare from 'cloudflare';

@Injectable()
export class CloudflareService {
    
    public readonly client = new Cloudflare({
        apiKey: process.env.CLOUDFLARE_API_KEY,
        apiEmail: process.env.CLOUDFLARE_EMAIL
    });

} 