import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ID, ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export default class Sample extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  text!: string;
}
