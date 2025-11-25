# ClarityExpense - FrontendThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



**Personal expense tracking system - Frontend Application**## Getting Started



Next.js SPA with TypeScript, Tailwind CSS, and Zustand state management.First, run the development server:



---```bash

npm run dev

## 🎯 Technology Stack# or

yarn dev

- **Framework:** Next.js 16+ (App Router)# or

- **Language:** TypeScriptpnpm dev

- **Styling:** Tailwind CSS# or

- **State Management:** Zustand (with persistence)bun dev

- **HTTP Client:** Axios```

- **Charts:** Recharts

- **Internationalization:** next-i18nextOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.



---You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.



## 🚀 Getting StartedThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



### Prerequisites## Learn More

- Node.js 18+ 

- npm or yarnTo learn more about Next.js, take a look at the following resources:

- Backend API running on http://localhost:8080

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

### Installation- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.



```bashYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

# Navigate to frontend directory

cd implement/frontend## Deploy on Vercel



# Install dependenciesThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

npm install

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Environment is already configured in .env.local
```

### Running Development Server

```bash
npm run dev
```

Application will be available at `http://localhost:3000`

---

## 📱 Pages

### Home (`/`) - Landing Page
- Features and CTA buttons
- Auto-redirect to dashboard if authenticated

### Login (`/login`) - Authentication
- Email/password form
- JWT token generation
- Redirects to dashboard on success

### Register (`/register`) - New Users
- Name, email, password fields
- Account creation
- Redirects to login on success

### Dashboard (`/dashboard`) - Main App
- Protected route (requires authentication)
- Balance summary
- Category expense chart
- Transaction form and list

---

## 🧩 Components

- `<Balance />` - Financial summary cards
- `<TransactionForm />` - Create transactions
- `<TransactionList />` - Recent transactions table
- `<CategoryChart />` - Recharts pie chart
- `withAuth(Component)` - HOC for protected routes

---

## 🔐 Authentication

- Zustand store manages auth state
- JWT token persisted in localStorage
- Axios interceptors attach token to requests
- Auto-logout on 401 errors

---

**Last Updated:** November 18, 2025
