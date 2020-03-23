import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class Osoite {
  @Field()
  katuosoite!: string;

  @Field()
  kiinteisto!: string;

  @Field()
  postinumero!: string;

  @Field()
  paikkakunta!: string;
}
