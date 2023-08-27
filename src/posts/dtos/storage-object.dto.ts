import { CreatePostDto } from "./create-post.dto";
import { ApiProperty } from '@nestjs/swagger';

export class StorageObjectDto extends CreatePostDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  readonly file: Express.Multer.File;
}