import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity('users')
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({nullable: true})
  @Transform((params) =>  params.value || '')
  avatar: string;

  @ApiProperty()
  @Column({nullable: true})
  @Transform((params) =>  params.value || '')
  phoneNumber:string;


  @ApiProperty()
  @Column({nullable: true})
  firstName: string;


  @ApiProperty()
  @Column({nullable: true})
  @Transform((params) =>  params.value || '')
  description: string;


  @ApiProperty()
  @Column({nullable: true})
  lastName: string;

  @ApiProperty()
  @Column({nullable: true})
  cityId: string;

  @ApiProperty()
  @Column({nullable: true})
  countryId: string;

  @ApiProperty()
  @Column({nullable: true})
  nickName: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
