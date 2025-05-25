import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { Public } from './decorators';

@Controller()
export class AppController {
  
  @Public()
  @Get('health-check')
  healthCheck(@Res() res: Response) {
    return res.status(200).json({ status: 'ok' });
  }
}
