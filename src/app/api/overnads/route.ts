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

    const overnadsApiUrl = process.env.OVERNADS_API_URL;
    
    if (!overnadsApiUrl) {
      console.error('OVERNADS_API_URL is not set');
      return NextResponse.json(
        { 
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    console.log('Proxying to Overnads API:', overnadsApiUrl);
    console.log('Checking address:', address);
    
    const apiUrl = `${overnadsApiUrl}${address}`;
    console.log('Full API URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('Overnads API response status:', response.status);
    
    if (!response.ok) {
      return NextResponse.json(
        { 
          error: `API responded with status: ${response.status}`
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    console.log('Overnads proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Overnads proxy error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check prize'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = body;

    if (!address) {
      return NextResponse.json({ 
        error: 'Address is required' 
      }, { status: 400 });
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/overnads?address=${encodeURIComponent(address)}`);
    
    if (!response.ok) {
      throw new Error(`GET request failed: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Overnads POST proxy error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check prize'
      },
      { status: 500 }
    );
  }
}