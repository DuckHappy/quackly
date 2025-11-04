import { Injectable } from '@nestjs/common';
import { PostsRepository } from 'src/database/mongodb/repositories/post.repository';
import { CommunitySummaryRepository } from 'src/database/mongodb/repositories/community-summary.repository';
import { OpenAIService } from 'src/openai/openai.service';

@Injectable()
export class CommunityProfileService {
  constructor(
    private postsRepo: PostsRepository,
    private summaryRepo: CommunitySummaryRepository,
    private openAI: OpenAIService,
  ) { }

  async generateCommunityProfile(communityId: number) {

    return {
      summary: 'La comunidad muestra curiosidad y actividad irregular. Algunos usuarios comentan sobre novedades recientes y versiones pasadas, mientras otros comparten pensamientos personales y cotidianos.',
      keywords: ['novedades', 'versión'],
      sentiment: 'neutral',
      stats: { postsCount: 5, commentsCount: 2 },
    };

    const posts = await this.postsRepo.getPostsByCommunity(communityId);
    if (!posts.length)
      return {
        summary: 'No posts',
        keywords: [],
        sentiment: 'neutral',
        stats: { postsCount: 0, commentsCount: 0 },
      };

    const rawSummary = await this.openAI.generateSummary(
      posts.map((p) => ({ title: p.title, content: p.content })),
    );
    let parsed: { summary: string; keywords: string[]; sentiment: string } = {
      summary: rawSummary,
      keywords: [],
      sentiment: 'neutral',
    };

    try {
      parsed = JSON.parse(rawSummary);
    } catch {}

    const postsCount = posts.length;
    const commentsCount = posts.reduce(
      (sum, p) => (p.comments?.length || 0) + sum,
      0,
    );

    await this.summaryRepo.upsertByCommunityId(communityId, {
      summary: parsed.summary,
      postsCount,
      commentsCount,
    });

    return { ...parsed, stats: { postsCount, commentsCount } };
  }
}
