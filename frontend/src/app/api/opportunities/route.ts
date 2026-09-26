import { NextRequest, NextResponse } from 'next/server';
import { ZEPHYR_OPPORTUNITIES } from '@/lib/data-service';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const resource = searchParams.get('resource');
  const category = searchParams.get('category');
  const sortBy = searchParams.get('sort_by') || 'savings';

  let items = [...ZEPHYR_OPPORTUNITIES];

  if (resource && resource.toLowerCase() !== 'all') {
    items = items.filter(o => o.resource_type.toLowerCase() === resource.toLowerCase());
  }

  if (category && category.toLowerCase() !== 'all') {
    items = items.filter(o => o.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (sortBy === 'savings') {
    items.sort((a, b) => b.annual_saving_mad - a.annual_saving_mad);
  } else if (sortBy === 'payback') {
    items.sort((a, b) => a.payback_months - b.payback_months);
  } else if (sortBy === 'confidence') {
    const rank: Record<string, number> = { High: 1, Medium: 2, Low: 3 };
    items.sort((a, b) => (rank[a.confidence] || 99) - (rank[b.confidence] || 99));
  } else if (sortBy === 'severity') {
    const rank: Record<string, number> = { Critical: 1, High: 2, Medium: 3, Low: 4 };
    items.sort((a, b) => (rank[a.severity] || 99) - (rank[b.severity] || 99));
  }

  return NextResponse.json({
    hero_total_annual_saving_mad: 65200.0,
    count: items.length,
    currency: "MAD",
    breakdown: {
      energy_mad: 43800.0,
      water_mad: 18700.0,
      other_mad: 2700.0
    },
    items
  });
}
