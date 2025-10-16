import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '../database/mongodb/schemas/post.schema';
import { PostsRepository } from '../database/mongodb/repositories/post.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository:PostsRepository ){}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    //i create post entity
    const postEntity: Post = {
      ...createPostDto,
      likes: 0,  //acummulate likes? ask later
      comments: [], //empty array comments
    } as Post;
    return this.postRepository.create(postEntity);
  }

  async findById(id: string): Promise<Post | null> {
    return this.postRepository.findById(id);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post | null> {
    await this.findById(id);
    return this.postRepository.update(id, updatePostDto as Partial<Post> );
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);
    return this.postRepository.delete(id);
  }

  //others methods of posts
  async findByCommunity(communityId: number): Promise<Post[]> {
    return this.postRepository.getPostsByCommunity(communityId);
  }

  async addLike(postId: string, userId: number): Promise<Post | null> {
    return this.postRepository.addLike(postId, userId);
  }

  async addComment(postId: string, userId: number, content: string): Promise<Post | null> {
    return this.postRepository.addComment(postId, {userId, content});
  }
}
