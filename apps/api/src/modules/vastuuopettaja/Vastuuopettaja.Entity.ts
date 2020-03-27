import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { IVastuuopettaja } from './Vastuuopettaja.Interface';

@ObjectType()
@Entity()
export default class Vastuuopettaja extends BaseEntity implements IVastuuopettaja {
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
