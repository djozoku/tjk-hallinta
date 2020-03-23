import DataLoader from 'dataloader';

import Oppilas from './Oppilas.Entity';

const OppilasLoader = () =>
  new DataLoader<number, Oppilas>(async (keys) => {
    const oppilaat = await Oppilas.findByIds(keys as any);
    const map: Record<number, Oppilas> = {};
    oppilaat.forEach((oppilas) => {
      map[oppilas.id] = oppilas;
    });
    return keys.map((key) => map[key]);
  });

export default OppilasLoader;
