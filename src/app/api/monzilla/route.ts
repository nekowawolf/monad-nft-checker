import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

interface CsvRow {
  wallet: string;
  count: string; 
}

const csvFiles = [
  { name: 'GTD', file: 'monzilla_gtd.csv', details: 'Top-tier guaranteed whitelist: {count} NFT' },
  { name: 'FCFS', file: 'monzilla_fcfs.csv', details: 'FCFS phase: chance to mint {count} NFT' },
  { name: 'FreeMint', file: 'monzilla_freemint.csv', details: 'Free mint: {count} NFT' },
];

async function checkCsvAddress(address: string) {
  for (const csv of csvFiles) {
    const csvPath = path.join(process.cwd(), 'public', 'csv', csv.file);
    const fileContent = fs.readFileSync(csvPath, 'utf-8');

    const parsed = Papa.parse<CsvRow>(fileContent, { header: true });
    const found = parsed.data.find(
      (row) => row.wallet?.toLowerCase() === address.toLowerCase()
    );

    if (found) {
      return {
        eligible: true,
        message: 'You are eligible!',
        details: csv.details.replace('{count}', found.count),
      };
    }
  }

  return {
    eligible: false,
    message: 'Not eligible',
    details: 'Your wallet is not in the whitelist for Monzilla',
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
    console.error('Monzilla CSV check error:', error);
    return NextResponse.json(
      { error: 'Failed to check eligibility' },
      { status: 500 }
    );
  }
}