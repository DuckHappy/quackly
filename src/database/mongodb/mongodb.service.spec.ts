import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post, PostDocument } from '../schemas/post.schema';
import { IRepository } from '../../interfaces/repository.interface';

@Injectable()
export class PostsRepository implements IRepository<Post> {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async create(
    data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Post> {
    const post = new this.postModel(data);
    const saved = await post.save();
    return saved.toObject();
  }

  async findById(id: Post['id']): Promise<Post | null> {
    const post = await this.postModel.findById(id).lean().exec();
    return post ?? null;
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().lean().exec();
  }

  async update(
    id: Post['id'],
    data: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Post | null> {
    const updated = await this.postModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
      .exec();
    return updated ?? null;
  }

  async delete(id: Post['id']): Promise<Post | null> {
    const deleted = await this.postModel.findByIdAndDelete(id).lean().exec();
    return deleted ?? null;
  }

  // Métodos específicos
  async getPostsByCommunity(communityId: number): Promise<Post[]> {
    return this.postModel
      .find({ communityId })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async addLike(postId: string, userId: number): Promise<Post | null> {
    const updated = await this.postModel
      .findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } },
        { new: true },
      )
      .lean()
      .exec();
    return updated ?? null;
  }

  async addComment(
    postId: string,
    comment: { userId: number; content: string },
  ): Promise<Post | null> {
    const updated = await this.postModel
      .findByIdAndUpdate(
        postId,
        { $push: { comments: { ...comment, createdAt: new Date() } } },
        { new: true },
      )
      .lean()
      .exec();
    return updated ?? null;
  }
}
