## Run locally

Install dependencies and start the development server with pnpm:

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000> to use the app. The production build uses `pnpm build`, and `pnpm start` serves that build locally.

## Deploy to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In [Vercel](https://vercel.com/new), import the repository.
3. Keep the project root set to `.` (the repository root) and leave the framework and build settings on **Next.js / Automatic**.
4. In the Vercel project settings, add `ENABLE_EXPERIMENTAL_COREPACK=1` for **Production**, **Preview**, and **Development** so Vercel uses the pnpm version pinned in `package.json` (`pnpm@12.6.0`).
5. Deploy. Vercel detects Next.js and runs the existing build script.

The app stores quiz practice progress in the visitor's browser, so it does not need database credentials or other app-specific environment variables.

After the repository is connected, Vercel builds and deploys new commits automatically: pushes to the configured production branch create production deployments, and pushes to other branches create preview deployments. No separate build/deploy workflow file is needed. Commit and push changes to the connected Git repository to publish an update.
