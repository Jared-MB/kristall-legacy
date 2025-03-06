import type Cloudflare from "cloudflare";

import { Injectable } from "@nestjs/common";
import { CloudflareService } from "./cloudflare.service";

@Injectable()
export class DnsService {

    private readonly client: CloudflareService['client']
    private readonly ZONE_ID = process.env.CLOUDFLARE_ZONE_ID ?? '';
    private readonly DNS_HOSTNAME = 'cname.vercel-dns.com';

    constructor(
        private readonly cloudflareService: CloudflareService,
    ) {
        this.client = this.cloudflareService.client;
    }

    async create(name: string): Promise<Cloudflare.DNS.Records.RecordResponse>{

        const parsedName = name.trim().toLowerCase();

        if (parsedName.includes('.')) {
            throw new Error('Invalid name');
        }

        return this.client.dns.records.create({
			zone_id: this.ZONE_ID,
			type: 'CNAME', 
			name: parsedName,
			content: this.DNS_HOSTNAME, 
			'ttl': 1, 
			proxied: true
		});
    }
}