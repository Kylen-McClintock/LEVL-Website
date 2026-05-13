"use server";

import { Resend } from 'resend';

export async function sendPartnerEmail(formData: {
  name: string;
  email: string;
  role: string;
  message: string;
}) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.warn("RESEND_API_KEY is not set. Simulating email send for:", formData);
      return { success: true, message: "Email simulated (no API key)" };
    }

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: 'LEVL Platform <onboarding@resend.dev>', // Should be verified domain in production
      to: ['kylen@levlhealth.com'],
      subject: `Partner Inquiry: ${formData.role} - ${formData.name}`,
      text: `
New Partner Inquiry from LEVL Platform

Name: ${formData.name}
Email: ${formData.email}
Role: ${formData.role}

Message:
${formData.message}
      `,
      replyTo: formData.email,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Internal server error" };
  }
}
