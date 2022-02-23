import { Controller, Get } from '@nestjs/common';
import {CryptoService} from './crypto.service';
@Controller('crypto')
export class CryptoController {
  constructor(private readonly service: CryptoService) {}

  @Get()
  async list() {
    return await this.service.list({})
  }
}
