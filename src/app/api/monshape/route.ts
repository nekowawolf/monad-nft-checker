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

    const monshapeApiUrl = process.env.MONSHAPE_API_URL;
    if (!monshapeApiUrl) {
      console.error('MONSHAPE_API_URL is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    console.log('Proxying to Monshape API:', monshapeApiUrl);
    console.log('Checking address:', address);

    const response = await fetch(monshapeApiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('Monshape API response status:', response.status);

    if (!response.ok) {
      return NextResponse.json(
        { error: `API responded with status: ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const wallet = data.wallets?.find(
      (w: any) => w.address?.toLowerCase() === address.toLowerCase()
    );

    if (wallet) {
      return NextResponse.json({
        eligible: true,
        message: 'CONGRATULATIONS! You are eligible',
        details: `Role: ${wallet.role}`,
      });
    }

    return NextResponse.json({
      eligible: false,
      message: 'Not eligible',
      details: 'Your wallet is not in the whitelist for Monshape',
    });
  } catch (error) {
    console.error('Monshape proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to check eligibility' },
      { status: 500 }
    );
  }
}