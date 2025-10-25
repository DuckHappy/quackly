import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CommunitySummary,
  CommunitySummaryDocument,
} from '../schemas/community-summary.schema';

@Injectable()
export class CommunitySummaryRepository {
  constructor(
    @InjectModel(CommunitySummary.name)
    private summaryModel: Model<CommunitySummaryDocument>,
  ) {}

  async findByCommunityId(
    communityId: number,
  ): Promise<CommunitySummary | null> {
    return this.summaryModel.findOne({ communityId }).exec();
  }

  async upsertByCommunityId(
    communityId: number,
    data: Partial<CommunitySummary>,
  ): Promise<CommunitySummary> {
    return this.summaryModel
      .findOneAndUpdate({ communityId }, data, { new: true, upsert: true })
      .exec();
  }
}
