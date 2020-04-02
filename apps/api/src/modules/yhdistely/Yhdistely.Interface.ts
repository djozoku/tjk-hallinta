export interface IYhdistely {
  id: number;
  ohjaaja: number;
  oppilas: number;
  tjkpaikka: number;
  vastuuopettaja: number;
}

export interface ILisaaYhdistely {
  ohjaaja: string;
  tjkpaikka: string;
  vastuuopettaja: string;
}
export type IMuokkaaYhdistely = Partial<ILisaaYhdistely>;
