# Environment variables required for NextAuth Email (Magic Link)

Set these in Vercel (Project -> Settings -> Environment Variables) or locally in `.env.local`:

- NEXTAUTH_URL=https://your-deployment-url.vercel.app
- NEXTAUTH_SECRET=some_long_random_secret
- EMAIL_SERVER=smtp://USER:PASSWORD@smtp.example.com:587
- EMAIL_FROM="Your Store" <no-reply@yourdomain.com>

Notes:
- EMAIL_SERVER must be a valid SMTP connection string. Many providers (Gmail, SendGrid, Mailgun) provide SMTP credentials.
- NEXTAUTH_SECRET should be a secure random string (use `openssl rand -hex 32`).

