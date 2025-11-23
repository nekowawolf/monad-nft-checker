import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Missing address parameter' }, { status: 400 });
  }

  try {
    const meowwnApiUrl = process.env.MEOWWN_API_URL;
    
    if (!meowwnApiUrl) {
      throw new Error('MEOWWN_API_URL environment variable is not set');
    }

    const apiUrl = `${meowwnApiUrl}${address}`;
    console.log('Proxying to Meowwn API');
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Proxy response received');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { 
        ok: false,
        error: 'Failed to fetch eligibility data',
        message: 'Service temporarily unavailable'
      },
      { status: 500 }
    );
  }
}