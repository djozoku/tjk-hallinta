import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export default class Oppilas extends BaseEntity {
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
