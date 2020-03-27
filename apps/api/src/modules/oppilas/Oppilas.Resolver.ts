import { Resolver, FieldResolver, Ctx, Root } from 'type-graphql';

import { GraphQLContext } from '@utils/GraphQLContext';
import Ryhma from '@module/ryhma/Ryhma.Entity';
import Yhdistely from '@module/yhdistely/Yhdistely.Entity';

import Oppilas from './Oppilas.Entity';

@Resolver(Oppilas)
export default class OppilasResolver {
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
