import { NextRequest, NextResponse } from 'next/server'
import { getOutpaceAgingIssueBySlug, OUTPACE_AGING_ISSUE_01 } from '@/lib/data/outpaceAgingIssues'
import { buildBeehiivRichHtmlAndText } from '@/components/newsletter/OutpaceAgingIssueView'

/**
 * POST /api/newsletter/beehiiv-publish
 * Automatically uploads a weekly Outpace Aging edition to Beehiiv via the official Beehiiv v2 Posts API
 * (`https://api.beehiiv.com/v2/publications/{publicationId}/posts`).
 *
 * Body: { slug?: string, status?: 'draft' | 'confirmed', scheduledAt?: string }
 * Requires env vars: BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const issue = getOutpaceAgingIssueBySlug(body.slug) || OUTPACE_AGING_ISSUE_01
    const { html, text } = buildBeehiivRichHtmlAndText(issue)

    const apiKey = process.env.BEEHIIV_API_KEY
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID

    if (!apiKey || !publicationId) {
      return NextResponse.json(
        {
          ok: false,
          mode: 'html_export_only',
          message:
            'Set BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID in .env.local (or Vercel environment variables) to enable automatic 1-click Beehiiv post creation and scheduling.',
          issueSlug: issue.shortSlug,
          title: `${issue.title} — Edition #${issue.issueNumber}`,
          subtitle: issue.subtitle,
          html,
          text
        },
        { status: 200 }
      )
    }

    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/posts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: `Outpace Aging #${issue.issueNumber}: ${issue.subtitle}`,
          subtitle: `${issue.dateLabel} • LEVL Weekly Longevity Roundup`,
          body_content: html,
          status: body.status === 'confirmed' ? 'confirmed' : 'draft',
          ...(body.scheduledAt ? { scheduled_at: body.scheduledAt } : {})
        })
      }
    )

    const beehiivJson = await beehiivRes.json().catch(() => ({}))
    if (!beehiivRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Beehiiv API returned an error',
          status: beehiivRes.status,
          details: beehiivJson
        },
        { status: beehiivRes.status }
      )
    }

    return NextResponse.json({
      ok: true,
      mode: 'beehiiv_api_published',
      post: beehiivJson
    })
  } catch (err: unknown) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : 'Unexpected error'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/newsletter/beehiiv-publish?slug=edition-1
 * Returns the ready-to-upload Beehiiv HTML document for any edition.
 */
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || 'edition-1'
  const issue = getOutpaceAgingIssueBySlug(slug) || OUTPACE_AGING_ISSUE_01
  const { html } = buildBeehiivRichHtmlAndText(issue)

  const doc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${issue.title} — Edition #${issue.issueNumber}</title>
</head>
<body style="max-width: 680px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0f172a;">
${html}
</body>
</html>`

  return new NextResponse(doc, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `inline; filename="outpace-aging-${issue.shortSlug}-beehiiv.html"`
    }
  })
}
