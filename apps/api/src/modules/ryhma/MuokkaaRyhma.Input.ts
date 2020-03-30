import { InputType, Field } from 'type-graphql';
import { IMuokkaaRyhma } from './Ryhma.Interface';

@InputType()
export default class MuokkaaRyhma implements IMuokkaaRyhma {
  @Field(() => String, { nullable: true })
  nimi?: string;
}
