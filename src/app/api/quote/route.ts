import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Honeypot check
    if (data.website) {
      return NextResponse.json({ success: true, message: 'Received' });
    }

    // 2. Validation
    if (!data.name || !data.phone || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In production, integrate email sending (e.g. Nodemailer/Resend to info@anadcorp.com)
    // or log to database.
    console.log('[B2B Quote Request Received]:', {
      name: data.name,
      company: data.company || 'N/A',
      phone: data.phone,
      type: data.type,
      message: data.message,
      locale: data.locale,
      date: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Quote request registered successfully',
    });
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
