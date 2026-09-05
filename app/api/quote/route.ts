import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, pickup_date, return_date, vehicle, message } = body;

    if (!name || !phone || !email || !pickup_date || !return_date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Supabase (optional — skipped if env vars not set)
    const supabase = getSupabase();
    const resendConfigured = !!process.env.RESEND_API_KEY;
    if (!supabase && !resendConfigured) {
      // Both integrations are unset: the request below is accepted (200) but nothing
      // stores or delivers it anywhere. Log loudly — this is a deploy misconfiguration,
      // not a normal degraded mode.
      console.error("Quote API: neither Supabase nor Resend is configured — request will be accepted but not saved or emailed");
    }
    if (supabase) {
      const { error: dbError } = await supabase.from("quotes").insert([
        { name, phone, email, pickup_date, return_date, vehicle, message },
      ]);
      // Non-fatal: the e-mail below is the primary delivery path. Logged so a broken
      // Supabase insert (bad schema, RLS change, expired key) doesn't go unnoticed.
      if (dbError) console.error("Quote API: Supabase insert failed", dbError);
    }

    // Send email via Resend (skipped if RESEND_API_KEY not set)
    const resend = getResend();
    if (resend) {
      const { error: mailError } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Mountain Car Website <onboarding@resend.dev>",
        to: [process.env.RESEND_TO_EMAIL || "rental@mountaincar.is"],
        replyTo: email,
        subject: `New Quote Request — ${vehicle} — ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1E293B; padding: 24px; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">New Quote Request</h1>
              <p style="color: #F58220; margin: 4px 0 0; font-size: 14px;">Mountain Car Website</p>
            </div>
            <div style="background: #f8fafc; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #1e293b;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone</td><td style="padding: 8px 0; font-weight: 600; color: #1e293b;"><a href="tel:${phone}">${phone}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td><td style="padding: 8px 0; font-weight: 600; color: #1e293b;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Pick-up Date</td><td style="padding: 8px 0; font-weight: 600; color: #1e293b;">${pickup_date}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Return Date</td><td style="padding: 8px 0; font-weight: 600; color: #1e293b;">${return_date}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Vehicle</td><td style="padding: 8px 0; font-weight: 600; color: #F58220;">${vehicle}</td></tr>
                ${message ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 14px; vertical-align: top;">Message</td><td style="padding: 8px 0; color: #1e293b;">${message}</td></tr>` : ""}
              </table>
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">Reply to this email to respond directly to ${name}.</p>
              </div>
            </div>
          </div>
        `,
      });
      // Non-fatal by design (see docs/quality/BACKLOG.md) — but logged, so a rejected
      // send (unverified from-domain, bad key, quota) leaves a trace instead of vanishing.
      if (mailError) console.error("Quote API: Resend send failed", mailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
