import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostsRepository } from 'src/database/mongodb/mongodb.service.spec';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository:PostsRepository ){}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return this.postRepository.create(createPostDto);
  }

  async findById(id: string): Promise<Post> {
    return this.postRepository.findById(id);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postRepository.findById(id);
    return this.postRepository.update(id, updatePostDto);
  }

  async delete(id: string): Promise<Post | null> {
    await this.postRepository.findById(id);
    return this.postRepository.delete(id);
  }

  //others methods of posts
  async findByCommunity(communityId: number): Promise<Post[]> {
    return this.postRepository.getPostsByCommunity(communityId);
  }

  async addLike(postId: string, userId: number): Promise<Post> {
    return this.postRepository.addLike(postId, userId);
  }

  async addComment(postId: string, userId: number, content: string): Promise<Post> {
    return this.postRepository.addComment(postId, {userId, content});
  }
}
