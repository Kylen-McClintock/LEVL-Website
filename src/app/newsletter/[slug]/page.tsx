import type { Metadata } from 'next'
import NewsletterIssueClient from './NewsletterIssueClient'
import {
  OUTPACE_AGING_ISSUES,
  getOutpaceAgingIssueBySlug,
} from '@/lib/data/outpaceAgingIssues'

export function generateStaticParams() {
  const params: { slug: string }[] = []
  for (const issue of OUTPACE_AGING_ISSUES) {
    params.push({ slug: issue.slug })
    if (issue.shortSlug && issue.shortSlug !== issue.slug) {
      params.push({ slug: issue.shortSlug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const issue = getOutpaceAgingIssueBySlug(slug)
  if (!issue) {
    return {
      title: 'Edition Not Found | Outpace Aging | LEVL Health',
      robots: { index: false, follow: true },
    }
  }

  const canonicalPath = `/newsletter/${issue.slug}/`
  const canonicalUrl = `https://www.levlhealth.com${canonicalPath}`

  return {
    title: `Edition #${issue.issueNumber}: ${issue.title} | LEVL Health`,
    description: issue.introSummaryParagraph.slice(0, 160),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `Edition #${issue.issueNumber}: ${issue.title} | LEVL Health`,
      description: issue.subtitle,
      url: canonicalUrl,
      type: 'article',
      siteName: 'LEVL Health',
      images: ['https://www.levlhealth.com/images/levl-escape-velocity.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Edition #${issue.issueNumber}: ${issue.title} | LEVL Health`,
      description: issue.subtitle,
      images: ['https://www.levlhealth.com/images/levl-escape-velocity.png'],
    },
  }
}

export default async function NewsletterIssuePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const issue = getOutpaceAgingIssueBySlug(slug)

  const articleLd = issue
    ? {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        '@id': `https://www.levlhealth.com/newsletter/${issue.slug}/#article`,
        headline: `Edition #${issue.issueNumber}: ${issue.title}`,
        description: issue.introSummaryParagraph,
        url: `https://www.levlhealth.com/newsletter/${issue.slug}/`,
        datePublished: issue.isoDate || '2026-11-19',
        author: {
          '@type': 'Person',
          '@id': 'https://kylen.vc/#kylen',
          name: 'Kylen McClintock',
          url: 'https://kylen.vc/',
        },
        publisher: {
          '@id': 'https://www.levlhealth.com/#organization',
        },
        citation: issue.studies.map((s) => ({
          '@type': 'ScholarlyArticle',
          headline: s.headline,
          url: s.studyUrl,
          identifier: s.doiLabel,
        })),
      }
    : null

  return (
    <>
      {articleLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
      )}
      <NewsletterIssueClient rawSlug={slug} />
    </>
  )
}
