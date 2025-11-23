import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = body;

    if (!address) {
      return NextResponse.json({ 
        error: 'Missing address parameter' 
      }, { status: 400 });
    }

    const monicornsApiUrl = process.env.MONICORNS_API_URL;
    
    if (!monicornsApiUrl) {
      console.error('MONICORNS_API_URL is not set');
      return NextResponse.json(
        { 
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    console.log('Proxying to Monicorns API:', monicornsApiUrl);
    console.log('Checking address:', address);
    
    const requestBody = JSON.stringify({ wallet_address: address });
    console.log('Request body to Monicorns:', requestBody);
    
    const response = await fetch(monicornsApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
      },
      body: requestBody,
    });
    
    console.log('Monicorns API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Monicorns API error details:', {
        status: response.status,
        statusText: response.statusText,
        errorText: errorText
      });
      
      return NextResponse.json(
        { 
          error: `API responded with status: ${response.status}`
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    console.log('Monicorns proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Monicorns proxy error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check waitlist status'
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
        error: 'Missing address parameter' 
      }, { status: 400 });
    }

    const monicornsApiUrl = process.env.MONICORNS_API_URL;
    
    if (!monicornsApiUrl) {
      console.error('MONICORNS_API_URL is not set');
      return NextResponse.json(
        { 
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    console.log('Proxying to Monicorns API (GET):', monicornsApiUrl);
    console.log('Checking address:', address);
    
    const requestBody = JSON.stringify({ wallet_address: address });
    console.log('Request body to Monicorns:', requestBody);
    
    const response = await fetch(monicornsApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
      },
      body: requestBody,
    });
    
    console.log('Monicorns API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Monicorns API error details:', {
        status: response.status,
        statusText: response.statusText,
        errorText: errorText
      });
      
      return NextResponse.json(
        { 
          error: `API responded with status: ${response.status}`
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    console.log('Monicorns proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Monicorns proxy error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check waitlist status'
      },
      { status: 500 }
    );
  }
}