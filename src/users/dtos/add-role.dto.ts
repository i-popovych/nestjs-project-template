import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class AddRoleDto {
  @ApiProperty({type: String, example: 'ADMIN'})
  @IsString()
  readonly value: string

  @ApiProperty({type: Number, example: 1})
  @IsNumber()
  readonly userId: number
}