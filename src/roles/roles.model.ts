import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.module";

interface RoleCreationAttrs {
  value: string,
  description: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({example: '1', description: 'the unique pointer'})
  @Column({unique: true, autoIncrement: true, primaryKey: true})
  id: number
  
  @ApiProperty({example: 'USER', description: 'The unique value of role'})
  @Column({type: DataType.STRING, unique: true, allowNull: true})
  value: string
  
  @ApiProperty({example: 'Simple user with that have standart permissions on the site', description: 'Interpreting the meaning of a role'})
  @Column({type: DataType.STRING, allowNull: true})
  description: string

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}