import { InputType, Field } from 'type-graphql';
import { IMuokkaaTJKPaikka } from './TJKPaikka.Interface';
import MuokkaaOsoite from './MuokkaaOsoite.Input';
import ArrayEditorInput from '@utils/ArrayEditor.Input';

const OhjaajaArrayEditor = ArrayEditorInput<string>(String, 'Ohjaaja');
type OhjaajaArrayEditor = InstanceType<typeof OhjaajaArrayEditor>;

@InputType()
export default class MuokkaaTJKPaikka implements IMuokkaaTJKPaikka {
  @Field({ nullable: true })
  nimi?: string;

  @Field(() => MuokkaaOsoite, { nullable: true })
  osoite?: MuokkaaOsoite;

  @Field({ nullable: true })
  kuvaus?: string;

  @Field({ nullable: true })
  puhelin?: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  sposti?: string;

  @Field(() => [OhjaajaArrayEditor], { nullable: true })
  ohjaajat?: OhjaajaArrayEditor[];
}
