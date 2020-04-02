import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { IOhjaaja } from './Ohjaaja.Interface';

@ObjectType()
@Entity()
export default class Ohjaaja extends BaseEntity implements IOhjaaja {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  nimi!: string;

  @Field()
  @Column()
  puhelin!: string;

  @Field()
  @Column()
  sposti!: string;
}
