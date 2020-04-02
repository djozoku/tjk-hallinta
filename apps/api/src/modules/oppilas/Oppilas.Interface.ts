export interface IOppilas {
  id: number;
  nimi: string;
  ryhma: number;
  aloituspvm: Date;
  lopetuspvm: Date;
}

export type ILisaaOppilas = Omit<IOppilas, 'id' | 'ryhma'> & { ryhma: string };
export type IMuokkaaOppilas = Partial<ILisaaOppilas>;
