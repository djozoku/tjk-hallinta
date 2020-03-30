import { Resolver, Mutation, Arg, ID } from 'type-graphql';

import Ohjaaja from './Ohjaaja.Entity';
import LisaaOhjaaja from './LisaaOhjaaja.Input';
import MuokkaaOhjaaja from './MuokkaaOhjaaja.Input';

@Resolver()
export default class OhjaajaResolver {
  @Mutation(() => Ohjaaja, { description: 'Lisää uuden ohjaajan tietokantaan' })
  async lisaaOhjaaja(
    @Arg('ohjaaja', { description: 'Uuden ohjaajan tiedot' }) uusiOhjaaja: LisaaOhjaaja,
  ) {
    const ohjaaja = await Ohjaaja.findOne({ where: { nimi: uusiOhjaaja.nimi } });
    if (ohjaaja) throw new Error(`Ohjaaja ${uusiOhjaaja.nimi} on jo olemassa`);

    return Ohjaaja.create(uusiOhjaaja).save();
  }

  @Mutation(() => Ohjaaja, { description: 'Muokkaa olemassa olevan ohjaajan tietoja' })
  async muokkaaOhjaaja(
    @Arg('id', () => ID, { description: 'Muokattavan ohjaajan ID' }) id: string,
    @Arg('muokkaus', { description: 'Muokatut ohjaajan tiedot' }) muokkaus: MuokkaaOhjaaja,
  ) {
    const ohjaaja = await Ohjaaja.findOne(id);
    if (!ohjaaja) throw new Error(`Ohjaajaa ei löytynyt ID:llä "${id}"`);

    if (muokkaus.nimi) ohjaaja.nimi = muokkaus.nimi;
    if (muokkaus.puhelin) ohjaaja.puhelin = muokkaus.puhelin;
    if (muokkaus.sposti) ohjaaja.sposti = muokkaus.sposti;

    return ohjaaja.save();
  }

  @Mutation(() => Boolean, { description: 'Poista olemassa oleva ohjaaja' })
  async poistaOhjaaja(@Arg('id', () => ID, { description: 'Postettavan ohjaajan ID' }) id: string) {
    const ohjaaja = await Ohjaaja.findOne(id);
    if (!ohjaaja) throw new Error(`Ohjaajaa ei löytynyt ID:llä "${id}"`);

    await ohjaaja.remove();
    return true;
  }
}
