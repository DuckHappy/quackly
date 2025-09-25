import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post, PostDocument } from '../schemas/post.schema';
import { IRepository } from '../../interfaces/repository.interface';

@Injectable()
export class PostsRepository implements IRepository<Post, string> {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  // Implementación genérica de IRepository
  async create(entity: Post): Promise<Post> {
    const post = new this.postModel(entity);
    return post.save();
  }

  async findById(id: string): Promise<Post | null> {
    return this.postModel.findById(id).exec();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async update(id: string, entity: Partial<Post>): Promise<Post | null> {
    return this.postModel.findByIdAndUpdate(id, entity, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.postModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  // Métodos específicos de Posts
  async getPostsByCommunity(communityId: number): Promise<Post[]> {
    return this.postModel.find({ communityId }).sort({ createdAt: -1 }).exec();
  }

  async addLike(postId: string, userId: number): Promise<Post | null> {
    return this.postModel
      .findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } },
        { new: true },
      )
      .exec();
  }

  async addComment(
    postId: string,
    comment: { userId: number; content: string },
  ): Promise<Post | null> {
    return this.postModel
      .findByIdAndUpdate(
        postId,
        { $push: { comments: { ...comment, createdAt: new Date() } } },
        { new: true },
      )
      .exec();
  }
}
