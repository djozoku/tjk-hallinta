import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export default class Yhdistely extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('int')
  ohjaaja!: number;

  @Column('int')
  oppilas!: number;

  @Column('int')
  tjkpaikka!: number;

  @Column('int')
  vastuuopettaja!: number;
}
