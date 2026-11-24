import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  const { name, email, guests, totalAmount } = await request.json();

  // 1. Generate unique Sagada Reference Number (e.g., SGD-1732412345)
  const refNum = `SGD-${Date.now().toString().slice(-8)}`;

  // 2. Save PENDING registration to free Supabase database
  const { error } = await supabase.from('registrations').insert([
    {
      reference_number: refNum,
      full_name: name,
      email: email,
      guests: guests,
      total_amount: totalAmount,
      payment_status: 'PENDING',
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 3. Prepare Landbank LinkBiz Encrypted Payload
  // Replace these placeholder values once Landbank approves your API keys
  const merchantCode = process.env.LINKBIZ_MERCHANT_CODE || 'TEST_MERCHANT';
  const secretKey = process.env.LINKBIZ_SECRET_KEY || 'TEST_SECRET_KEY';
  const linkbizBaseUrl = process.env.LINKBIZ_URL || 'https://landbank.com';

  // Generate security checksum (Exact format will match Landbank's API manual)
  const rawString = `${merchantCode}|${refNum}|${totalAmount.toFixed(2)}|${secretKey}`;
  const checksum = crypto.createHash('sha256').update(rawString).digest('hex');

  // 4. Construct direct checkout URL skipping manual forms
  const params = new URLSearchParams({
    MerchantCode: merchantCode,
    RefNum: refNum,
    Name: name,
    Email: email,
    Amount: totalAmount.toFixed(2),
    Checksum: checksum,
  });

  return NextResponse.json({
    redirectUrl: `${linkbizBaseUrl}?${params.toString()}`,
  });
}
