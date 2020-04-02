export interface IVastuuopettaja {
  id: number;
  nimi: string;
  puhelin: string;
  sposti: string;
}

export type ILisaaVastuuopettaja = Omit<IVastuuopettaja, 'id'>;
export type IMuokkaaVastuuopettaja = Partial<ILisaaVastuuopettaja>;
