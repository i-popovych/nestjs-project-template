import { ApiProperty } from "@nestjs/swagger";

export class GetRoleQuery {
  @ApiProperty({type: String, description: "string key of role", example: "ADMIN"})
  readonly value: string
}