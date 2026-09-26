import { NextRequest, NextResponse } from 'next/server';
import { ZEPHYR_OPPORTUNITIES } from '@/lib/data-service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const oppId = parseInt(id, 10);
  const opp = ZEPHYR_OPPORTUNITIES.find(o => o.id === oppId);

  if (!opp) {
    return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
  }

  return NextResponse.json(opp);
}
