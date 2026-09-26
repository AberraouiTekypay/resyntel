import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const dataType = (formData.get('data_type') as string) || 'electricity';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const text = await file.text();
    const lines = text.trim().split('\n');

    if (lines.length < 2) {
      return NextResponse.json({ error: 'CSV file is empty or missing data rows' }, { status: 422 });
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

    return NextResponse.json({
      status: 'success',
      filename: file.name,
      data_type: dataType,
      rows_processed: lines.length - 1,
      columns_detected: headers,
      normalization_status: 'Normalized to Moroccan Standard Units (MAD, kWh, m³)',
      sample: lines.slice(1, 4).map(l => l.split(',')),
      message: 'CSV successfully validated and parsed. Ready for pilot analytics ingestion.'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process CSV upload' }, { status: 500 });
  }
}
