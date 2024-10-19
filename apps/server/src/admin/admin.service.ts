import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async searchSystemClients(token: string) {
    const payload = this.jwtService.decode(token);
    if (payload && typeof payload !== 'string') {
      if (payload.role === 'SuperAdmin') {
        return ['fix']
      }
    }
    throw new Error('Invalid token');
  }
}
