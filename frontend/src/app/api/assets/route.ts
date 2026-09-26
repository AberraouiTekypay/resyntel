import { NextResponse } from 'next/server';
import { ZEPHYR_ASSETS } from '@/lib/data-service';

export async function GET() {
  return NextResponse.json(ZEPHYR_ASSETS);
}
