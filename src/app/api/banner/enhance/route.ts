import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { API_ERRORS, BANNER_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { EnhanceTextSchema, AIModel } from '@/types/banner';
import { generateText } from 'ai';
import { gateway } from '@ai-sdk/gateway';

const MODEL_IDS: Record<AIModel, string> = {
  [AIModel.CLAUDE_37_SONNET]: 'anthropic/claude-3.7-sonnet',
  [AIModel.GPT_41]: 'openai/gpt-4.1',
  [AIModel.GEMINI_25_PRO]: 'google/gemini-2.5-pro',
};

export async function POST(
  request: Request
): Promise<NextResponse<GenericResponse<{ enhancedText: string }>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsed = EnhanceTextSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const { text, model } = parsed.data;
    const modelId = MODEL_IDS[model] as string;

    const { text: enhancedText } = await generateText({
      model: gateway(modelId),
      prompt: `Enhance this promotional banner text to be catchy and readable. Keep it under 120 characters. Return only the enhanced text, nothing else.

      Original text: ${text}`,
    });

    // Ensure the enhanced text is within 120 characters
    const trimmedText =
      enhancedText.length > 120
        ? enhancedText.substring(0, 120).trim()
        : enhancedText.trim();

    return NextResponse.json(
      {
        message: BANNER_SUCCESS.TEXT_ENHANCED.message,
        data: { enhancedText: trimmedText },
      },
      { status: BANNER_SUCCESS.TEXT_ENHANCED.status }
    );
  } catch (error) {
    console.error('🚨 [BANNER_ENHANCE_ERROR]', error);
    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
