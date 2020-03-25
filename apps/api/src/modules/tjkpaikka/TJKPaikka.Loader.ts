import DataLoader from 'dataloader';

import TJKPaikka from './TJKPaikka.Entity';

const TJKPaikkaLoader = () =>
  new DataLoader<number, TJKPaikka>(async (keys) => {
    const tjkpaikat = await TJKPaikka.findByIds(keys as any);
    const map: Record<number, TJKPaikka> = {};
    tjkpaikat.forEach((tjkpaikka) => {
      map[tjkpaikka.id] = tjkpaikka;
    });
    return keys.map((key) => map[key]);
  });

export default TJKPaikkaLoader;
