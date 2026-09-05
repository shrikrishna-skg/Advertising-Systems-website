import type { APIRoute } from 'astro';
import { buildIntakeConfirmationEmail } from '../../lib/intake-confirmation-email';

export const GET: APIRoute = () => {
  const email = buildIntakeConfirmationEmail({
    kind: 'contact',
    name: 'Shrikrishna',
    company: 'AdvertisingSystems Security Test',
    replyTo: 'contact@multisystems.ai',
    siteUrl: 'https://advertisingsystems.ai',
  });

  return new Response(email.html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
};
