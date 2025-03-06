import { Module } from '@nestjs/common';
import { CloudflareService } from './services/cloudflare.service';
import { DnsService } from './services/dns.service';

@Module({
    providers: [DnsService, CloudflareService],
    exports: [DnsService],
})
export class CloudflareModule {}
