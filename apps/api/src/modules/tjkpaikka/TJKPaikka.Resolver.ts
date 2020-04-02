import { Resolver, FieldResolver, Ctx, Root, Query, Mutation, Arg, ID } from 'type-graphql';

import Ohjaaja from '@module/ohjaaja/Ohjaaja.Entity';
import Yhdistely from '@module/yhdistely/Yhdistely.Entity';
import { GraphQLContext } from '@utils/GraphQLContext';

import TJKPaikka from './TJKPaikka.Entity';
import LisaaTJKPaikka from './LisaaTJKPaikka.Input';
import MuokkaaTJKPaikka from './MuokkaaTJKPaikka.Input';
import { hasDuplicates } from '@utils/hasDuplicates';

@Resolver(TJKPaikka)
export default class TJKPaikkaResolver {
  @Query(() => TJKPaikka, {
    description: 'Hakee yhden tjkpaikan tiedot joko ID:n tai nimen perusteella',
  })
  async haeTJKPaikka(
    @Arg('id', () => ID, { description: 'Haettavan tjkpaikan ID', nullable: true }) id?: string,
    @Arg('nimi', { description: 'Haettavan tjkpaikan nimi', nullable: true }) nimi?: string,
  ) {
    if (id) return TJKPaikka.findOne(id);
    if (nimi) return TJKPaikka.findOne({ where: { nimi } });
    throw new Error('Sinun täytyy antaa joko id tai nimi');
  }

  @Query(() => [TJKPaikka], { description: 'Palauttaa listan tjkpaikoista' })
  async haeTJKPaikat() {
    return TJKPaikka.find();
  }

  @Mutation(() => TJKPaikka, { description: 'Lisää uuden tjkpaikan tietokantaan' })
  async lisaaTJKPaikka(
    @Arg('tjkpaikka', { description: 'Uuden tjkpaikan tiedot' }) uusiTjkpaikka: LisaaTJKPaikka,
  ) {
    const tjkpaikka = await TJKPaikka.findOne({ where: { nimi: uusiTjkpaikka.nimi } });
    if (tjkpaikka) throw new Error(`TJKPaikka ${uusiTjkpaikka.nimi} on jo tietokannassa`);

    return TJKPaikka.create(uusiTjkpaikka).save();
  }

  @Mutation(() => TJKPaikka, { description: 'Muokkaa olemassa olevan tjkpaikan tietoja' })
  async muokkaaTJKPaikka(
    @Arg('id', () => ID, { description: 'Muokattavan tjkpaikan ID' }) id: string,
    @Arg('muokkaus', { description: 'Muokatut tjkpaikan tiedot' }) muokkaus: MuokkaaTJKPaikka,
  ) {
    const tjkpaikka = await TJKPaikka.findOne(id);
    if (!tjkpaikka) throw new Error(`TJKPaikkaa ei löytynyt ID:llä "${id}"`);

    if (muokkaus.nimi) tjkpaikka.nimi = muokkaus.nimi;
    if (muokkaus.osoite) {
      const { osoite } = muokkaus;
      if (osoite.katuosoite) tjkpaikka.osoite.katuosoite = osoite.katuosoite;
      if (osoite.kiinteisto) tjkpaikka.osoite.kiinteisto = osoite.kiinteisto;
      if (osoite.postinumero) tjkpaikka.osoite.postinumero = osoite.postinumero;
      if (osoite.paikkakunta) tjkpaikka.osoite.paikkakunta = osoite.paikkakunta;
    }
    if (muokkaus.kuvaus) tjkpaikka.kuvaus = muokkaus.kuvaus;
    if (muokkaus.puhelin) tjkpaikka.puhelin = muokkaus.puhelin;
    if (muokkaus.url) tjkpaikka.url = muokkaus.url;
    if (muokkaus.sposti) tjkpaikka.sposti = muokkaus.sposti;

    if (muokkaus.ohjaajat) {
      if (hasDuplicates(muokkaus.ohjaajat))
        throw new Error('Ohjaajat lista sisältää monta samaa ID:tä');
      const numbers = /^\d+$/g;
      for (const ohjaaja of muokkaus.ohjaajat) {
        if (!numbers.test(ohjaaja.value)) throw new Error(`Epäkelvollinen ohjaaja ID "${ohjaaja}"`);
        const parsed = parseInt(ohjaaja.value, 10);
        const isFound = tjkpaikka.ohjaajat.includes(parsed);
        if (!ohjaaja.delete && isFound)
          throw new Error(`Ohjaaja ID:llä "${ohjaaja.value}" on jo tjkpaikan ohjaajissa`);
        if (ohjaaja.delete && !isFound)
          throw new Error(`Ohjaajaa ei löytynyt ID:llä "${ohjaaja.value}"`);
        if (!ohjaaja.delete) tjkpaikka.ohjaajat.push(parsed);
        else tjkpaikka.ohjaajat = tjkpaikka.ohjaajat.filter((o) => o !== parsed);
      }
    }

    return tjkpaikka.save();
  }

  @Mutation(() => Boolean, { description: 'Poistaa olemassa olevan tjkpaikan' })
  async poistaTJKPaikka(
    @Arg('id', () => ID, { description: 'Poistettavan tjkpaikan ID' }) id: string,
  ) {
    const tjkpaikka = await TJKPaikka.findOne(id);
    if (!tjkpaikka) throw new Error(`TJKPaikkaa ei löytynyt ID:llä "${id}"`);

    await tjkpaikka.remove();
    return true;
  }

  @FieldResolver(() => [Ohjaaja])
  async ohjaajat(@Ctx() { loaders: { OhjaajaLoader } }: GraphQLContext, @Root() parent: TJKPaikka) {
    return OhjaajaLoader.loadMany(parent.ohjaajat);
  }

  @FieldResolver(() => [Yhdistely])
  async yhdistely(
    @Ctx()
    {
      loaders: {
        YhdistelyLoaders: { TJKPaikkaLoader },
      },
    }: GraphQLContext,
    @Root() parent: TJKPaikka,
  ) {
    return TJKPaikkaLoader.loadMany([parent.id]);
  }
}
