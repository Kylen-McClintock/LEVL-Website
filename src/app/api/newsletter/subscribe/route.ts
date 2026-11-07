import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const RESEND_AUDIENCE_ID =
  process.env.RESEND_AUDIENCE_ID || '442c6812-7d1d-44c2-866f-922b4d8f5349'

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://kzzqlwtwfaoskbuvtwcn.supabase.co'
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  ''

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    let email = ''
    let source = 'newsletter_web'
    let issueSlug = 'edition-1'

    const contentType = req.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const body = await req.json().catch(() => ({}))
      email = String(body.email || '').trim().toLowerCase()
      source = String(body.source || 'newsletter_web')
      issueSlug = String(body.issueSlug || 'edition-1')
    } else {
      const formData = await req.formData().catch(() => null)
      if (formData) {
        email = String(formData.get('email') || '').trim().toLowerCase()
        source = String(formData.get('source') || 'newsletter_web')
        issueSlug = String(formData.get('issueSlug') || 'edition-1')
      }
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const syncedChannels: string[] = []

    // 1. Save to Supabase (`newsletter_subscribers` table) if configured
    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const sbRes = await fetch(
          `${SUPABASE_URL}/rest/v1/newsletter_subscribers?on_conflict=email`,
          {
            method: 'POST',
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
              'Content-Type': 'application/json',
              Prefer: 'resolution=merge-duplicates,return=minimal'
            },
            body: JSON.stringify({
              email,
              source,
              issue_slug: issueSlug,
              status: 'active',
              updated_at: new Date().toISOString()
            })
          }
        )
        if (sbRes.ok) {
          syncedChannels.push('supabase')
        }
      } catch {
        // Continue to Resend & Beehiiv even if table isn't created yet
      }
    }

    // 2. Save to Resend Contacts Audience (same audience used across levlhealth.com)
    if (RESEND_API_KEY && RESEND_AUDIENCE_ID) {
      try {
        const resendContactRes = await fetch(
          `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email,
              unsubscribed: false
            })
          }
        )
        if (resendContactRes.ok) {
          syncedChannels.push('resend_audience')
        }

        // Send notification email
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Outpace Aging Newsletter <onboarding@resend.dev>',
            to: ['kylen.mcclintock@gmail.com'],
            subject: `New Outpace Aging Subscriber: ${email}`,
            text: `New newsletter signup: ${email}\nSource: ${source} (${issueSlug})\nSynced channels: ${syncedChannels.join(', ') || 'resend'}`
          })
        }).catch(() => {})
      } catch {
        // Non-blocking
      }
    }

    // 3. Optional Beehiiv Free-Plan Subscriber Sync (works on Free/Launch plan if BEEHIIV_API_KEY + BEEHIIV_PUBLICATION_ID are set)
    const beehiivApiKey = process.env.BEEHIIV_API_KEY
    const beehiivPubId = process.env.BEEHIIV_PUBLICATION_ID
    if (beehiivApiKey && beehiivPubId) {
      try {
        const bhRes = await fetch(
          `https://api.beehiiv.com/v2/publications/${beehiivPubId}/subscriptions`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${beehiivApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email,
              reactivate_existing: true,
              send_welcome_email: true,
              utm_source: 'levlhealth.com',
              utm_medium: 'organic',
              utm_campaign: `outpace_aging_${issueSlug}`
            })
          }
        )
        if (bhRes.ok) {
          syncedChannels.push('beehiiv')
        }
      } catch {
        // Non-blocking
      }
    }

    return NextResponse.json({
      ok: true,
      email,
      syncedChannels,
      message:
        "You're subscribed to Outpace Aging! Every Thursday you'll get the 5 top longevity breakthroughs and daily protocols."
    })
  } catch (err: unknown) {
    return NextResponse.json(
      {
        ok: false,
        message:
          err instanceof Error
            ? err.message
            : 'Unable to subscribe right now. Please try again.'
      },
      { status: 500 }
    )
  }
}
