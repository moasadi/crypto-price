
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Crypto, CryptoDocument } from './crypto.model';
import {
  CreateCryptoInput,
  ListCryptoInput,
} from './crypto.inputs';

@Injectable()
export class CryptoService {
  constructor(
    @InjectModel(Crypto.name) private cryptoModel: Model<CryptoDocument>,
  ) {}

  create(payloads:CreateCryptoInput[]) {
    const arrayUpdate=[]
    for(let payload of payloads) {
      arrayUpdate.push({
        'updateOne': {
          'filter': { 'symbol':payload.symbol },
          'update': { '$set': {
            symbol:payload.symbol,
            priceUS :payload.priceUS,
            priceIR:payload.priceIR
          } },
          'upsert': true,
        }
      })
    }
    const createOrUpdateCrypto = this.cryptoModel.bulkWrite(arrayUpdate)
    return createOrUpdateCrypto;
  }
  list(filters: ListCryptoInput) {
    return this.cryptoModel.find({ ...filters }).exec();
  }

}