import { NextResponse } from 'next/server';
import { ensureTables, pool } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName ?? '').trim();
    const lastName = String(body.lastName ?? '').trim();
    const email = String(body.email ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const course = String(body.course ?? '').trim();
    const education = String(body.education ?? '').trim();
    const goals = String(body.goals ?? '').trim();

    if (!firstName || !lastName || !email || !phone || !course || !education) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await ensureTables();
    await pool.query(
      `
        INSERT INTO student_registrations (
          first_name, last_name, email, phone, course, education, goals
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [firstName, lastName, email, phone, course, education || null, goals || null]
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to submit registration' }, { status: 500 });
  }
}
