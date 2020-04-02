import { InputType, Field } from 'type-graphql';

import { IMuokkaaOhjaaja } from './Ohjaaja.Interface';

@InputType()
export default class MuokkaaOhjaaja implements IMuokkaaOhjaaja {
  @Field(() => String, { nullable: true })
  nimi?: string;

  @Field(() => String, { nullable: true })
  puhelin?: string;

  @Field(() => String, { nullable: true })
  sposti?: string;
}
