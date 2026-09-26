import { NextResponse } from 'next/server';
import { ZEPHYR_KPIS } from '@/lib/data-service';

export async function GET() {
  return NextResponse.json(ZEPHYR_KPIS);
}
