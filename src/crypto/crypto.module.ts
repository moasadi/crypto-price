import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { TasksService } from './task.service';

import { CryptoController } from './crypto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Crypto,CryptoSchema } from './crypto.model';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [CryptoService,TasksService],
  controllers: [CryptoController],
  imports: [HttpModule,MongooseModule.forFeature([{ name: Crypto.name, schema: CryptoSchema }]),
  ]
})
export class CryptoModule { }
