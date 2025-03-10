import type { Vercel } from "@vercel/sdk";

import { Injectable } from "@nestjs/common";
import { ReportsService } from "src/modules/reports/services";
import { importEsmPackage } from "src/utilities/import-esm";
import { domainSchema } from "../validators/domain.validator";

@Injectable()
export class VercelService {

    private readonly VERCEL_VS_PROJECT_ID = process.env.VERCEL_VS_PROJECT_ID ?? ''

    constructor(
        private readonly reportsService: ReportsService
    ){ }

    /**
     * WTF???
     * 
     * Apparently, NestJS does currently not support to compile to ESM, including libraries,
     * Vercel SDK is one of them.
     * Sooo, we need to import it using `importEsmPackage` and then cast it to the correct type.
     * 
     * Solution based on nestjs sample: https://github.com/nestjs/nest/tree/master/sample/34-using-esm-packages
     * 
     * Its a bit hacky, ugly and not very clean, but it works. I'm sorry.
     */
    private async vercel(){
        const client = (await importEsmPackage('@vercel/sdk') as any).Vercel;
        return new client({
            bearerToken: 'Bearer ' + process.env.VERCEL_SDK_TOKEN
        }) as Vercel;
    }

    public async assignDomainToVS(domain: string){
        const vercel = await this.vercel();

        const domainWithoutHttp = domain.replace('https://', '');
        const parsedDomain = domainSchema.safeParse(domainWithoutHttp);

        if (!parsedDomain.success){
            return null
        }

        try {
            const response = await vercel.projects.addProjectDomain({
                idOrName: this.VERCEL_VS_PROJECT_ID,
                requestBody: {
                    name: parsedDomain.data
                }
            })
    
            return response
        }
        catch (e) {
            this.reportsService.logError(e, 'MEDIUM',{
                operation: 'assignDomainToVS',
            })
            return null
        }
    }

}