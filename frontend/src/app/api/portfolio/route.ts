import { NextResponse } from 'next/server';
import { ZEPHYR_PORTFOLIO } from '@/lib/data-service';

export async function GET() {
  return NextResponse.json({
    group_name: "Zephyr Hotels Group (Morocco)",
    total_properties: 3,
    active_pilot_properties: 1,
    total_rooms: 540,
    currency: "MAD",
    portfolio_savings_opportunity_mad: 168200.0,
    properties: ZEPHYR_PORTFOLIO
  });
}
