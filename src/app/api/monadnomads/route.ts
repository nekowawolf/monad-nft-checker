import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = body;

    if (!address) {
      return NextResponse.json({ 
        isWhitelisted: false,
        error: 'Missing address parameter' 
      }, { status: 400 });
    }

    const monadnomadsApiUrl = process.env.MONADNOMADS_API_URL;
    
    if (!monadnomadsApiUrl) {
      console.error('MONADNOMADS_API_URL is not set');
      return NextResponse.json(
        { 
          isWhitelisted: false,
          error: 'Server configuration error',
          message: 'Service temporarily unavailable'
        },
        { status: 500 }
      );
    }

    console.log('Proxying to MonadNomads API:', monadnomadsApiUrl);
    console.log('Checking address:', address);
    
    const requestBody = JSON.stringify({ wallet: address });
    console.log('Request body to MonadNomads:', requestBody);
    
    const response = await fetch(monadnomadsApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
      },
      body: requestBody,
    });
    
    console.log('MonadNomads API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('MonadNomads API error details:', {
        status: response.status,
        statusText: response.statusText,
        errorText: errorText
      });
      
      return NextResponse.json(
        { 
          isWhitelisted: false,
          error: `API responded with status: ${response.status}`,
          message: 'Service temporarily unavailable'
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    console.log('MonadNomads proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('MonadNomads proxy error:', error);
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json({ 
        isWhitelisted: false,
        error: 'Missing address parameter' 
      }, { status: 400 });
    }

    const monadnomadsApiUrl = process.env.MONADNOMADS_API_URL;
    
    if (!monadnomadsApiUrl) {
      console.error('MONADNOMADS_API_URL is not set');
      return NextResponse.json(
        { 
          isWhitelisted: false,
          error: 'Server configuration error',
          message: 'Service temporarily unavailable'
        },
        { status: 500 }
      );
    }

    console.log('Proxying to MonadNomads API (GET):', monadnomadsApiUrl);
    console.log('Checking address:', address);
    
    const requestBody = JSON.stringify({ wallet: address });
    console.log('Request body to MonadNomads:', requestBody);
    
    const response = await fetch(monadnomadsApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
      },
      body: requestBody,
    });
    
    console.log('MonadNomads API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('MonadNomads API error details:', {
        status: response.status,
        statusText: response.statusText,
        errorText: errorText
      });
      
      return NextResponse.json(
        { 
          isWhitelisted: false,
          error: `API responded with status: ${response.status}`,
          message: 'Service temporarily unavailable'
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    console.log('MonadNomads proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('MonadNomads proxy error:', error);
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