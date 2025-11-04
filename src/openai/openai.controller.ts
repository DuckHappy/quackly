import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('ai')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) { }

  @Post('community-info')
  async getCommunityInfo(@Body() body: { slug: string }) {
    const { slug } = body;

    const prompt = `Genera una descripción breve y atractiva para una comunidad llamada "${slug}".
                    Devolvé un JSON con este formato:
                    {
                      "name": "Nombre estilizado de la comunidad",
                      "description": "Descripción creativa de máximo 2 líneas",
                      "members": número estimado de miembros,
                      "online": número estimado de miembros conectados,
                      "logo": "ruta sugerida o nombre de imagen"
                    }
                  `;

    const completion = await this.openAIService['client'].chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Sos un asistente que genera descripciones de comunidades en formato JSON.' },
        { role: 'user', content: prompt },
      ],
    });

    const result = completion.choices[0].message?.content?.trim() || '{}';
    return JSON.parse(result);
  }
}
