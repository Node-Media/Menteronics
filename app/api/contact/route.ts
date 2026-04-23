import { NextResponse } from 'next/server';
import { ensureTables, pool } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName ?? '').trim();
    const lastName = String(body.lastName ?? '').trim();
    const email = String(body.email ?? '').trim();
    const subject = String(body.subject ?? '').trim();
    const message = String(body.message ?? '').trim();

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await ensureTables();
    await pool.query(
      `
        INSERT INTO homepage_contact_messages (
          first_name, last_name, email, subject, message
        ) VALUES ($1, $2, $3, $4, $5)
      `,
      [firstName, lastName, email, subject, message]
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 });
  }
}
