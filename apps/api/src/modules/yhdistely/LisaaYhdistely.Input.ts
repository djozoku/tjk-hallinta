import { InputType, Field } from 'type-graphql';

import { ILisaaYhdistely } from './Yhdistely.Interface';

@InputType()
export default class LisaaYhdistely implements ILisaaYhdistely {
  @Field()
  ohjaaja!: string;

  @Field()
  tjkpaikka!: string;

  @Field()
  vastuuopettaja!: string;
}
