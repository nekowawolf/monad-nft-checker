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

    const coronadApiUrl = process.env.CORONAD_API_URL;
    
    if (!coronadApiUrl) {
      console.error('CORONAD_API_URL is not set');
      return NextResponse.json(
        { 
          success: false,
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    console.log('Proxying to Coronad API:', coronadApiUrl);
    console.log('Checking address:', address);
    
    const requestBody = JSON.stringify({ address: address.toLowerCase() });
    console.log('Request body to Coronad:', requestBody);
    
    const response = await fetch(coronadApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
      },
      body: requestBody,
    });
    
    console.log('Coronad API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Coronad API error details:', {
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
    console.log('Coronad proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Coronad proxy error:', error);
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

    const coronadApiUrl = process.env.CORONAD_API_URL;
    
    if (!coronadApiUrl) {
      console.error('CORONAD_API_URL is not set');
      return NextResponse.json(
        { 
          success: false,
          error: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    console.log('Proxying to Coronad API (GET):', coronadApiUrl);
    console.log('Checking address:', address);
    
    const requestBody = JSON.stringify({ address: address.toLowerCase() });
    console.log('Request body to Coronad:', requestBody);
    
    const response = await fetch(coronadApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
      },
      body: requestBody,
    });
    
    console.log('Coronad API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Coronad API error details:', {
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
    console.log('Coronad proxy response received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Coronad proxy error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to check eligibility'
      },
      { status: 500 }
    );
  }
}