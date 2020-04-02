import { Resolver, FieldResolver, Ctx, Root, Query, Mutation, Arg, ID } from 'type-graphql';

import { GraphQLContext } from '@utils/GraphQLContext';
import Ryhma from '@module/ryhma/Ryhma.Entity';
import Yhdistely from '@module/yhdistely/Yhdistely.Entity';
import LisaaYhdistely from '@module/yhdistely/LisaaYhdistely.Input';

import Oppilas from './Oppilas.Entity';
import LisaaOppilas from './LisaaOppilas.Input';
import MuokkaaOppilas from './MuokkaaOppilas.Input';
import MuokkaaYhdistely from '@module/yhdistely/MuokkaaYhdistely.Input';

@Resolver(Oppilas)
export default class OppilasResolver {
  @Query(() => Oppilas, {
    description: 'Hakee yhden oppilaan tiedot joko ID:n tai nimen perusteella',
  })
  async haeOppilas(
    @Arg('id', () => ID, { description: 'Haettavan oppilaan ID', nullable: true }) id?: string,
    @Arg('nimi', { description: 'Haettavan oppilaan nimi', nullable: true }) nimi?: string,
  ) {
    if (id) return Oppilas.findOne(id);
    if (nimi) return Oppilas.find({ where: { nimi } });
    throw new Error('Sinun täytyy antaa joko ID tai nimi');
  }

  @Query(() => [Oppilas], { description: 'Palauttaa listan oppilaista' })
  async haeOppilaat() {
    return Oppilas.find();
  }

  @Mutation(() => Oppilas, { description: 'Lisää uuden oppilaan tietokantaan' })
  async lisaaOppilas(
    @Arg('oppilas', { description: 'Uuden oppilaan tiedot' }) uusiOppilas: LisaaOppilas,
    @Arg('yhdistys', { description: 'Uuden oppilaan yhdistys' }) yhdistys: LisaaYhdistely,
  ) {
    if (await Oppilas.findOne({ where: { nimi: uusiOppilas.nimi } }))
      throw new Error(`Oppilas ${uusiOppilas.nimi} on jo tietokannassa`);

    const oppilas = await Oppilas.create({
      ...uusiOppilas,
      ryhma: parseInt(uusiOppilas.ryhma, 10),
    }).save();

    await Yhdistely.create({
      ohjaaja: parseInt(yhdistys.ohjaaja, 10),
      oppilas: oppilas.id,
      tjkpaikka: parseInt(yhdistys.tjkpaikka, 10),
      vastuuopettaja: parseInt(yhdistys.vastuuopettaja, 10),
    }).save();

    return oppilas;
  }

  @Mutation(() => Oppilas, { description: 'Muokkaa olemassa olevan oppilaan tietoja' })
  async muokkaaOppilas(
    @Arg('id', () => ID, { description: 'Muokattavan oppilaan ID' }) id: string,
    @Arg('muokkaus', { description: 'Muokatut oppilaan tiedot' }) muokkaus: MuokkaaOppilas,
    @Arg('yhdistys', { description: 'Muokatut oppilaan yhdistykset' }) yhdistys: MuokkaaYhdistely,
  ) {
    const oppilas = await Oppilas.findOne(id);
    const yhdistely = await Yhdistely.findOne({ where: { oppilas: parseInt(id, 10) } });
    if (!oppilas || !yhdistely) throw new Error(`Oppilasta ei löytynyt ID:llä "${id}"`);

    if (muokkaus.nimi) oppilas.nimi = muokkaus.nimi;
    if (muokkaus.ryhma) oppilas.ryhma = parseInt(muokkaus.ryhma, 10);
    if (muokkaus.aloituspvm) oppilas.aloituspvm = muokkaus.aloituspvm;
    if (muokkaus.lopetuspvm) oppilas.lopetuspvm = muokkaus.lopetuspvm;

    if (yhdistys.ohjaaja) yhdistely.ohjaaja = parseInt(yhdistys.ohjaaja, 10);
    if (yhdistys.tjkpaikka) yhdistely.tjkpaikka = parseInt(yhdistys.tjkpaikka, 10);
    if (yhdistys.vastuuopettaja) yhdistely.vastuuopettaja = parseInt(yhdistys.vastuuopettaja, 10);

    await yhdistely.save();

    return oppilas.save();
  }

  @Mutation(() => Boolean, { description: 'Poistaa olemassa olevan oppilaan' })
  async poistaOppilas(
    @Arg('id', () => ID, { description: 'Poistettavan oppilaan ID' }) id: string,
  ) {
    const oppilas = await Oppilas.findOne(id);
    const yhdistely = await Yhdistely.findOne({ where: { oppilas: parseInt(id, 10) } });
    if (!oppilas && !yhdistely) throw new Error(`Oppilasta ei löytynyt ID:llä "${id}"`);

    if (oppilas) await oppilas.remove();
    if (yhdistely) await yhdistely.remove();

    return true;
  }

  @FieldResolver(() => Ryhma)
  async ryhma(@Ctx() { loaders: { RyhmaLoader } }: GraphQLContext, @Root() parent: Oppilas) {
    return RyhmaLoader.load(parent.ryhma);
  }

  @FieldResolver(() => Yhdistely)
  async yhdistely(
    @Ctx()
    {
      loaders: {
        YhdistelyLoaders: { OppilasLoader },
      },
    }: GraphQLContext,
    @Root() parent: Oppilas,
  ) {
    return OppilasLoader.load(parent.id);
  }
}
