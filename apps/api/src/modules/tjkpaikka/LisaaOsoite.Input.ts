import { InputType, Field } from 'type-graphql';
import { IOsoite } from './Osoite.Interface';

@InputType()
export default class LisaaOsoite implements IOsoite {
  @Field()
  katuosoite!: string;

  @Field()
  kiinteisto!: string;

  @Field()
  postinumero!: string;

  @Field()
  paikkakunta!: string;
}
