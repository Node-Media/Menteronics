 'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get('firstName') ?? ''),
      lastName: String(formData.get('lastName') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      course: String(formData.get('course') ?? ''),
      education: String(formData.get('education') ?? ''),
      goals: String(formData.get('goals') ?? ''),
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save registration');
      }

      setSubmitMessage({
        type: 'success',
        text: 'Registration submitted successfully. Our team will contact you soon.',
      });
      form.reset();
    } catch {
      setSubmitMessage({
        type: 'error',
        text: 'Something went wrong while submitting. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative overflow-hidden border-b border-black/10 bg-gray-50/40">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-black/5 blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="w-fit text-sm font-medium text-gray-600 transition-colors hover:text-accent"
          >
            ← Back to home
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-black leading-tight md:text-5xl">
              Student <span className="text-gradient">Registration</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Fill out the form below to register for our web development course.
              Our team will contact you with the next steps.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold">Register Now</h2>
            <p className="mt-2 text-sm text-gray-600">
              All fields marked with * are required.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-sm font-semibold">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="Enter first name"
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-2 block text-sm font-semibold">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Enter last name"
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-semibold">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="course" className="mb-2 block text-sm font-semibold">
                    Course *
                  </label>
                  <select
                    id="course"
                    name="course"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="" disabled>
                      Select a course
                    </option>
                    <option value="full-stack-web-development">Full Stack Web Development</option>
                    <option value="frontend-development">Frontend Development</option>
                    <option value="backend-development">Backend Development</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="education" className="mb-2 block text-sm font-semibold">
                    Current Education / Qualification *
                  </label>
                  <input
                    id="education"
                    name="education"
                    type="text"
                    required
                    placeholder="B.E. Computer / BCA / etc."
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="goals" className="mb-2 block text-sm font-semibold">
                  Why do you want to join this course?
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  rows={5}
                  placeholder="Share your learning goals..."
                  className="w-full resize-none rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
              {submitMessage ? (
                <p
                  className={`text-sm font-medium ${
                    submitMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {submitMessage.text}
                </p>
              ) : null}
            </form>
          </div>

          <aside className="h-fit rounded-2xl border border-black/10 bg-gray-50/70 p-6 md:p-8">
            <h3 className="text-xl font-bold">Before You Submit</h3>
            <ul className="mt-5 space-y-3 text-sm text-gray-600">
              <li>Use your active email and phone number for quick updates.</li>
              <li>Choose the course that best matches your current skill level.</li>
              <li>Our admission team typically responds within 24 hours.</li>
            </ul>
            <div className="mt-6 rounded-xl border border-black/10 bg-white p-4">
              <p className="text-sm font-semibold">Need help?</p>
              <p className="mt-1 text-sm text-gray-600">
                Email us at{' '}
                <a
                  href="mailto:hello@menteronics.com"
                  className="font-medium text-accent transition hover:opacity-80"
                >
                  hello@menteronics.com
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-gray-50/40 py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div>
            <p className="text-xl font-bold text-gradient">Menteronics</p>
            <p className="mt-1 text-sm text-gray-600">
              Transform your career with cutting-edge web development education.
            </p>
          </div>
          <div className="text-sm text-gray-600">
            <p>hello@menteronics.com</p>
            <p className="mt-1">+91 8530217696</p>
            <p className="mt-1">+91 8669792979</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
