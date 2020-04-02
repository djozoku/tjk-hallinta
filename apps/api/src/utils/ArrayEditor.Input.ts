import { InputType, ClassType, Field } from 'type-graphql';

import { SingleArrayEditor } from './ArrayEditor';

const ArrayEditorInput = <T, C = any>(Type: ClassType<C>, name: string) => {
  @InputType(`${name}ArrayEditor`)
  class ArrayEditorInputType implements SingleArrayEditor<T> {
    @Field()
    delete!: boolean;

    @Field(() => Type)
    value!: T;
  }

  return ArrayEditorInputType;
};

export default ArrayEditorInput;
