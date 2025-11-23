import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';

const csvUrls = [
  { name: 'GTD', url: 'https://raw.githubusercontent.com/korenkine-code/doonwhitelist/main/gtd.csv', details: 'Guaranteed whitelist mint' },
  { name: 'FCFS', url: 'https://raw.githubusercontent.com/korenkine-code/doonwhitelist/main/fcfs.csv', details: 'First come first serve mint' },
];

async function checkCsvAddress(address: string) {
  for (const role of csvUrls) {
    try {
      const res = await fetch(role.url);
      if (!res.ok) continue;

      const csvText = await res.text();
      const parsed = Papa.parse(csvText, { header: true });
      const header = Object.keys(parsed.data[0] || {})[0];
      const found = parsed.data.find((row: any) => row[header]?.trim().toLowerCase() === address.toLowerCase());

      if (found) {
        return {
          eligible: true,
          message: 'You are eligible!',
          details: `${role.details} (${role.name})`,
        };
      }
    } catch (err) {
      console.error(`Error parsing CSV ${role.name}:`, err);
    }
  }

  return {
    eligible: false,
    message: 'Not eligible',
    details: 'Your wallet is not in the whitelist for Monadoon',
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    const result = await checkCsvAddress(address);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Monadoon CSV check error:', error);
    return NextResponse.json({ error: 'Failed to check eligibility' }, { status: 500 });
  }
}
