# GoDocAPI Frontend

This is the frontend for the GoDocAPI, built with [Next.js](https://nextjs.org) and [shadcn/ui](https://ui.shadcn.com/).

## Features

- **Dashboard**: View all stored documents.
- **Upload**: Upload new documents to the backend.
- **Download**: Download documents directly.
- **Delete**: Remove documents from storage.

## Prerequisites

- Node.js 18+
- GoDocAPI Backend running on `http://localhost:8080` (default)

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Open the application**:
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Configuration

The application is configured to proxy API requests to `http://localhost:8080` to avoid CORS issues during development. This is defined in `next.config.ts` via rewrites.

If your backend is running on a different port, update `next.config.ts`:

```typescript
async rewrites() {
  return [
    {
      source: '/api/v1/:path*',
      destination: 'http://localhost:your-port/api/v1/:path*',
    },
  ];
},
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
