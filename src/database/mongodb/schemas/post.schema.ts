import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  communityId: number;

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop({
    type: [{ userId: Number, content: String, createdAt: Date }],
    default: [],
  })
  comments: { userId: number; content: string; createdAt: Date }[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
