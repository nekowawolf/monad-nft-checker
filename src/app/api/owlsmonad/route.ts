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

    const apiUrl = process.env.OCTOTOOLS_API_URL;
    
    if (!apiUrl) {
      console.error('OCTOTOOLS_API_URL is not set');
      return NextResponse.json(
        { 
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }
    
    console.log('Proxying to OwlsMonad API for address:', address);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: address,
        projectNames: ["OwlsNad"]
      }),
    });
    
    console.log('OwlsMonad API response status:', response.status);
    
    if (!response.ok) {
      return NextResponse.json(
        { 
          error: `API responded with status: ${response.status}`
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    console.log('OwlsMonad proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('OwlsMonad proxy error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check eligibility'
      },
      { status: 500 }
    );
  }
}