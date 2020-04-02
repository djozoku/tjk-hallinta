import { Resolver, FieldResolver, Ctx, Root, Query, Mutation, Arg, ID } from 'type-graphql';

import { GraphQLContext } from '@utils/GraphQLContext';
import Yhdistely from '@module/yhdistely/Yhdistely.Entity';

import Vastuuopettaja from './Vastuuopettaja.Entity';
import LisaaVastuuopettaja from './LisaaVastuuopettaja.Input';
import MuokkaaVastuuopettaja from './MuokkaaVastuuopettaja.Input';

@Resolver(Vastuuopettaja)
export default class VastuuopettajaResolver {
  @Query(() => Vastuuopettaja, {
    description: 'Hakee yhden vastuuopettajan tiedot joko ID:n tai nimen perusteella',
  })
  async haeVastuuopettaja(
    @Arg('id', () => ID, { description: 'Haettavan vastuuopettajan ID', nullable: true })
    id?: string,
    @Arg('nimi', () => String, { description: 'Haettavan vastuuopettajan nimi', nullable: true })
    nimi?: string,
  ) {
    if (id) return Vastuuopettaja.findOne(id);
    if (nimi) return Vastuuopettaja.findOne({ where: { nimi } });
    throw new Error('Sinun täytyy antaa joko id tai nimi');
  }

  @Query(() => [Vastuuopettaja], { description: 'Palauttaa listan vastuuopettajista' })
  async haeVastuuopettajat() {
    return Vastuuopettaja.find();
  }

  @Mutation(() => Vastuuopettaja, { description: 'Lisää uuden vastuuopettajan tietokantaan' })
  async lisaaVastuuopettaja(
    @Arg('vastuuopettaja', { description: 'Uuden vastuuopettajan tiedot' })
    uusiVastuuopettaja: LisaaVastuuopettaja,
  ) {
    const vastuuopettaja = await Vastuuopettaja.findOne({
      where: { name: uusiVastuuopettaja.nimi },
    });
    if (vastuuopettaja)
      throw new Error(`Vastuuopettaja ${uusiVastuuopettaja.nimi} on jo tietokannassa`);

    return Vastuuopettaja.create(uusiVastuuopettaja).save();
  }

  @Mutation(() => Vastuuopettaja, {
    description: 'Muokkaa olemassa olevan vastuuopettajan tietoja',
  })
  async muokkaaVastuuopettaja(
    @Arg('id', () => ID, { description: 'Muokattavan vastuuopettajan ID' }) id: string,
    @Arg('muokkaus', { description: 'Muokatut vastuuopettajan tiedot' })
    muokkaus: MuokkaaVastuuopettaja,
  ) {
    const vastuuopettaja = await Vastuuopettaja.findOne(id);
    if (!vastuuopettaja) throw new Error(`Vastuuopettajaa ei löytynyt ID:llä "${id}"`);

    if (muokkaus.nimi) vastuuopettaja.nimi = muokkaus.nimi;
    if (muokkaus.puhelin) vastuuopettaja.puhelin = muokkaus.puhelin;
    if (muokkaus.sposti) vastuuopettaja.sposti = muokkaus.sposti;

    return vastuuopettaja.save();
  }

  @Mutation(() => Boolean, { description: 'Poista olemassa oleva ohjaaja' })
  async poistaVastuuopettaja(
    @Arg('id', () => ID, { description: 'Poistettavan vastuuopettajan ID' }) id: string,
  ) {
    const vastuuopettaja = await Vastuuopettaja.findOne(id);
    if (!vastuuopettaja) throw new Error(`Vastuuopettajaa ei löytynyt ID:llä "${id}"`);

    await vastuuopettaja.remove();
    return true;
  }

  @FieldResolver(() => [Yhdistely])
  async yhdistely(
    @Ctx()
    {
      loaders: {
        YhdistelyLoaders: { VastuuopettajaLoader },
      },
    }: GraphQLContext,
    @Root() parent: Vastuuopettaja,
  ) {
    return VastuuopettajaLoader.loadMany([parent.id]);
  }
}
