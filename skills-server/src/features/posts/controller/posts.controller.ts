import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ApiTextEnum } from 'src/core/helpers/api-text.enum';
import { EndpointEnum } from 'src/core/helpers/endpoint.enum';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostsService } from '../services/posts.service';

@ApiTags(ApiTextEnum.POSTS)
@Controller(EndpointEnum.POSTS)
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor(EndpointEnum.IMAGE))
  createPost(@Body() createPostDto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(createPostDto, image);
  }
}
