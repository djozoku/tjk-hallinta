import DataLoader from 'dataloader';

import Vastuuopettaja from './Vastuuopettaja.Entity';

const VastuuopettajaLoader = () =>
  new DataLoader<number, Vastuuopettaja>(async (keys) => {
    const vastuuopettajat = await Vastuuopettaja.findByIds(keys as any);
    const map: Record<number, Vastuuopettaja> = {};
    vastuuopettajat.forEach((vastuuopettaja) => {
      map[vastuuopettaja.id] = vastuuopettaja;
    });
    return keys.map((key) => map[key]);
  });

export default VastuuopettajaLoader;
