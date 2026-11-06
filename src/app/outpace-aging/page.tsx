'use client'

import React from 'react'
import OutpaceAgingIssueView from '@/components/newsletter/OutpaceAgingIssueView'
import { OUTPACE_AGING_ISSUE_01 } from '@/lib/data/outpaceAgingIssues'

export default function OutpaceAgingPage() {
  return <OutpaceAgingIssueView issue={OUTPACE_AGING_ISSUE_01} />
}
