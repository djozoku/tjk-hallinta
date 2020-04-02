import { InputType, Field } from 'type-graphql';
import { IMuokkaaYhdistely } from './Yhdistely.Interface';

@InputType()
export default class MuokkaaYhdistely implements IMuokkaaYhdistely {
  @Field({ nullable: true })
  ohjaaja?: string;

  @Field({ nullable: true })
  tjkpaikka?: string;

  @Field({ nullable: true })
  vastuuopettaja?: string;
}
