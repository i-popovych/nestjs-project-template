import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, Column, DataType, BelongsToMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";


interface PostCreationAttrs {
  title: string,
  content: string,
  image: string,
  userId: number
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({type: Number, description: 'the unique pointer'})
  @Column({unique: true, autoIncrement: true, primaryKey: true})
  id: number
  
  @ApiProperty({type: String})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  title: string
  
  @ApiProperty({type: String})
  @Column({type: DataType.STRING, allowNull: false})
  content: string

  @ApiProperty({type: String, description: 'the name of file in static folder', example: 'saisfhsfhskfl.png'})
  @Column({type: DataType.STRING})
  image: string

  @ApiProperty({type: Number, description: 'foreign key on user'})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number

  @BelongsTo(() => User)
  user: User

}