import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { IOppilas } from './Oppilas.Interface';

@ObjectType()
@Entity()
export default class Oppilas extends BaseEntity implements IOppilas {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  nimi!: string;

  @Column('int')
  ryhma!: number;

  @Field()
  @Column()
  aloituspvm!: Date;

  @Field()
  @Column()
  lopetuspvm!: Date;
}
