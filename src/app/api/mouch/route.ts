import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = body;

    if (!address) {
      return NextResponse.json({ 
        success: false,
        error: 'Address is required' 
      }, { status: 400 });
    }

    const mouchApiUrl = process.env.MOUCH_API_URL;
    
    if (!mouchApiUrl) {
      console.error('MOUCH_API_URL is not set');
      return NextResponse.json(
        { 
          success: false,
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    console.log('Proxying to Mouch API:', mouchApiUrl);
    console.log('Checking address:', address);
    
    const requestBody = JSON.stringify({ address });
    console.log('Request body to Mouch:', requestBody);
    
    const response = await fetch(mouchApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
    
    console.log('Mouch API response status:', response.status);
    
    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false,
          error: `API responded with status: ${response.status}`
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    console.log('Mouch proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Mouch proxy error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to check whitelist'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json({ 
        success: false,
        error: 'Address is required' 
      }, { status: 400 });
    }

    const mouchApiUrl = process.env.MOUCH_API_URL;
    
    if (!mouchApiUrl) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    const response = await fetch(mouchApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false,
          error: `API responded with status: ${response.status}`
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to check whitelist'
      },
      { status: 500 }
    );
  }
}