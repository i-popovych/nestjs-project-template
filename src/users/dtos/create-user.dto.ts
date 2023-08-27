import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsString, Length} from 'class-validator'

export class CreateUserDto {
  @ApiProperty({type: String, example: 'example@gmail.com'})
  @IsString({message: 'Must be string'})
  @IsEmail({}, {message: 'Wrong email'})
  readonly email: string;

  @ApiProperty({type: String, example: 'asdhfjdh89234'})
  @IsString({message: 'Must be string'})
  @Length(4, 15, {message: 'Wrong length of field'})
  readonly password: string;
}
