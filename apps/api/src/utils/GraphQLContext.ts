import { Request, Response } from 'express';
import DataLoader from 'dataloader';

import Ohjaaja from '@module/ohjaaja/Ohjaaja.Entity';
import Oppilas from '@module/oppilas/Oppilas.Entity';
import TJKPaikka from '@module/tjkpaikka/TJKPaikka.Entity';
import Vastuuopettaja from '@module/vastuuopettaja/Vastuuopettaja.Entity';
import { YhdistelyLoader } from '@module/yhdistely/Yndistely.Loaders';
import Ryhma from '@module/ryhma/Ryhma.Entity';

export interface DataLoaders {
  OhjaajaLoader: DataLoader<number, Ohjaaja>;
  OppilasLoader: DataLoader<number, Oppilas>;
  RyhmaLoader: DataLoader<number, Ryhma>;
  TJKPaikkaLoader: DataLoader<number, TJKPaikka>;
  VastuuopettajaLoader: DataLoader<number, Vastuuopettaja>;
  YhdistelyLoaders: {
    IDLoader: YhdistelyLoader;
    OppilasLoader: YhdistelyLoader;
    TJKPaikkaLoader: YhdistelyLoader;
    VastuuopettajaLoader: YhdistelyLoader;
  };
}

export interface GraphQLContext {
  req: Request;
  res: Response;
  loaders: DataLoaders;
}
