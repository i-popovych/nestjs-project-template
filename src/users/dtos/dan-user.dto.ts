import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
  @ApiProperty({type: Number, example: 1})
  readonly userId: number;

  @ApiProperty({type: String, example: 'By breaking rule 1.1'})
  readonly banReason: string;
}