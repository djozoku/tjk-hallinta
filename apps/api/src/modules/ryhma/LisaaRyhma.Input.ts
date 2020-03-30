import { InputType, Field } from 'type-graphql';
import { ILisaaRyhma } from './Ryhma.Interface';

@InputType()
export default class LisaaRyhma implements ILisaaRyhma {
  @Field()
  nimi!: string;
}
