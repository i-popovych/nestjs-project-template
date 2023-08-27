import { ApiProperty } from "@nestjs/swagger";
import { CreatePostDto } from "./create-post.dto";

export class ResponsePostDto extends CreatePostDto{
  @ApiProperty({type: String, example: "sifdifnlsdjh234klsn.png", description: 'Name of the file that will be statistically available'})
  readonly image: string
}