# TAREA 02: Generación del Frontend (Next.js SPA)

Guía prescriptiva para generar el frontend, siguiendo la arquitectura SPA y la gestión de estado con Zustand.

**IMPORTANTE**: Todo el código (componentes, funciones, variables, comentarios) debe escribirse en **inglés**. Los textos visibles para el usuario deben manejarse mediante un sistema de internacionalización (i18n).

**IMPORTANTE - RFN-06:** 
- ❌ NO crear archivos de documentación adicionales
- ✅ Actualizar `README.md` del frontend con cada avance
- ✅ Marcar tareas completadas en `CHECKLIST.md` raíz del proyecto

## 4.1. Módulo F1: Proyecto, Estado (Zustand) y Axios

Configuración inicial del cliente.

### Prompt 13 (Proyecto)

"Generate a new Next.js project using TypeScript. Once created, install the following dependencies: 
- `axios` (for API calls)
- `zustand` (for state management)
- `recharts` (for charts)
- `next-i18next` (for internationalization)

Configure `tailwindcss` for styling."

### Prompt 14 (Internationalization Setup)

"Set up next-i18next for internationalization. Create language files:
- `public/locales/en/common.json` (for English translations)
- `public/locales/es/common.json` (for Spanish translations)

Configure `next-i18next.config.js` with default locale as 'es' and supported locales as ['en', 'es'].

All user-facing text must use the translation function `t()`. Example:
- Incorrect: `const title = 'Welcome'`
- Correct: `const title = t('common:welcome')`"

### Prompt 15 (Tailwind Configuration)

"Genera el contenido de `tailwind.config.js` y `globals.css` para habilitar Tailwind CSS en todo el proyecto."

### Prompt 16 (Zustand Store)

"Generate a Zustand store in a file `store/authStore.js`. All code must be in English.

The store (`useAuthStore`) must contain the following state: 
- `token` (String)
- `user` (Object)
- `isAuthenticated` (Boolean)

It must have two actions: 
- `login(token, user)` (sets the state)
- `logout()` (resets all state to null or false)"

### Prompt 17 (Axios Configuration)

"Generate a file `lib/api.js` that configures and exports an axios instance. All code must be in English.

- Set `baseURL` to `http://localhost:8080` (the Spring Boot backend).
- Implement a request interceptor that:
  - Imports `useAuthStore` from the Zustand store file.
  - Gets the token directly from state (`useAuthStore.getState().token`).
  - If the token exists, attach it to the request header: `config.headers.Authorization = 'Bearer ' + token`.
  - Returns the modified `config`."

## 4.2. Módulo F2: Sistema de Estilos Globales

Definición del sistema de estilos reutilizables ANTES de crear componentes visuales.

### Prompt 18 (Global Styles Configuration)

"Update the `app/globals.css` file to implement a reusable global styles system. All code and comments must be in English.

**Requirements:**

1. **Base Tailwind Imports**: Include standard Tailwind directives at the top

2. **Button Variants**: Create vanilla CSS classes for common button types (NOT using @layer or @apply due to Tailwind v4):
   - `.btn-primary`: Primary action button (blue background, white text, hover effects, disabled states)
   - `.btn-secondary`: Secondary button (gray background, hover effects)
   - `.btn-danger`: Destructive action (red background, white text)
   - `.btn-outline`: Outline variant (transparent background, border, hover effects)
   - `.btn-success`: Success action (green background)
   
3. **Card Components**: Define card styles:
   - `.card`: Standard white card with shadow, padding, and rounded corners
   - `.card-hover`: Card with hover transition effect (scale and shadow)
   
4. **Form Elements**: Create input and label styles:
   - `.input-field`: Standard text input with border, focus ring, transitions
   - `.select-field`: Select dropdown styling consistent with inputs
   - `.textarea-field`: Textarea styling
   - `.label`: Form label with consistent typography and spacing
   - `.error-message`: Red error message text (small, margin-top)
   
5. **Layout Utilities**: Container and spacing classes:
   - `.container-centered`: Centered container with max-width
   - `.section-spacing`: Consistent vertical section spacing
   
6. **Text Utilities**: Typography helpers:
   - `.text-heading`: Large heading text
   - `.text-subheading`: Medium subheading
   - `.text-muted`: Muted/secondary text color
   - `.text-error`: Error text color
   
7. **Badge Components**: Status badges:
   - `.badge`: Base badge styling
   - `.badge-success`: Green badge for success/income
   - `.badge-danger`: Red badge for danger/expense
   - `.badge-warning`: Orange badge for warnings
   - `.badge-info`: Blue badge for information

8. **Table Components**: Data table styling:
   - `.table`: Base table styling with full width
   - `.table-header`: Table header row styling
   - `.table-row`: Table body row with hover effect
   - `.table-cell`: Standard table cell padding
   - `.table-cell-header`: Header cell styling (bold, background)

9. **Modal Components**: Modal/overlay styling:
   - `.modal-backdrop`: Full-screen semi-transparent backdrop
   - `.modal-panel`: Centered white panel with shadow
   - `.modal-header`: Modal header with bottom border
   - `.modal-body`: Modal content area with padding
   - `.modal-footer`: Modal footer with top border and button alignment

10. **Link Styles**: Navigation links:
    - `.link`: Standard link styling with hover underline
    - `.link-primary`: Primary colored link

11. **Dark Mode Support**: Include dark mode variants using `@media (prefers-color-scheme: dark)` for all components

**Implementation Notes:**
- Use vanilla CSS properties (NOT @apply directive)
- Include all states: hover, focus, active, disabled
- Ensure responsive design with proper padding and margins
- Add smooth transitions for interactive elements
- Use CSS custom properties for colors if needed for theme consistency

**Example Structure:**
```css
@import 'tailwindcss';

/* Button Variants */
.btn-primary {
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Card Components */
.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

/* Form Elements */
.input-field {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-field:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .card {
    background-color: #1f2937;
    color: #f3f4f6;
  }
}
```

Implement ALL 50+ classes listed above with complete styling including hover states, focus states, and dark mode support."

### Prompt 19 (Tailwind Theme Configuration)

"Update `tailwind.config.ts` to extend the default theme with custom application colors, spacing, and design tokens. All code must be in English.

**Requirements:**

1. **Custom Color Palette**: Define comprehensive color system with 10 shades each:
   - `primary`: Blue shades (#3b82f6 base) - 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
   - `secondary`: Gray shades (#6b7280 base) - 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
   - `success`: Green shades (#10b981 base) - 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
   - `danger`: Red shades (#ef4444 base) - 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
   - `warning`: Orange shades (#f59e0b base) - 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
   - `info`: Blue-gray shades (#0ea5e9 base) - 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

2. **Custom Spacing**: Extend spacing scale:
   - Add `18` (4.5rem), `88` (22rem), `100` (25rem), `128` (32rem)

3. **Custom Border Radius**: Define application border radius:
   - Keep defaults, optionally extend if needed

4. **Custom Shadows**: Enhance shadow system:
   - `shadow-soft`: Subtle soft shadow for cards
   - `shadow-strong`: Prominent shadow for modals

5. **Custom Animations**: Define smooth transitions:
   - `fade-in`: Fade in animation
   - `slide-up`: Slide up from bottom
   - `slide-down`: Slide down from top

6. **Content Paths**: Ensure all component paths are included

**Complete Example:**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        info: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'strong': '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

Implement the complete theme configuration with all color shades, custom spacing, shadows, and animations as specified."

## 4.3. Módulo F3: Flujo de Autenticación y Rutas Protegidas

Implementación del flujo de seguridad del lado del cliente usando los estilos globales definidos.

### Prompt 20 (Auth Pages)

"Generate pages `app/login/page.tsx` and `app/register/page.tsx`. All code must be in English.

- Both must be client components (`"use client";`)
- Each must have a simple HTML form with local state management (`useState`) for form fields
- **IMPORTANT**: Use the global CSS classes defined in globals.css:
  - `.card` for the form container
  - `.input-field` for all text inputs
  - `.label` for form labels
  - `.btn-primary` for submit buttons
  - `.link` for navigation links
  - `.error-message` for error display
- Use the i18n translation function `t()` for all user-facing text (labels, placeholders, buttons, error messages)
- The `onSubmit` function of `LoginPage` must: 
  1. Call the axios instance to make `POST /api/auth/login`
  2. If successful, extract the `token` and `user` data from the response
  3. Call the Zustand `login(token, user)` action
  4. Redirect the user to the dashboard (e.g., `/dashboard`)
- Include proper error handling with translated error messages

**Example structure:**
```tsx
<div className='container-centered'>
  <div className='card'>
    <h1 className='text-heading'>{t('auth.login')}</h1>
    <form onSubmit={handleSubmit}>
      <label className='label'>{t('auth.email')}</label>
      <input className='input-field' type='email' />
      <button className='btn-primary w-full'>{t('auth.loginButton')}</button>
    </form>
    <a className='link' href='/register'>{t('auth.registerLink')}</a>
  </div>
</div>
```

### Prompt 21 (Protected Route)

"Generate a Higher-Order Component (HOC) called `withAuth` in `lib/withAuth.tsx`. All code must be in English.

- This HOC will wrap page components that require authentication
- It must use the `useAuthStore` hook to read the `isAuthenticated` state
- If `isAuthenticated` is `false`, it must redirect the user to the `/login` page
- Include proper TypeScript types for the wrapped component

**Example usage:**
```tsx
export default withAuth(DashboardPage);
```

## 4.4. Módulo F4: Componentes del Dashboard y CRUD

Ensamblaje de la interfaz de usuario principal usando los estilos globales desde el inicio.

### Prompt 22 (UI Components - Part 1)

"Generate the following modular UI components. All must be client components (`"use client";`) with code in English. Use `t()` function for all user-facing text.

**IMPORTANT**: Use global CSS classes from globals.css throughout:
- `.card` for component containers
- `.input-field`, `.select-field`, `.textarea-field` for form inputs
- `.label` for form labels
- `.btn-primary`, `.btn-secondary`, `.btn-danger` for buttons
- `.text-heading`, `.text-subheading`, `.text-muted` for typography
- `.error-message` for errors

**components/Balance.tsx**: 
- Must use axios (the configured instance) in a `useEffect` to call the endpoint `GET /api/dashboard/balance`
- Must display income, expense, and balance totals in a grid layout
- Use `.card` for container
- Use `.text-subheading` for section title
- Use custom text color classes for positive (green) and negative (red) values
- All labels must use translation keys (e.g., `t('dashboard.income')`, `t('dashboard.expense')`, `t('dashboard.balance')`)

**components/CategoryChart.tsx**: 
- Must be a client component
- Must use axios to call `GET /api/dashboard/expenses-by-category`
- Must use the Recharts library to render a `<PieChart>` with `<ResponsiveContainer>`, `<Pie>`, `<Cell>`, `<Tooltip>`
- Use `.card` for container
- Use `.text-subheading` for chart title
- Use translation keys for chart labels and tooltips
- Include loading state while fetching data
- Handle empty data gracefully with translated message"

### Prompt 23 (UI Components - Part 2)

"Generate the following form components. All must be client components with code in English.

**IMPORTANT**: Use global CSS classes consistently:
- `.card` for containers
- `.input-field`, `.select-field`, `.textarea-field` for all inputs
- `.label` for all labels
- `.btn-primary` for submit buttons
- `.btn-secondary` for cancel buttons
- `.error-message` for validation errors

**components/TransactionForm.tsx**: 
- A form to create a new transaction
- Must make `POST /api/transactions` on submit
- Form fields: amount (number), date (date), type (select: INCOME/EXPENSE), category (select), description (textarea)
- The category dropdown must be populated by calling `GET /api/categories` in a `useEffect`
- Use `.select-field` for the category and type dropdowns
- Use `.textarea-field` for description
- Include form validation (amount required and > 0, date required, category required)
- All form labels, placeholders, and buttons must use translation keys
- Clear form after successful submission
- Show success/error messages using translation keys

**components/TransactionList.tsx**: 
- A table that calls `GET /api/transactions` and displays results
- Use `.table`, `.table-header`, `.table-row`, `.table-cell`, `.table-cell-header` for table structure
- Include columns: Date, Description, Category, Amount, Type
- Use `.badge-success` for INCOME transactions
- Use `.badge-danger` for EXPENSE transactions
- Column headers must use translation keys
- Include loading state
- Handle empty state with translated message
- Format amounts with currency symbol
- Sort by date (most recent first)"

### Prompt 24 (Category Modal Component)

"Generate a modal component `components/CategoryForm.tsx`. All code must be in English.

**IMPORTANT**: Use global CSS classes for modal structure:
- `.modal-backdrop` for the overlay background
- `.modal-panel` for the modal container
- `.modal-header` for the header section
- `.modal-body` for the content area
- `.modal-footer` for the footer with buttons
- `.input-field` for the input
- `.label` for the label
- `.btn-primary` for save button
- `.btn-secondary` for cancel button
- `.error-message` for validation errors

**Props:**
- `isOpen` (boolean): Controls modal visibility
- `onClose` (function): Callback to close modal
- `onSuccess` (callback): Called after successful creation

**Requirements:**
- Display as modal/overlay when `isOpen` is true
- Modal backdrop with semi-transparent dark background (use `.modal-backdrop`)
- Centered modal panel with white background (use `.modal-panel`)
- Close button (X) in the top-right corner of header
- An input field for the category name (use `.input-field`)
- Form validation (category name required, minimum 2 characters, max 50 characters)
- Submit and Cancel buttons in footer
- Must make `POST /api/categories` on submit
- On success, trigger `onSuccess` callback and close modal automatically
- On cancel or backdrop click, call `onClose` without saving
- Include smooth open/close animations (use Tailwind animation classes or custom CSS)
- All labels, placeholders, buttons, and error messages must use translation keys
- Prevent body scroll when modal is open
- Focus trap within modal for accessibility

**Example structure:**
```tsx
{isOpen && (
  <div className='modal-backdrop' onClick={handleBackdropClick}>
    <div className='modal-panel' onClick={(e) => e.stopPropagation()}>
      <div className='modal-header'>
        <h2 className='text-heading'>{t('categories.addNew')}</h2>
        <button onClick={onClose}>×</button>
      </div>
      <div className='modal-body'>
        <label className='label'>{t('categories.name')}</label>
        <input className='input-field' />
        {error && <p className='error-message'>{error}</p>}
      </div>
      <div className='modal-footer'>
        <button className='btn-secondary' onClick={onClose}>
          {t('common.cancel')}
        </button>
        <button className='btn-primary' onClick={handleSubmit}>
          {t('common.save')}
        </button>
      </div>
    </div>
  </div>
)}
```

### Prompt 25 (Language Switcher)

"Generate a component `components/LanguageSwitcher.tsx`. All code must be in English.

**IMPORTANT**: Use global CSS classes:
- `.btn-outline` for the language toggle buttons
- Custom styling for active language

**Requirements:**
- Must be a client component
- Must use next-i18next's `useTranslation` hook to access the `i18n` object
- Display a toggle or button group to switch between 'es' (Spanish) and 'en' (English)
- Show flag emojis or language codes (🇪🇸 ES / 🇬🇧 EN)
- On language change, must call `i18n.changeLanguage(newLocale)`
- Persist current language in localStorage
- Highlight the active language
- Include smooth transition when switching
- Use translation keys for accessibility labels (aria-label)

**Example:**
```tsx
<div className='flex gap-2'>
  <button 
    className={`btn-outline ${locale === 'es' ? 'active' : ''}`}
    onClick={() => changeLanguage('es')}
    aria-label={t('language.spanish')}
  >
    🇪🇸 ES
  </button>
  <button 
    className={`btn-outline ${locale === 'en' ? 'active' : ''}`}
    onClick={() => changeLanguage('en')}
    aria-label={t('language.english')}
  >
    🇬🇧 EN
  </button>
</div>
```

### Prompt 26 (Dashboard Page)

"Generate the main dashboard page `app/dashboard/page.tsx`, protected by the `withAuth` HOC. All code must be in English.

**IMPORTANT**: Use global CSS classes for layout and styling:
- `.container-app` for main container
- `.section-spacing` for spacing between sections
- `.text-heading` for page title
- `.btn-primary` for the 'Add Category' button
- All component wrappers should use appropriate spacing utilities

This page must assemble the generated components in a responsive grid layout: 
- **Header Section:**
  - `<LanguageSwitcher />` in the top-right corner
  - Page title using translation key `t('dashboard.title')`
  - User welcome message with user name from Zustand store

- **Summary Section** (2-column grid on desktop, 1-column on mobile):
  - `<Balance />` component
  - `<CategoryChart />` component

- **Category Management Section:**
  - Section title: `t('categories.title')`
  - Button to open CategoryForm modal (use `.btn-primary`)
  - `<CategoryForm />` modal component (controlled by local state `isModalOpen`)

- **Transaction Management Section:**
  - Section title: `t('transactions.title')`
  - `<TransactionForm />` component
  - `<TransactionList />` component

**Modal functionality:**
- Use `useState` to manage `isModalOpen` state (boolean)
- Button click sets `isModalOpen` to true
- Pass props to CategoryForm: `isOpen={isModalOpen}`, `onClose={() => setIsModalOpen(false)}`, `onSuccess={handleCategorySuccess}`
- `handleCategorySuccess` callback should: refresh category list (trigger re-fetch in TransactionForm), show success toast/message, close modal

**Layout Requirements:**
- Responsive design (mobile-first approach)
- Proper spacing between sections
- Grid layout for balance and chart on larger screens
- All section titles and buttons must use translation keys
- Include loading states for async data
- Graceful error handling with user-friendly messages

**Example structure:**
```tsx
'use client';

import withAuth from '@/lib/withAuth';
import { useState } from 'react';
import Balance from '@/components/Balance';
import CategoryChart from '@/components/CategoryChart';
import CategoryForm from '@/components/CategoryForm';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';

function DashboardPage() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCategorySuccess = () => {
    setRefreshKey(prev => prev + 1); // Trigger re-fetch in child components
    setIsModalOpen(false);
  };

  return (
    <div className='container-app'>
      <header className='flex justify-between items-center mb-8'>
        <h1 className='text-heading'>{t('dashboard.title')}</h1>
        <LanguageSwitcher />
      </header>

      <div className='section-spacing'>
        <p className='text-subheading'>{t('dashboard.welcome', { name: user?.name })}</p>
      </div>

      <div className='grid md:grid-cols-2 gap-6 section-spacing'>
        <Balance />
        <CategoryChart />
      </div>

      <div className='section-spacing'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-subheading'>{t('categories.title')}</h2>
          <button className='btn-primary' onClick={() => setIsModalOpen(true)}>
            {t('categories.add')}
          </button>
        </div>
      </div>

      <CategoryForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCategorySuccess}
      />

      <div className='section-spacing'>
        <h2 className='text-subheading mb-4'>{t('transactions.title')}</h2>
        <TransactionForm key={refreshKey} />
        <TransactionList key={refreshKey} />
      </div>
    </div>
  );
}

export default withAuth(DashboardPage);
```
"
