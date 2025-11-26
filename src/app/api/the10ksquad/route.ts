import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = body;

    if (!address) {
      return NextResponse.json({ 
        success: false,
        error: 'Wallet address is required' 
      }, { status: 400 });
    }

    const the10kSquadApiUrl = process.env.THE10KSQUAD_API_URL;
    
    if (!the10kSquadApiUrl) {
      console.error('THE10KSQUAD_API_URL is not set');
      return NextResponse.json(
        { 
          success: false,
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    console.log('Proxying to The 10k Squad API:', the10kSquadApiUrl);
    console.log('Checking address:', address);
    
    const requestBody = JSON.stringify({ walletAddress: address });
    console.log('Request body to The 10k Squad:', requestBody);
    
    const response = await fetch(the10kSquadApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
    
    console.log('The 10k Squad API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('The 10k Squad API error details:', {
        status: response.status,
        statusText: response.statusText,
        errorText: errorText
      });
      
      return NextResponse.json(
        { 
          success: false,
          error: `API responded with status: ${response.status}`
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    console.log('The 10k Squad proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('The 10k Squad proxy error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to check eligibility'
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
        error: 'Wallet address is required' 
      }, { status: 400 });
    }

    const the10kSquadApiUrl = process.env.THE10KSQUAD_API_URL;
    
    if (!the10kSquadApiUrl) {
      console.error('THE10KSQUAD_API_URL is not set');
      return NextResponse.json(
        { 
          success: false,
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    console.log('Proxying to The 10k Squad API (GET):', the10kSquadApiUrl);
    console.log('Checking address:', address);
    
    const requestBody = JSON.stringify({ walletAddress: address });
    console.log('Request body to The 10k Squad:', requestBody);
    
    const response = await fetch(the10kSquadApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
    
    console.log('The 10k Squad API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('The 10k Squad API error details:', {
        status: response.status,
        statusText: response.statusText,
        errorText: errorText
      });
      
      return NextResponse.json(
        { 
          success: false,
          error: `API responded with status: ${response.status}`
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    console.log('The 10k Squad proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('The 10k Squad proxy error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to check eligibility'
      },
      { status: 500 }
    );
  }
}