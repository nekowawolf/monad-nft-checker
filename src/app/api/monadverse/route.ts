import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const csvFiles = [
  { name: 'Versewarden', file: 'versewarden_1.csv', details: 'Top-tier guaranteed whitelist: 2 free mints' },
  { name: 'Versekeeper', file: 'versekeeper_1.csv', details: 'Guaranteed whitelist: 1 free mint' },
  { name: 'Verseguardian', file: 'verseguardian_1.csv', details: 'Guaranteed mint: 1 NFT' },
  { name: 'Verseseeker', file: 'verseseeker_1.csv', details: 'FCFS phase: chance to mint 1 NFT' },
];

async function checkCsvAddress(address: string) {
  for (const role of csvFiles) {
    const csvPath = path.join(process.cwd(), 'public', 'csv', role.file);

    if (!fs.existsSync(csvPath)) continue;

    const csvText = fs.readFileSync(csvPath, 'utf-8');
    const parsed = Papa.parse(csvText, { header: true });

    const found = parsed.data.find((row: any) => {
      return row['Wallet address']?.trim().toLowerCase() === address.toLowerCase();
    });

    if (found) {
      return {
        eligible: true,
        message: 'You are eligible!',
        details: `${role.details} (${role.name})`,
      };
    }
  }

  return {
    eligible: false,
    message: 'Not eligible',
    details: 'Your wallet is not in the whitelist for Monadverse',
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
    console.error('Monadverse CSV check error:', error);
    return NextResponse.json(
      { error: 'Failed to check eligibility' },
      { status: 500 }
    );
  }
}