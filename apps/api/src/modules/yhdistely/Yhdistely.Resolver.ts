import { Resolver, FieldResolver, Ctx, Root } from 'type-graphql';

import { GraphQLContext } from '@utils/GraphQLContext';
import Ohjaaja from '@module/ohjaaja/Ohjaaja.Entity';
import Oppilas from '@module/oppilas/Oppilas.Entity';
import TJKPaikka from '@module/tjkpaikka/TJKPaikka.Entity';
import Vastuuopettaja from '@module/vastuuopettaja/Vastuuopettaja.Entity';

import Yhdistely from './Yhdistely.Entity';

@Resolver(Yhdistely)
export default class YhdistelyResolver {
  @FieldResolver(() => Ohjaaja)
  async ohjaaja(@Ctx() { loaders: { OhjaajaLoader } }: GraphQLContext, @Root() parent: Yhdistely) {
    return OhjaajaLoader.load(parent.ohjaaja);
  }

  @FieldResolver(() => Oppilas)
  async oppilas(@Ctx() { loaders: { OppilasLoader } }: GraphQLContext, @Root() parent: Yhdistely) {
    return OppilasLoader.load(parent.oppilas);
  }

  @FieldResolver(() => TJKPaikka)
  async tjkpaikka(
    @Ctx() { loaders: { TJKPaikkaLoader } }: GraphQLContext,
    @Root() parent: Yhdistely,
  ) {
    return TJKPaikkaLoader.load(parent.tjkpaikka);
  }

  @FieldResolver(() => Vastuuopettaja)
  async vastuuopettaja(
    @Ctx() { loaders: { VastuuopettajaLoader } }: GraphQLContext,
    @Root() parent: Yhdistely,
  ) {
    return VastuuopettajaLoader.load(parent.vastuuopettaja);
  }
}
