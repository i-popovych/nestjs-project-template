import { ApiProperty } from "@nestjs/swagger"

export class CreatePostDto {
  @ApiProperty({type: String})
  readonly title: string

  @ApiProperty({type: String})
  readonly content: string

  @ApiProperty({type: Number, description: "The foreign key of user in the database to which the post belongs"})
  readonly userId: number
}