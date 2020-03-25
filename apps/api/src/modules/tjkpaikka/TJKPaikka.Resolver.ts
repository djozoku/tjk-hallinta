import { Resolver, FieldResolver, Ctx, Root } from 'type-graphql';

import Ohjaaja from '@module/ohjaaja/Ohjaaja.Entity';
import Yhdistely from '@module/yhdistely/Yhdistely.Entity';
import { GraphQLContext } from '@utils/GraphQLContext';

import TJKPaikka from './TJKPaikka.Entity';

@Resolver(TJKPaikka)
export default class TJKPaikkaResolver {
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
