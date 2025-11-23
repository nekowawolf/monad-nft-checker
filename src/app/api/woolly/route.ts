import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Missing address parameter' }, { status: 400 });
  }

  try {
    const woollyApiUrl = process.env.WOOLLY_API_URL;
    
    if (!woollyApiUrl) {
      throw new Error('WOOLLY_API_URL environment variable is not set');
    }

    const apiUrl = `${woollyApiUrl}${address}`;
    console.log('Proxying to Woolly Eggs API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Woolly Eggs API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Woolly Eggs proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Woolly Eggs proxy error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch eligibility data',
        message: 'Service temporarily unavailable'
      },
      { status: 500 }
    );
  }
}