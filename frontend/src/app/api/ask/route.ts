import { NextRequest, NextResponse } from 'next/server';
import { answerAIQuestion } from '@/lib/data-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = body.question || 'Summary of hotel performance';
    const lang = body.lang || 'en';
    const response = answerAIQuestion(question, lang);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process AI question' }, { status: 400 });
  }
}
