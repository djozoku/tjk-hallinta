import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { ITJKPaikka } from './TJKPaikka.Interface';
import Osoite from './Osoite.Type';

@ObjectType()
@Entity()
export default class TJKPaikka extends BaseEntity implements ITJKPaikka {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  nimi!: string;

  @Field(() => Osoite)
  @Column('json')
  osoite!: Osoite;

  @Field()
  @Column('text')
  kuvaus!: string;

  @Field()
  @Column()
  puhelin!: string;

  @Field()
  @Column()
  url!: string;

  @Field()
  @Column()
  sposti!: string;

  @Column('int', { array: true })
  ohjaajat!: number[];
}
