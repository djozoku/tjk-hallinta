import { IOsoite } from './Osoite.Interface';

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
