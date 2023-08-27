import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({type: String, description: 'String key to indicate the role', example: 'ADMIN'})
  readonly value: string;

  @ApiProperty({type: String, required: false})
  readonly description: string;
}
