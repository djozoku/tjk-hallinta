import { InputType, Field } from 'type-graphql';
import { IMuokkaaOsoite } from './Osoite.Interface';

@InputType()
export default class MuokkaaOsoite implements IMuokkaaOsoite {
  @Field(() => String, { nullable: true })
  katuosoite?: string;

  @Field(() => String, { nullable: true })
  kiinteisto?: string;

  @Field(() => String, { nullable: true })
  postinumero?: string;

  @Field(() => String, { nullable: true })
  paikkakunta?: string;
}
