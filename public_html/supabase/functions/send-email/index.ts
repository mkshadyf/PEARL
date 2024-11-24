import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { SmtpClient } from 'https://deno.land/x/smtp/mod.ts';

const client = new SmtpClient();

const SMTP_HOST = Deno.env.get('SMTP_HOST');
const SMTP_PORT = Deno.env.get('SMTP_PORT');
const SMTP_USER = Deno.env.get('SMTP_USER');
const SMTP_PASS = Deno.env.get('SMTP_PASS');
const SMTP_FROM = Deno.env.get('SMTP_FROM');

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
  throw new Error('Missing SMTP environment variables');
}

serve(async (req) => {
  try {
    const { template } = await req.json();

    await client.connectTLS({
      hostname: SMTP_HOST,
      port: Number(SMTP_PORT),
      username: SMTP_USER,
      password: SMTP_PASS,
    });

    await client.send({
      from: SMTP_FROM,
      to: template.to,
      subject: template.subject,
      content: template.html,
      html: template.html,
    });

    await client.close();

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}); 