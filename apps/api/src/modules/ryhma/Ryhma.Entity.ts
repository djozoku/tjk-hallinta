import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { IRyhma } from './Ryhma.Interface';

@ObjectType()
@Entity()
export default class Ryhma extends BaseEntity implements IRyhma {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  nimi!: string;
}
