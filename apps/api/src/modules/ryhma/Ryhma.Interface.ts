export interface IRyhma {
  id: number;
  nimi: string;
}

export type ILisaaRyhma = Omit<IRyhma, 'id'>;
export type IMuokkaaRyhma = Partial<ILisaaRyhma>;
