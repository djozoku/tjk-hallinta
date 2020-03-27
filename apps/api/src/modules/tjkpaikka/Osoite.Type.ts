import { ObjectType, Field } from 'type-graphql';

import { IOsoite } from './Osoite.Interface';

@ObjectType()
export default class Osoite implements IOsoite {
  @Field()
  katuosoite!: string;

  @Field()
  kiinteisto!: string;

  @Field()
  postinumero!: string;

  @Field()
  paikkakunta!: string;
}
