import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = body;

    if (!address) {
      return NextResponse.json({ 
        error: 'Address is required' 
      }, { status: 400 });
    }

    const mongangApiUrl = process.env.MONGANG_API_URL;
    
    if (!mongangApiUrl) {
      console.error('MONGANG_API_URL is not set');
      return NextResponse.json(
        { 
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    console.log('Proxying to Mongang API:', mongangApiUrl);
    console.log('Checking address:', address);
    
    const requestBody = JSON.stringify({ walletAddress: address });
    console.log('Request body to Mongang:', requestBody);
    
    const response = await fetch(mongangApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
    
    console.log('Mongang API response status:', response.status);
    
    if (!response.ok) {
      return NextResponse.json(
        { 
          error: `API responded with status: ${response.status}`
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    console.log('Mongang proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Mongang proxy error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check NFT holdings'
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
        error: 'Address is required' 
      }, { status: 400 });
    }

    const mongangApiUrl = process.env.MONGANG_API_URL;
    
    if (!mongangApiUrl) {
      return NextResponse.json(
        { 
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    const response = await fetch(mongangApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress: address }),
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { 
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
        error: 'Failed to check NFT holdings'
      },
      { status: 500 }
    );
  }
}