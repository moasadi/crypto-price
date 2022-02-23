import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoModule } from './crypto/crypto.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CryptoModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
