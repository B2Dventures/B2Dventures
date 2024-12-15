# Getting Started

## Needed Environment Variable (.env)
```bash
DATABASE_URL=<your_neon_database_url>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_public_key>
CLERK_SECRET_KEY=<your_clerk_secret_key>
WEBHOOK_SECRET=<your_webhook_secret_key>
UPLOADTHING_TOKEN=<your_uploadthing_token>
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<your_recaptcha_site_key>
RECAPTCHA_SECRET_KEY=<your_recaptcha_secret_key>
```

## Installation Guide
- Clone the repository
```bash
git clone https://github.com/B2Dventures/B2Dventures.git
```
- Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
- Create `.env` file
- Initialize database
```bash
npx prisma db push
```
- Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
