import DataLoader from 'dataloader';

import Ohjaaja from './Ohjaaja.Entity';

const OhjaajaLoader = () =>
  new DataLoader<number, Ohjaaja>(async (keys) => {
    const ohjaajat = await Ohjaaja.findByIds(keys as any);
    const map: Record<number, Ohjaaja> = {};
    ohjaajat.forEach((ohjaaja) => {
      map[ohjaaja.id] = ohjaaja;
    });
    return keys.map((key) => map[key]);
  });

export default OhjaajaLoader;
