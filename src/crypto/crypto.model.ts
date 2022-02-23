// crypto.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Crypto {
  _id: MongooseSchema.Types.ObjectId;
  
  @Prop()
  symbol: string;
  
  @Prop()
  priceUS: number;

  @Prop()
  priceIR: number;
}

export type CryptoDocument = Crypto & Document;

export const CryptoSchema = SchemaFactory.createForClass(Crypto);