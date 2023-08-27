import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, Column, DataType, BelongsToMany, HasMany } from "sequelize-typescript";
import { Post } from "src/posts/post.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.module";

interface UserCreationAttrs {
  email: string,
  password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: '1', description: 'the unique pointer'})
  @Column({unique: true, autoIncrement: true, primaryKey: true})
  id: number
  
  @ApiProperty({example: 'example@gmail.com', description: 'Email'})
  @Column({type: DataType.STRING, unique: true, allowNull: true})
  email: string
  
  @ApiProperty({example: '1sfjsdfhdsf', description: 'The password'})
  @Column({type: DataType.STRING, allowNull: true})
  password: string

  @ApiProperty({example: 'true', description: 'Does user have ban'})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean

  @ApiProperty({example: 'For violation of the terms of use of the site', description: 'Reason for ban'})
  @Column({type: DataType.STRING, allowNull: true})
  banReason: string

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]

  @HasMany(() => Post)
  posts: Post[]
}