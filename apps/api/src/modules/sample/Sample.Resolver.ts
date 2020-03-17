import { Resolver, Query, Args, Arg, Mutation } from 'type-graphql';
import Sample from './Sample.Entity';
import PaginationArgs from '../../utils/PaginationArgs';

@Resolver(Sample)
export default class SampleResolver {
  @Query(() => [Sample])
  async getSamples(@Args() { skip, take }: PaginationArgs) {
    return Sample.find({ skip, take });
  }

  @Query(() => Sample, { nullable: true })
  async getSample(@Arg('id') id: string) {
    return Sample.findOne(id);
  }

  @Mutation(() => Sample)
  async createSample(@Arg('text') text: string) {
    return Sample.create({ text }).save();
  }

  @Mutation(() => Boolean)
  async deleteSample(@Arg('id') id: string) {
    const sample = await Sample.findOne(id);
    await sample?.remove();
    return true;
  }
}
