import { GoogleGenerativeAI } from '@google/generative-ai';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class GeminiService {
  async getAIServices(category: string): Promise<string[]> {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `Devuelve una lista de un solo nivel, de 15 elementos, en formato json, de los servicios más populares que puede prestar este negocio: ${category}`;

      const result = await model.generateContent([prompt]);

      const responseText = await result.response.text();
      const cleanedResponse = responseText.replace(/```json|```/g, '').trim();
      const jsonResponse = JSON.parse(cleanedResponse);

      return jsonResponse
    } catch (error) {
      console.error('Error generating learning content:', error);
      throw new BadRequestException('Invalid input to create content');
    }
  }
}
