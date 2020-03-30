import { InputType, Field } from 'type-graphql';

import { ILisaaOhjaaja } from './Ohjaaja.Interface';

@InputType()
export default class LisaaOhjaaja implements ILisaaOhjaaja {
  @Field()
  nimi!: string;

  @Field()
  puhelin!: string;

  @Field()
  sposti!: string;
}
