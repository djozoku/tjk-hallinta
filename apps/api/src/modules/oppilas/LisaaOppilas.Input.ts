import { InputType, Field } from 'type-graphql';

import { ILisaaOppilas } from './Oppilas.Interface';

@InputType()
export default class LisaaOppilas implements ILisaaOppilas {
  @Field()
  nimi!: string;

  @Field()
  ryhma!: string;

  @Field()
  aloituspvm!: Date;

  @Field()
  lopetuspvm!: Date;
}
