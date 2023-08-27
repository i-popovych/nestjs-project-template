import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, Column, DataType, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";


@Table({tableName: 'user-roles', timestamps: false})
export class UserRoles extends Model<UserRoles> {
  @Column({unique: true, autoIncrement: true, primaryKey: true})
  id: number
  
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number
  
  @ForeignKey(() => Role)
  @Column({type: DataType.INTEGER})
  roleId: number

}