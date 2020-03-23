import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export default class Vastuuopettaja extends BaseEntity {
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
