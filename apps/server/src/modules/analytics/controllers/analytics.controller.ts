import type { Request, Response } from 'express';

import { Controller, Get, Req, Res } from '@nestjs/common';

import { TokenService, Utils } from 'src/utilities';
import { AnalyticsService } from '../services';

@Controller('analytics')
export class AnalyticsController {
    constructor(
        private readonly analyticsService: AnalyticsService,
        private readonly utils: Utils,
        private readonly tokenService: TokenService,
    ) { }

    @Get()
    async getAnalytics(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const cookie = req.cookies['session']
        const payload = this.tokenService.decodeCookie(cookie)
        if (!payload) {
            return res.status(404).json({ message: 'No route found' })
        }
        const analytics = this.analyticsService.getAnalytics(payload.shop._id)
        return this.utils.adaptResponse(analytics, res)
    }
}

