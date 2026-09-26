import { NextResponse } from 'next/server';
import { ZEPHYR_CARBON } from '@/lib/data-service';

export async function GET() {
  return NextResponse.json(ZEPHYR_CARBON);
}
