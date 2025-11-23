import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json({ 
        error: 'Address is required' 
      }, { status: 400 });
    }

    const baseApiUrl = process.env.THEDAKS_API_URL;
    
    if (!baseApiUrl) {
      console.error('THEDAKS_API_URL is not set');
      return NextResponse.json(
        { 
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    const apiUrl = `${baseApiUrl}/${address}`;
    
    console.log('Proxying to The Daks API for address:', address);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('The Daks API response status:', response.status);
    
    if (!response.ok) {
      return NextResponse.json(
        { 
          error: `API responded with status: ${response.status}`
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    console.log('The Daks proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('The Daks proxy error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check eligibility'
      },
      { status: 500 }
    );
  }
}