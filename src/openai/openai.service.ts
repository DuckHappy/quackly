import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import extractJson from 'src/utils/extract-json';

@Injectable()
export class OpenAIService {
  private readonly client: OpenAI;
  private readonly logger = new Logger(OpenAIService.name);

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Falta la variable de entorno OPENAI_API_KEY');
    }

    this.client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateSummary(
    posts: { title: string; content: string }[],
  ): Promise<string> {
    const prompt = `
Generá un resumen JSON de los siguientes posts de una comunidad con los campos:
{
  "summary": "resumen de comunidad profesional",
  "keywords": ["vieron lo ultimo subido? Es una locura", "?????? , que paso con la ultima version?"],
  "sentiment": "positivo | negativo | neutral"
}

Posts:
${posts.map((p) => `- ${p.title}: ${p.content}`).join('\n')}
`;

    try {
      const completion = await this.client.chat.completions.create({
        model: 'openai/gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'Sos un asistente que resume publicaciones de comunidades y devuelve JSON válido.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      });

      const result = completion.choices[0].message?.content?.trim() || '';
      this.logger.log(`Respuesta OpenAI recibida: ${result.slice(0, 100)}...`);
      return extractJson(result);
    } catch (error) {
      this.logger.error('Error generando resumen con OpenAI:', error);
      return JSON.stringify({
        summary: 'Error generando resumen.',
        keywords: [],
        sentiment: 'neutral',
      });
    }
  }
}
