import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Missing address parameter' }, { status: 400 });
  }

  try {
    const poplyApiUrl = process.env.POPLY_API_URL;
    
    if (!poplyApiUrl) {
      throw new Error('POPLY_API_URL environment variable is not set');
    }

    const apiUrl = `${poplyApiUrl}${address}`;
    console.log('Proxying to Poply API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Poply API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Poply proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Poply proxy error:', error);
    return NextResponse.json(
      { 
        isWhitelisted: false,
        error: 'Failed to fetch whitelist data',
        message: 'Service temporarily unavailable'
      },
      { status: 500 }
    );
  }
}