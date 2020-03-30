import { InputType, Field } from 'type-graphql';
import { IMuokkaaVastuuopettaja } from './Vastuuopettaja.Interface';

@InputType()
export default class MuokkaaVastuuopettaja implements IMuokkaaVastuuopettaja {
  @Field(() => String, { nullable: true })
  nimi?: string;

  @Field(() => String, { nullable: true })
  puhelin?: string;

  @Field(() => String, { nullable: true })
  sposti?: string;
}
