import { Schema as MongooseSchema } from 'mongoose';

export class CreateCryptoInput {
  symbol: string;
  priceUS: number;
  priceIR: number;
}
export class ListCryptoInput {
  _id?: MongooseSchema.Types.ObjectId;
  symbol?: string;
  priceUS?: number;
  priceIR?: number;
}
