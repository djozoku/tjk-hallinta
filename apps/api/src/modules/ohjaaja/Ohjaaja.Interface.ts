export interface IOhjaaja {
  id: number;
  nimi: string;
  puhelin: string;
  sposti: string;
}

export type ILisaaOhjaaja = Omit<IOhjaaja, 'id'>;
export type IMuokkaaOhjaaja = Partial<ILisaaOhjaaja>;
