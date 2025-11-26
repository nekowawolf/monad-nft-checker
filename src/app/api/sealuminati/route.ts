import { NextRequest, NextResponse } from 'next/server';

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

    const sealuminatiApiUrl = process.env.SEALUMINATI_API_URL;
    
    if (!sealuminatiApiUrl) {
      console.error('SEALUMINATI_API_URL is not set');
      return NextResponse.json(
        { 
          success: false,
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    console.log('Proxying to Sealuminati API:', sealuminatiApiUrl);
    console.log('Checking address:', address);
    
    const apiUrl = `${sealuminatiApiUrl}?wallet=${address}`;
    console.log('Full API URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('Sealuminati API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Sealuminati API error details:', {
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
    console.log('Sealuminati proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Sealuminati proxy error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to check eligibility'
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
        success: false,
        error: 'Wallet address is required' 
      }, { status: 400 });
    }

    const sealuminatiApiUrl = process.env.SEALUMINATI_API_URL;
    
    if (!sealuminatiApiUrl) {
      console.error('SEALUMINATI_API_URL is not set');
      return NextResponse.json(
        { 
          success: false,
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    console.log('Proxying to Sealuminati API (POST):', sealuminatiApiUrl);
    console.log('Checking address:', address);
    
    const apiUrl = `${sealuminatiApiUrl}?wallet=${address}`;
    console.log('Full API URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('Sealuminati API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Sealuminati API error details:', {
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
    console.log('Sealuminati proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Sealuminati proxy error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to check eligibility'
      },
      { status: 500 }
    );
  }
}