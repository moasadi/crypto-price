import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { coin } from './interfaces/coin'
import { dollar } from './interfaces/dollar'
import {CryptoService} from '../crypto/crypto.service';
import {CreateCryptoInput} from '../crypto/crypto.inputs'
@Injectable()
export class TasksService implements OnModuleInit {
  private readonly logger = new Logger(TasksService.name);
  constructor(private httpService: HttpService,private readonly cService: CryptoService) { }
  async onModuleInit() {
    await this.computedAndStore()
    this.logger.debug('Called kucoin api and store database');

  }

  @Cron('10 * * * * *')
  async handleCron() {
    await this.computedAndStore()
    this.logger.debug('Called kucoin api and store database');
  }
  async getCoins(): Promise<coin[]> {
    let response = await this.httpService.get('https://api.kucoin.com/api/v1/market/allTickers').toPromise();
    return response.data.data.ticker
  }
  async getUsdPrice(): Promise<dollar> {
    let response = await this.httpService.get('https://nerkhesabz.ir/v1/market').toPromise();
    return response.data.data
  }
  async computedAndStore(){
    let payloads=[] as CreateCryptoInput[]
    let coins = await this.getCoins() as coin[]
    const dollar=await this.getUsdPrice()
    coins=coins.filter(coin => coin.symbol === 'BTC-USDT' || coin.symbol === 'ETH-USDT')
    for(let mcoin of coins){
      
      payloads.push({symbol:mcoin.symbol,priceUS:mcoin.buy,priceIR:mcoin.buy*dollar.buy})
    }
    this.cService.create(payloads)
  }
}