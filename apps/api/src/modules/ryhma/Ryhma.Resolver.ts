import { Mutation, Resolver, Arg, ID, Query } from 'type-graphql';

import Ryhma from './Ryhma.Entity';

@Resolver()
export default class RyhmaResolver {
  @Query(() => [Ryhma], { description: 'Palauttaa listan ryhmistä' })
  async haeRyhmat() {
    return Ryhma.find();
  }

  @Mutation(() => Ryhma, { description: 'Lisää uuden ryhmän tietokantaan' })
  async lisaaRyhma(@Arg('nimi', { description: 'Uuden ryhmän nimi' }) nimi: string) {
    const ryhma = await Ryhma.findOne({ where: { nimi } });
    if (ryhma) throw new Error('Ryhmä tällä nimellä on jo olemassa');

    return Ryhma.create({ nimi }).save();
  }

  @Mutation(() => Ryhma, { description: 'Muokkaa olemassa olevan ryhmän nimeä' })
  async muokkaaRyhma(
    @Arg('id', () => ID, { description: 'Muokattavan ryhmän ID' }) id: string,
    @Arg('uusiNimi', { description: 'Uusi nimi muokattavalle ryhmälle' }) nimi: string,
  ) {
    const ryhma = await Ryhma.findOne(id);
    if (!ryhma) throw new Error(`Ryhmää ei löytynyt id:llä "${id}"`);

    ryhma.nimi = nimi;

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
