import { InputType, Field, Int } from 'type-graphql';
import { ILisaaTJKPaikka } from './TJKPaikka.Interface';
import LisaaOsoite from './LisaaOsoite.Input';

@InputType()
export default class LisaaTJKPaikka implements ILisaaTJKPaikka {
  @Field()
  nimi!: string;

  @Field(() => LisaaOsoite)
  osoite!: LisaaOsoite;

  @Field()
  kuvaus!: string;

  @Field()
  puhelin!: string;

  @Field()
  url!: string;

  @Field()
  sposti!: string;

  @Field(() => [Int])
  ohjaajat!: number[];
}
