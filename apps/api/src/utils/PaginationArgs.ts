import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class PaginationArgs {
  @Field({ defaultValue: 0 })
  skip!: number;

  @Field({ defaultValue: 20 })
  take!: number;
}
