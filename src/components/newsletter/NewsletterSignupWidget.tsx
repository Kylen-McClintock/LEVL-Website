'use client'

import React, { useState, useEffect, useId, useCallback } from 'react'
import { Mail, CheckCircle2, Sparkles, ArrowRight, AlertCircle } from 'lucide-react'

const STORAGE_KEY = 'levl_newsletter_subscribed_email'
const SUBSCRIBED_EVENT = 'levl_newsletter_subscribed'

export function useNewsletterSubscriptionState() {
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const fromEmailUtm =
        params.get('subscribed') === '1' ||
        params.get('utm_source')?.toLowerCase() === 'beehiiv' ||
        params.get('utm_medium')?.toLowerCase() === 'email'
      const emailParam = params.get('email')?.trim().toLowerCase()

      if (emailParam && emailParam.includes('@')) {
        localStorage.setItem(STORAGE_KEY, emailParam)
        setSubscribedEmail(emailParam)
      } else if (fromEmailUtm) {
        const existing = localStorage.getItem(STORAGE_KEY) || 'subscriber@beehiiv'
        localStorage.setItem(STORAGE_KEY, existing)
        setSubscribedEmail(existing)
      } else {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) setSubscribedEmail(saved)
      }
    } catch {}
    setHydrated(true)

    const onSubscribed = (e: Event) => {
      const custom = e as CustomEvent<{ email?: string }>
      const nextEmail = custom.detail?.email || localStorage.getItem(STORAGE_KEY)
      if (nextEmail) setSubscribedEmail(nextEmail)
    }

    window.addEventListener(SUBSCRIBED_EVENT, onSubscribed)
    return () => window.removeEventListener(SUBSCRIBED_EVENT, onSubscribed)
  }, [])

  const markSubscribed = useCallback((email: string) => {
    const clean = email.trim().toLowerCase()
    try {
      localStorage.setItem(STORAGE_KEY, clean)
      window.dispatchEvent(
        new CustomEvent(SUBSCRIBED_EVENT, { detail: { email: clean } })
      )
    } catch {}
    setSubscribedEmail(clean)
  }, [])

  const clearSubscribed = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
    setSubscribedEmail(null)
  }, [])

  return {
    isSubscribed: Boolean(subscribedEmail),
    subscribedEmail,
    hydrated,
    markSubscribed,
    clearSubscribed
  }
}

export function NewsletterHeaderSubscribeButton({
  isLightMode = false
}: {
  isLightMode?: boolean
}) {
  const { isSubscribed, hydrated } = useNewsletterSubscriptionState()

  const handleScrollToSignup = () => {
    const el =
      document.getElementById('newsletter-signup-hero') ||
      document.getElementById('newsletter-signup-closing')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      const input = el.querySelector('input[type="email"]') as HTMLInputElement | null
      if (input) {
        setTimeout(() => input.focus(), 350)
      }
    } else {
      window.dispatchEvent(new CustomEvent('levl_open_newsletter_signup'))
    }
  }

  if (hydrated && isSubscribed) {
    return (
      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent('levl_open_newsletter_signup'))}
        title="You're subscribed to Outpace Aging (click to add another email)"
        className={`h-8 inline-flex items-center justify-center gap-1.5 px-2.5 rounded-lg text-xs font-bold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
          isLightMode
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            : 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30 hover:bg-emerald-500/25'
        }`}
      >
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:inline">Subscribed</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleScrollToSignup}
      className="h-8 inline-flex items-center justify-center gap-1.5 px-3 rounded-lg text-xs font-extrabold whitespace-nowrap shrink-0 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:opacity-95 transition-opacity shadow cursor-pointer"
    >
      <Mail className="w-3.5 h-3.5 shrink-0" />
      <span>Subscribe</span>
    </button>
  )
}

export default function NewsletterSignupBanner({
  isLightMode = false,
  variant = 'hero',
  issueSlug = 'edition-1',
  source = 'newsletter_web'
}: {
  isLightMode?: boolean
  variant?: 'hero' | 'closing'
  issueSlug?: string
  source?: string
}) {
  const inputId = useId()
  const feedbackId = useId()
  const { isSubscribed, subscribedEmail, hydrated, markSubscribed, clearSubscribed } =
    useNewsletterSubscriptionState()

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [forceShowForm, setForceShowForm] = useState(false)

  useEffect(() => {
    const handleForceOpen = () => setForceShowForm(true)
    window.addEventListener('levl_open_newsletter_signup', handleForceOpen)
    return () => window.removeEventListener('levl_open_newsletter_signup', handleForceOpen)
  }, [])

  // Validate on blur (never while actively typing) per modern-web-guidance `forms`
  const handleBlur = () => {
    const trimmed = email.trim()
    if (!trimmed) {
      setErrorMessage('')
      return
    }
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    if (!valid) {
      setErrorMessage('Please enter a valid email address (for example, you@domain.com).')
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (errorMessage) setErrorMessage('')
    if (status === 'error') setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMessage('Please enter a valid email address.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/newsletter/subscribe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          source,
          issueSlug
        })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.ok === false) {
        throw new Error(data.message || 'Could not complete signup. Please try again.')
      }

      markSubscribed(trimmed)
      setStatus('success')
      setEmail('')
      setForceShowForm(false)
    } catch (err: unknown) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Could not complete signup. Please try again.'
      )
    }
  }

  // If the reader is already subscribed and hasn't clicked "Subscribe another email":
  // - Hide the top hero banner completely so returning subscribers have zero clutter
  // - Show a compact confirmation strip in the closing section
  if (hydrated && isSubscribed && !forceShowForm && status !== 'success') {
    if (variant === 'hero') {
      return null
    }
    return (
      <div
        id="newsletter-signup-closing"
        className={`rounded-2xl border px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs ${
          isLightMode
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
            : 'bg-emerald-950/25 border-emerald-500/30 text-emerald-200'
        }`}
      >
        <div className="flex items-center gap-2 font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>
            You&apos;re subscribed to <strong>Outpace Aging</strong>
            {subscribedEmail && subscribedEmail !== 'subscriber@beehiiv'
              ? ` (${subscribedEmail})`
              : ''}
            . New issues arrive every Thursday.
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            clearSubscribed()
            setForceShowForm(true)
          }}
          className={`underline font-bold cursor-pointer ${
            isLightMode ? 'text-emerald-800 hover:text-emerald-950' : 'text-emerald-300 hover:text-white'
          }`}
        >
          Subscribe another email
        </button>
      </div>
    )
  }

  return (
    <div
      id={variant === 'hero' ? 'newsletter-signup-hero' : 'newsletter-signup-closing'}
      className={`rounded-2xl border p-4 sm:p-5 transition-colors ${
        isLightMode
          ? 'bg-gradient-to-r from-emerald-50/90 via-white to-cyan-50/90 border-emerald-200 shadow-xs'
          : 'bg-gradient-to-r from-emerald-950/45 via-slate-900/95 to-cyan-950/35 border-emerald-500/35'
      }`}
    >
      {status === 'success' ? (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-wrap items-center justify-between gap-3 py-1"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <div
                className={`text-sm sm:text-base font-extrabold ${
                  isLightMode ? 'text-slate-900' : 'text-white'
                }`}
              >
                You&apos;re subscribed to Outpace Aging!
              </div>
              <p
                className={`text-xs ${
                  isLightMode ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                Every Thursday you&apos;ll receive the 5 most important primary-source longevity breakthroughs + 1 Protocol &amp; 1 Modality.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form
          method="POST"
          action="/api/newsletter/subscribe/"
          onSubmit={handleSubmit}
          noValidate
          className="space-y-2.5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor={inputId}
              className={`text-xs sm:text-sm font-extrabold flex items-center gap-1.5 ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
              Get Outpace Aging in Your Inbox Every Thursday (Free)
            </label>
            <span
              className={`text-[11px] font-medium ${
                isLightMode ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              5 peer-reviewed studies • 1 Protocol • 1 Modality • Unsubscribe anytime
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <input
              id={inputId}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              enterKeyHint="done"
              required
              value={email}
              onChange={handleInput}
              onBlur={handleBlur}
              aria-describedby={errorMessage ? feedbackId : undefined}
              aria-invalid={Boolean(errorMessage)}
              placeholder="you@domain.com"
              className={`flex-1 min-h-12 px-4 py-2.5 rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-emerald-400/60 transition-colors ${
                errorMessage
                  ? isLightMode
                    ? 'bg-white border-rose-400 text-slate-900'
                    : 'bg-slate-950 border-rose-500/70 text-white'
                  : isLightMode
                    ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                    : 'bg-slate-950/90 border-white/15 text-white placeholder:text-slate-500'
              }`}
            />

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="min-h-12 px-5 py-2.5 rounded-xl text-sm font-extrabold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:opacity-95 disabled:opacity-60 transition-opacity shadow-md inline-flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>{status === 'submitting' ? 'Subscribing...' : 'Subscribe Free'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div id={feedbackId} aria-live="polite" className="min-h-[1rem]">
            {errorMessage && (
              <p
                className={`text-xs font-semibold flex items-center gap-1.5 ${
                  isLightMode ? 'text-rose-700' : 'text-rose-400'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
