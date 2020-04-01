import { IOsoite, IMuokkaaOsoite } from './Osoite.Interface';
import { ArrayEditor } from '@utils/ArrayEditor';

export interface ITJKPaikka {
  id: number;
  nimi: string;
  osoite: IOsoite;
  kuvaus: string;
  puhelin: string;
  url: string;
  sposti: string;
  ohjaajat: number[];
}

export type ILisaaTJKPaikka = Omit<ITJKPaikka, 'id'>;

// partial structure of ILisaaTJKPaikka replacing osoite with its partial structure aswell
// and changing ohjaajat to a string ArrayEditor as ID:s are strings in graphql and we need to know if we are adding or removing from the array
export type IMuokkaaTJKPaikka = Partial<
  Omit<ILisaaTJKPaikka, 'osoite' | 'ohjaajat'> & {
    osoite: IMuokkaaOsoite;
    ohjaajat: ArrayEditor<string>;
  }
>;
