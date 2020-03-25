import DataLoader from 'dataloader';
import { Any } from 'typeorm';

import Yhdistely from './Yhdistely.Entity';

export type YhdistelyLoader = DataLoader<number, Yhdistely>;

const YhdistelyIDLoader = () =>
  new DataLoader<number, Yhdistely>(async (keys) => {
    const yhdistelyt = await Yhdistely.findByIds(keys as any);
    const map: Record<number, Yhdistely> = {};
    yhdistelyt.forEach((y) => {
      map[y.id] = y;
    });
    return keys.map((key) => map[key]);
  });

const YhdistelyOppilasLoader = (idLoader: YhdistelyLoader) =>
  new DataLoader<number, Yhdistely>(async (keys) => {
    const yhdistelyt = await Yhdistely.find({ where: { oppilas: Any(keys as any) } });
    yhdistelyt.forEach((y) => {
      idLoader.prime(y.id, y);
    });
    return yhdistelyt;
  });

const YhdistelyTJKPaikkaLoader = (idLoader: YhdistelyLoader) =>
  new DataLoader<number, Yhdistely>(async (keys) => {
    const yhdistelyt = await Yhdistely.find({ where: { tjkpaikka: Any(keys as any) } });
    yhdistelyt.forEach((y) => {
      idLoader.prime(y.id, y);
    });
    return yhdistelyt;
  });

const YhdistelyVastuuopettajaLoader = (idLoader: YhdistelyLoader) =>
  new DataLoader<number, Yhdistely>(async (keys) => {
    const yhdistelyt = await Yhdistely.find({ where: { vastuuopettaja: Any(keys as any) } });
    yhdistelyt.forEach((y) => {
      idLoader.prime(y.id, y);
    });
    return yhdistelyt;
  });

export {
  YhdistelyIDLoader,
  YhdistelyOppilasLoader,
  YhdistelyTJKPaikkaLoader,
  YhdistelyVastuuopettajaLoader,
};
