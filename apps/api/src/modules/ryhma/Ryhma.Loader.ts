import DataLoader from 'dataloader';

import Ryhma from './Ryhma.Entity';

const RyhmaLoader = () =>
  new DataLoader<number, Ryhma>(async (keys) => {
    const ryhmat = await Ryhma.findByIds(keys as any);
    const map: Record<number, Ryhma> = {};
    ryhmat.forEach((r) => {
      map[r.id] = r;
    });
    return keys.map((key) => map[key]);
  });

export default RyhmaLoader;
