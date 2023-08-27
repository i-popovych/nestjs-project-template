import { Post as PostModel } from './post.model';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dtos/create-post.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { StorageObjectDto } from "./dtos/storage-object.dto";

@ApiTags("Posts")
@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @ApiOperation({summary: "Add a post"})
  @ApiOkResponse({ type: PostModel })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: StorageObjectDto
  })
  @UseInterceptors(FileInterceptor("image"))
  createPost(
    @Body() dto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.postsService.create(dto, image);
  }
}
