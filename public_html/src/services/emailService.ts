import { supabase } from '../lib/supabase';
import { QuoteRequest } from '../types';

interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}

export async function sendQuoteRequestEmail(quoteRequest: QuoteRequest) {
  const adminTemplate = createAdminEmailTemplate(quoteRequest);
  const customerTemplate = createCustomerEmailTemplate(quoteRequest);

  try {
    // Send email to admin
    await supabase.functions.invoke('send-email', {
      body: { template: adminTemplate }
    });

    // Send confirmation email to customer
    await supabase.functions.invoke('send-email', {
      body: { template: customerTemplate }
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
}

export async function sendQuoteStatusUpdateEmail(quoteRequest: QuoteRequest) {
  const template = createStatusUpdateEmailTemplate(quoteRequest);

  try {
    await supabase.functions.invoke('send-email', {
      body: { template }
    });
  } catch (error) {
    console.error('Error sending status update email:', error);
    throw error;
  }
}

function createAdminEmailTemplate(quote: QuoteRequest): EmailTemplate {
  return {
    to: process.env.ADMIN_EMAIL || 'admin@pearl-engineering.org',
    subject: `New Quote Request from ${quote.name}`,
    html: `
      <h2>New Quote Request</h2>
      <p><strong>From:</strong> ${quote.name}</p>
      <p><strong>Email:</strong> ${quote.email}</p>
      <p><strong>Phone:</strong> ${quote.phone}</p>
      ${quote.company ? `<p><strong>Company:</strong> ${quote.company}</p>` : ''}
      <p><strong>Service Type:</strong> ${quote.service_type}</p>
      <p><strong>Project Details:</strong></p>
      <p>${quote.project_details}</p>
      ${quote.budget_range ? `<p><strong>Budget Range:</strong> ${quote.budget_range}</p>` : ''}
      ${quote.timeline ? `<p><strong>Timeline:</strong> ${quote.timeline}</p>` : ''}
    `
  };
}

function createCustomerEmailTemplate(quote: QuoteRequest): EmailTemplate {
  return {
    to: quote.email,
    subject: 'Quote Request Received - PEARL Engineering & Logistics',
    html: `
      <h2>Thank you for your quote request!</h2>
      <p>Dear ${quote.name},</p>
      <p>We have received your quote request and our team will review it shortly. Here's a summary of your request:</p>
      <ul>
        <li><strong>Service Type:</strong> ${quote.service_type}</li>
        <li><strong>Project Details:</strong> ${quote.project_details}</li>
        ${quote.budget_range ? `<li><strong>Budget Range:</strong> ${quote.budget_range}</li>` : ''}
        ${quote.timeline ? `<li><strong>Timeline:</strong> ${quote.timeline}</li>` : ''}
      </ul>
      <p>We will contact you within 24-48 business hours with more information.</p>
      <p>Best regards,<br>PEARL Engineering & Logistics Team</p>
    `
  };
}

function createStatusUpdateEmailTemplate(quote: QuoteRequest): EmailTemplate {
  const statusMessages = {
    reviewed: 'Your quote request is currently under review.',
    approved: 'Your quote request has been approved! Our team will contact you shortly to discuss next steps.',
    rejected: 'Unfortunately, we are unable to proceed with your quote request at this time.'
  };

  return {
    to: quote.email,
    subject: `Quote Request Status Update - PEARL Engineering & Logistics`,
    html: `
      <h2>Quote Request Status Update</h2>
      <p>Dear ${quote.name},</p>
      <p>${statusMessages[quote.status as keyof typeof statusMessages]}</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
      <p>Best regards,<br>PEARL Engineering & Logistics Team</p>
    `
  };
} 