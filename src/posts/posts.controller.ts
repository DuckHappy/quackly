import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity'; //problem post detected like a value, so i change as PostEntity

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('community/:communityId')
  async findByCommunity(@Param('communityId') communityId: number) {
    return this.postsService.findByCommunity(Number(communityId));
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<PostEntity | null> {
    return this.postsService.findById(id);
  }

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ success: boolean }> {
    const result = await this.postsService.delete(id);
    return { success: result };
  }

  //new methods for likes and comments

  @Post(':id/like')
  async addLike(@Param('id') id: string, @Body('userId') userId: number) {
    return this.postsService.addLike(id, userId);
  }

  @Post(':id/comment')
  async addComment(@Param('id') id: string, @Body('userId') userId: number, @Body('content') content: string,) {
    return this.postsService.addComment(id, userId, content);
  }

  //endpoints

  @Get('/feed/:userId')
  async getFeed(@Param('userId')userId: string) {
    return this.postsService.getFeed(userId);
  }
}
