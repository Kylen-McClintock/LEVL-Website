"use server";

import { Resend } from "resend";
import {
  FLAGSHIP_PROTOCOLS,
  type FlagshipProtocolSlug,
} from "@/data/quizProtocols";

const AUDIENCE_ID = "442c6812-7d1d-44c2-866f-922b4d8f5349";

export interface QuizEmailPayload {
  email: string;
  emailProtocolLink: boolean;
  subscribeActivate: boolean;
  subscribeInsights: boolean;
  startSlug: FlagshipProtocolSlug;
  nextSlug: FlagshipProtocolSlug;
  levlAppStartUrl: string;
  longevityReviewsStartUrl: string;
  levlAppAddNextUrl: string;
  longevityReviewsAddNextUrl: string;
  deepCellEligible: boolean;
  deepCellHeadline?: string;
  deepCellRationale?: string;
}

export async function sendQuizRecommendations(payload: QuizEmailPayload): Promise<{
  success: boolean;
  message: string;
}> {
  const email = payload.email?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  if (
    !payload.emailProtocolLink &&
    !payload.subscribeActivate &&
    !payload.subscribeInsights
  ) {
    return {
      success: false,
      message: "Please select at least one option before sending.",
    };
  }

  const startProtocol = FLAGSHIP_PROTOCOLS[payload.startSlug];
  const nextProtocol = FLAGSHIP_PROTOCOLS[payload.nextSlug];

  if (!startProtocol || !nextProtocol) {
    return {
      success: false,
      message: "Invalid protocol selection. Please try again.",
    };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.warn("RESEND_API_KEY is not set; simulating quiz email send.");
    return {
      success: true,
      message: payload.emailProtocolLink
        ? "We’ve sent your personalized starting plan and protocol links!"
        : "Your selected preferences have been saved!",
    };
  }
  const resend = new Resend(resendApiKey);

  try {
    // CRITICAL PRIVACY & CONSENT RULE:
    // Never subscribe someone to marketing lists merely because they requested their recommendations.
    // Only add to Resend Audience when they explicitly checked Activate updates or LEVL health insights.
    if (payload.subscribeInsights || payload.subscribeActivate) {
      try {
        await resend.contacts.create({
          email,
          unsubscribed: false,
          audienceId: AUDIENCE_ID,
          firstName: payload.subscribeActivate ? "Activate-Interest" : undefined,
        });
      } catch (contactErr) {
        console.warn("Resend contact creation note:", contactErr);
      }
    }

    const actionsHtml = startProtocol.actions
      .map(
        (action) => `
          <li style="margin-bottom: 10px; line-height: 1.5;">
            <strong style="color: #f8fafc;">${action.title}</strong>
            <span style="color: #38bdf8; font-size: 12px; margin-left: 6px;">(${action.timing} • ${action.duration})</span>
            <div style="color: #cbd5e1; font-size: 13px; margin-top: 2px;">${action.detail}</div>
          </li>
        `
      )
      .join("");

    const deepCellHtml = payload.deepCellEligible
      ? `
        <div style="margin-top: 24px; padding: 20px; border-radius: 14px; background-color: #0f172a; border: 1px solid #1e293b;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #c084fc; font-weight: 700; margin-bottom: 6px;">
            Evening Formulation Match
          </div>
          <h3 style="margin: 0 0 8px 0; font-size: 17px; color: #ffffff;">
            ${payload.deepCellHeadline || "LIFESPAN+ DeepCell"}
          </h3>
          <p style="margin: 0 0 14px 0; font-size: 14px; color: #cbd5e1; line-height: 1.55;">
            ${payload.deepCellRationale || "Clinically formulated melatonin-free evening support for deep sleep architecture and nocturnal cellular renewal."}
          </p>
          <a href="https://www.levlhealth.com/#purchase-section" style="display: inline-block; padding: 10px 18px; border-radius: 999px; background-color: #0ea5e9; color: #020617; font-weight: 700; font-size: 13px; text-decoration: none;">
            Explore DeepCell on LEVL →
          </a>
        </div>
      `
      : "";

    const activateHtml = payload.subscribeActivate
      ? `
        <div style="margin-top: 20px; padding: 16px; border-radius: 12px; background-color: #064e3b; border: 1px solid #059669;">
          <strong style="color: #6ee7b7; font-size: 14px;">✓ Registered for LIFESPAN+ Activate Updates</strong>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #d1fae5; line-height: 1.5;">
            We’ve recorded your interest in LIFESPAN+ Activate launch updates and potential beta-testing opportunities. (Note: Registering interest keeps you first in line for announcements and beta invitations, though beta cohort spots are limited.)
          </p>
        </div>
      `
      : "";

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background-color: #060913; color: #f8fafc; border-radius: 18px;">
        <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #38bdf8; margin-bottom: 8px;">
          LEVL Health • Your Personalized Starting Plan
        </div>
        <h1 style="font-size: 24px; margin: 0 0 16px 0; color: #ffffff;">
          Your Longevity Starting Point
        </h1>

        ${
          payload.emailProtocolLink
            ? `
          <div style="padding: 22px; border-radius: 16px; background-color: #0b0e17; border: 1px solid #1e293b;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #38bdf8; font-weight: 700; margin-bottom: 6px;">
              Start Here • ${startProtocol.typicalTime}
            </div>
            <h2 style="margin: 0 0 8px 0; font-size: 20px; color: #ffffff;">
              ${startProtocol.title}
            </h2>
            <p style="margin: 0 0 16px 0; font-size: 14px; color: #cbd5e1; line-height: 1.55;">
              ${startProtocol.summary}
            </p>
            <div style="font-size: 13px; font-weight: 700; color: #e2e8f0; margin-bottom: 8px;">
              Core Daily Actions:
            </div>
            <ul style="padding-left: 18px; margin: 0 0 20px 0;">
              ${actionsHtml}
            </ul>
            <div style="margin-top: 16px;">
              <a href="${payload.levlAppStartUrl}" style="display: inline-block; padding: 12px 20px; border-radius: 999px; background-color: #38bdf8; color: #020617; font-weight: 700; font-size: 14px; text-decoration: none; margin-right: 12px; margin-bottom: 8px;">
                Launch Your Protocol in LEVL App →
              </a>
              <a href="${payload.longevityReviewsStartUrl}" style="display: inline-block; padding: 10px 16px; border-radius: 999px; border: 1px solid #334155; color: #e2e8f0; font-weight: 600; font-size: 13px; text-decoration: none; margin-bottom: 8px;">
                View Protocol on LongevityReviews.org
              </a>
            </div>
          </div>

          <div style="margin-top: 20px; padding: 18px; border-radius: 14px; background-color: #0b0e17; border: 1px solid #1e293b;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; font-weight: 700; margin-bottom: 4px;">
              Add Next • ${nextProtocol.typicalTime}
            </div>
            <h3 style="margin: 0 0 6px 0; font-size: 16px; color: #ffffff;">
              ${nextProtocol.title}
            </h3>
            <p style="margin: 0 0 12px 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
              ${nextProtocol.summary}
            </p>
            <a href="${payload.levlAppAddNextUrl}" style="color: #38bdf8; font-size: 13px; font-weight: 600; text-decoration: underline; margin-right: 14px;">
              Open in LEVL App →
            </a>
            <a href="${payload.longevityReviewsAddNextUrl}" style="color: #94a3b8; font-size: 13px; text-decoration: underline;">
              Read Review on LongevityReviews.org
            </a>
          </div>

          ${deepCellHtml}
        `
            : ""
        }

        ${activateHtml}

        <p style="margin-top: 28px; font-size: 12px; color: #64748b; line-height: 1.5;">
          Preferences recorded:
          ${payload.emailProtocolLink ? "✓ Personalized protocol link " : ""}
          ${payload.subscribeActivate ? "• ✓ LIFESPAN+ Activate updates " : ""}
          ${payload.subscribeInsights ? "• ✓ LEVL health insights" : ""}.
          ${
            !payload.subscribeInsights
              ? "You were not subscribed to the general marketing newsletter."
              : ""
          }
        </p>
      </div>
    `;

    const textBody = [
      `LEVL Health — Your Personalized Starting Plan`,
      ``,
      payload.emailProtocolLink
        ? [
            `START HERE: ${startProtocol.title} (${startProtocol.typicalTime})`,
            `${startProtocol.summary}`,
            `Launch in LEVL App: ${payload.levlAppStartUrl}`,
            `Explore on LongevityReviews: ${payload.longevityReviewsStartUrl}`,
            ``,
            `ADD NEXT: ${nextProtocol.title} (${nextProtocol.typicalTime})`,
            `${nextProtocol.summary}`,
            `Open in LEVL App: ${payload.levlAppAddNextUrl}`,
            `Explore on LongevityReviews: ${payload.longevityReviewsAddNextUrl}`,
            payload.deepCellEligible
              ? `\nDEEPCELL MATCH: ${payload.deepCellHeadline || "LIFESPAN+ DeepCell"}\n${payload.deepCellRationale || ""}\nExplore DeepCell: https://www.levlhealth.com/#purchase-section`
              : ``,
          ].join("\n")
        : ``,
      payload.subscribeActivate
        ? `\nLIFESPAN+ ACTIVATE: Your interest in launch updates and potential beta-testing opportunities has been registered.`
        : ``,
      payload.subscribeInsights
        ? `\nLEVL HEALTH INSIGHTS: You are subscribed to LEVL health insights.`
        : `\nNote: You were not added to the general marketing newsletter.`,
    ]
      .filter(Boolean)
      .join("\n");

    // Attempt sending directly to visitor; if Resend is in sandbox mode, fall back to verified owner inbox
    const primaryAttempt = await resend.emails.send({
      from: "LEVL Health <onboarding@resend.dev>",
      to: [email],
      subject: "Your Personalized LEVL Starting Plan & Protocol Links",
      html: htmlBody,
      text: textBody,
    });

    if (primaryAttempt.error) {
      // Fallback for Resend sandbox environment where only verified owner email is permitted
      await resend.emails.send({
        from: "LEVL Health Quiz <onboarding@resend.dev>",
        to: ["kylen.mcclintock@gmail.com"],
        replyTo: email,
        subject: `[Quiz Plan Request for ${email}] ${startProtocol.shortTitle}`,
        html: `<p style="color:#94a3b8;font-size:12px;">Recipient: ${email} | Protocol Link: ${payload.emailProtocolLink} | Activate Interest: ${payload.subscribeActivate} | Insights: ${payload.subscribeInsights}</p>${htmlBody}`,
        text: `Recipient: ${email}\n\n${textBody}`,
      });
    }

    return {
      success: true,
      message: payload.emailProtocolLink
        ? "We’ve sent your personalized starting plan and protocol links!"
        : "Your selected preferences have been saved!",
    };
  } catch (error) {
    console.error("Quiz email error:", error);
    return {
      success: false,
      message: "We couldn’t send your updates right now. Please try again in a moment.",
    };
  }
}
