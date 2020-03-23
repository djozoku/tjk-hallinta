import { Resolver, FieldResolver, Ctx, Root } from 'type-graphql';

import { GraphQLContext } from '@utils/GraphQLContext';
import Yhdistely from '@module/yhdistely/Yhdistely.Entity';

import Vastuuopettaja from './Vastuuopettaja.Entity';

@Resolver(Vastuuopettaja)
export default class VastuuopettajaResolver {
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
