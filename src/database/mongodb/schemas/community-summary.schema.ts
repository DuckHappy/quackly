import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommunitySummaryDocument = CommunitySummary & Document;

@Schema({ timestamps: true })
export class CommunitySummary {
  @Prop({ required: true })
  communityId: number;

  @Prop({ required: true })
  summary: string;

  @Prop({ default: 0 })
  postsCount: number;

  @Prop({ default: 0 })
  commentsCount: number;
}

export const CommunitySummarySchema =
  SchemaFactory.createForClass(CommunitySummary);
