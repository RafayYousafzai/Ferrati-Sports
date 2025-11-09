# Email Integration Setup

This project uses [React Email](https://react.email/) and [Resend](https://resend.com/) for sending emails.

## Setup Instructions

### 1. Get Resend API Key

1. Sign up for a free account at [Resend](https://resend.com/)
2. Go to [API Keys](https://resend.com/api-keys)
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables

Add the following variables to your `.env.local` file:

```env
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Email settings
EMAIL_FROM=noreply@yourdomain.com
CONTACT_EMAIL=admin@ferratisports.com
```

- `RESEND_API_KEY`: Your Resend API key
- `EMAIL_FROM`: The email address to send from (must be verified in Resend)
- `CONTACT_EMAIL`: The email address to receive form submissions

### 3. Verify Your Domain (Production)

For production use, you need to verify your domain in Resend:

1. Go to [Domains](https://resend.com/domains) in Resend
2. Add your domain
3. Follow the DNS configuration instructions
4. Update `EMAIL_FROM` to use your verified domain (e.g., `noreply@yourdomain.com`)

### 4. Test Email Sending

For development, Resend provides a test mode that works without domain verification:
- You can send emails to any email address
- Emails will be delivered to the inbox
- Free tier includes 3,000 emails/month

## Email Templates

The project includes two email templates:

### 1. Contact Form Email (`emails/ContactFormEmail.tsx`)
Sent when users submit the contact form at `/contact`

### 2. Quote Request Email (`emails/QuoteRequestEmail.tsx`)
Sent when users request a quote

## How It Works

1. **User submits form** → Form data is validated
2. **Data saved to Supabase** → Form submission is stored in the database
3. **Email notification sent** → Admin receives email with form details
4. **User sees success message** → Form is reset and user gets confirmation

## Email Preview

To preview and test your email templates locally:

```bash
npm install -g react-email
cd emails
email dev
```

This will open a browser with all your email templates where you can preview them.

## Troubleshooting

### Email not sending?

1. Check that `RESEND_API_KEY` is set correctly in `.env.local`
2. Check the server console for error messages
3. Verify your API key is valid in [Resend Dashboard](https://resend.com/api-keys)
4. Make sure you're not exceeding the free tier limits (3,000 emails/month)

### Email going to spam?

1. Verify your domain in Resend
2. Set up SPF, DKIM, and DMARC records
3. Use a proper `EMAIL_FROM` address from your verified domain

## Files Structure

```
emails/
├── ContactFormEmail.tsx       # Contact form email template
└── QuoteRequestEmail.tsx      # Quote request email template

lib/
└── email.ts                   # Email sending utility

app/(root)/(connect)/contact/
└── actions.ts                 # Contact form server action

components/layout/
├── QuoteContactForm.tsx       # Quote form component
└── quoteActions.ts            # Quote form server action
```
