# Hotel Reservation System

## ERD v 0.1
![image](/docs/media/erd.png)

Stacks used:

- [NextJS](https://github.com/vercel/next.js)
- [Next UI](https://nextui.org/)
- [TailwindCSS](https://github.com/tailwindlabs/tailwindcss)
- [Lucia](https://github.com/lucia-auth/lucia)
- [Drizzle](https://github.com/drizzle-team/drizzle-orm)
- [OsloJS](https://github.com/oslo-project)

## Development

### Requirements

- [PNPM](https://pnpm.io/installation)
  **STRICTLY** use PNPM as your package manager when using this repo, otherwise, you'll run to dependencies issues.
- [NODE](https://nodejs.org/en)
  Use `latest LTS` version
- [POSTGRESQL](https://www.postgresql.org/)
  

Copy `.env.example` to `.env` Using the following commands:

`cp env.example .env`

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASSWORD=password

SERVER_HOST=http://localhost:3000 # set the port where your next app is running
DB_URL=postgres://postgres:postgres@locahost:5432/hrs # set your db url
```

Install Dependencies:

`pnpm install`

Run development server:

`pnpm dev --turbo`

Open the app in your browser:

`https://localhost:3000`

## Deployment

`WIP`
