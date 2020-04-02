import { InputType, Field } from 'type-graphql';
import { ILisaaVastuuopettaja } from './Vastuuopettaja.Interface';

@InputType()
export default class LisaaVastuuopettaja implements ILisaaVastuuopettaja {
  @Field()
  nimi!: string;

  @Field()
  puhelin!: string;

  @Field()
  sposti!: string;
}
