'use server';

import { Resend } from 'resend';

const resend = new Resend('re_9NzQCJPJ_3L3vDgUYWTUFHJ9ZMsmFdXnK');
const AUDIENCE_ID = '442c6812-7d1d-44c2-866f-922b4d8f5349';

export async function subscribeUser(formData: FormData) {
    const email = formData.get('email') as string;

    if (!email) {
        return { success: false, message: 'Email is required' };
    }

    try {
        // 1. Add to Audience (Capture)
        await resend.contacts.create({
            email: email,
            unsubscribed: false,
            audienceId: AUDIENCE_ID,
        });

        // 2. Send Notification to Kylen
        // NOTE: In Resend Sandbox mode, we can ONLY send to the account email (kylen.mcclintock@gmail.com)
        // Once you verify 'levlhealth.com' in Resend dashboard, you can change this back to 'kylen@levlhealth.com'
        // and also send confirmation emails to the users.
        await resend.emails.send({
            from: 'LEVL Early Access <onboarding@resend.dev>',
            to: 'kylen.mcclintock@gmail.com', // Must use verified sandbox email
            subject: 'New Early Access Request',
            text: `New signup: ${email} has joined the waiting list via the website.`,
        });
        return { success: true, message: 'Successfully subscribed!' };
    } catch (error) {
        console.error('Resend Error:', error);
        return { success: false, message: 'Failed to subscribe. Please try again.' };
    }
}
