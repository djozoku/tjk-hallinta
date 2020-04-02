import { InputType, Field } from 'type-graphql';

import { IMuokkaaOppilas } from './Oppilas.Interface';

@InputType()
export default class MuokkaaOppilas implements IMuokkaaOppilas {
  @Field({ nullable: true })
  nimi?: string;

  @Field({ nullable: true })
  ryhma?: string;

  @Field({ nullable: true })
  aloituspvm?: Date;

  @Field({ nullable: true })
  lopetuspvm?: Date;
}
