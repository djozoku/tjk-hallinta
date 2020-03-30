import { Mutation, Resolver, Arg, ID, Query } from 'type-graphql';

import Ryhma from './Ryhma.Entity';
import LisaaRyhma from './LisaaRyhma.Input';
import MuokkaaRyhma from './MuokkaaRyhma.Input';

@Resolver()
export default class RyhmaResolver {
  @Query(() => [Ryhma], { description: 'Palauttaa listan ryhmistä' })
  async haeRyhmat() {
    return Ryhma.find();
  }

  @Mutation(() => Ryhma, { description: 'Lisää uuden ryhmän tietokantaan' })
  async lisaaRyhma(@Arg('ryhma', { description: 'Uuden ryhmän tiedot' }) uusiRyhma: LisaaRyhma) {
    const ryhma = await Ryhma.findOne({ where: { nimi: uusiRyhma.nimi } });
    if (ryhma) throw new Error('Ryhmä tällä nimellä on jo olemassa');

    return Ryhma.create({ nimi: uusiRyhma.nimi }).save();
  }

  @Mutation(() => Ryhma, { description: 'Muokkaa olemassa olevan ryhmän nimeä' })
  async muokkaaRyhma(
    @Arg('id', () => ID, { description: 'Muokattavan ryhmän ID' }) id: string,
    @Arg('muokkaus', { description: 'Muokatut ryhmän tiedot' }) muokkaus: MuokkaaRyhma,
  ) {
    const ryhma = await Ryhma.findOne(id);
    if (!ryhma) throw new Error(`Ryhmää ei löytynyt id:llä "${id}"`);

    if (muokkaus.nimi) ryhma.nimi = muokkaus.nimi;

    return ryhma.save();
  }

  @Mutation(() => Boolean, { description: 'Poistaa olemassa olevan ryhmän' })
  async poistaRyhma(@Arg('id', () => ID, { description: 'Poistettavan ryhmän ID' }) id: string) {
    const ryhma = await Ryhma.findOne(id);
    if (!ryhma) throw new Error(`Ryhmää ei löytynyt id:llä "${id}"`);

    await ryhma.remove();
    return true;
  }
}
