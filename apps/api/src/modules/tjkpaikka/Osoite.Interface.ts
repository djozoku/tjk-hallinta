export interface IOsoite {
  katuosoite: string;
  kiinteisto: string;
  postinumero: string;
  paikkakunta: string;
}

export type IMuokkaaOsoite = Partial<IOsoite>;
