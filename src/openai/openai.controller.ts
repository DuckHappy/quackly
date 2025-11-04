import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('ai')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('summary')
  async summarizePosts(
    @Body() body: { posts: { title: string; content: string }[] },
  ) {
    if (!body.posts || body.posts.length === 0) {
      return { error: 'No se recibieron posts.' };
    }

    const result = await this.openAIService.generateSummary(body.posts);
    return JSON.parse(result); // lo devolvemos como objeto JSON real
  }
}
