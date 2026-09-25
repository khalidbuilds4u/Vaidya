# AsadHealthcare - AI Developer Guide

Welcome, future AI Developer! This document is designed to give you a deep understanding of the architecture, stack, and conventions of the `medical-tourism` (AsadHealthcare) project. 

**CRITICAL: Read this document thoroughly before proposing or writing code for this project.**

## 1. Core Technology Stack
- **Framework:** Next.js 16.3.0 (App Router only). *Note: Pay attention to Next.js 16 breaking changes (e.g., `params` and `searchParams` are Promises).*
- **React:** React 19.2.8.
- **Styling:** Tailwind CSS 4.0.
- **Database ORM:** Prisma ORM (v7.9) connected to PostgreSQL (Supabase) via `@prisma/adapter-pg`.
- **Localization (i18n):** `next-intl` handles all translations.
- **UI Components:** Radix UI primitives wrapped in customized Shadcn UI (located in `src/components/ui/`).
- **Animations:** Framer Motion (`framer-motion`) for smooth, premium micro-interactions.
- **Icons:** `lucide-react`.
- **Media:** Cloudinary (Next Cloudinary) and Unsplash for imagery.

## 2. Directory Architecture
The project heavily utilizes Next.js Route Groups and dynamic routes for localization:

```text
src/
├── app/
│   ├── [locale]/               # All routes are wrapped in a locale parameter (e.g., /en, /ar, /fr)
│   │   ├── (patient)/          # Public-facing website (Home, Treatments, Specialties, Doctors)
│   │   │   ├── treatments/     # Treatments directory and detail pages
│   │   │   ├── specialties/    # Specialties directory and detail pages
│   │   │   └── page.tsx        # Landing Page (Hero, Popular items, Testimonials)
│   │   ├── (admin)/            # Internal admin dashboard for managing data
│   │   └── layout.tsx          # Root layout that handles i18n Provider
│   └── actions/                # Server Actions (e.g., searchActions.ts)
├── components/
│   ├── patient/                # UI components strictly for the public-facing site
│   ├── admin/                  # UI components strictly for the admin panel
│   └── ui/                     # Shadcn UI reusable components (Buttons, Inputs, Dialogs, etc.)
├── i18n/                       # Translation dictionaries and routing configurations
├── lib/
│   ├── prisma.ts               # Prisma singleton client instance
│   ├── api.ts                  # Server-side data fetchers with Next.js caching
│   └── utils.ts                # Helper functions (cn, stripHtml, getTranslation)
```

## 3. Design Language & Aesthetics (CRITICAL)
This is a **premium, world-class** medical tourism platform. If you write UI code that looks generic or basic, you have failed the user's instructions.
- **Glassmorphism:** Use translucent backgrounds with blurs for floating elements (e.g., `bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-slate-800`).
- **Smooth Animations:** Always use `transition-all duration-300` or Framer Motion (`<motion.div>`) for state changes, hover effects, and dropdowns. 
- **Colors:** Avoid raw primary colors (e.g., `blue-500`, `red-500`). Use curated palettes like `slate`, `teal`, and custom `primary` colors. Leverage `dark:` variants everywhere to ensure full dark-mode compatibility.
- **Micro-interactions:** Search bars should be "live" (filtering on keystroke via `useTransition` or debounce) without requiring the user to press an explicit "Search" button.

## 4. Key Developer Gotchas & Patterns

### A. Next.js 16 App Router Constraints
- `params` and `searchParams` in Pages and Layouts are **Promises**. You MUST `await` them before destructuring.
  ```tsx
  // CORRECT
  export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
  }
  ```
- Use `useTransition` for loading states during soft navigations (`router.push`).

### B. Internationalization (next-intl)
- **Server Components:** Use `getTranslations('Namespace')`.
- **Client Components:** Use `useTranslations('Namespace')`.
- **Dynamic Data Translations:** For database entries, use the `getTranslation(entity, field, locale)` utility from `@/lib/utils` rather than accessing fields directly. This ensures the correct fallback logic is applied if a translation doesn't exist.

### C. Search & Filtering
- We do not use external debounce libraries (e.g., `use-debounce` is NOT installed). Implement debounce natively using `setTimeout` within `useEffect`, or rely on React's `useTransition`.
- When filtering lists in Server Components, read from `searchParams.q` and filter the Prisma output or the fetched array. See `src/app/[locale]/(patient)/treatments/page.tsx` for the reference implementation.

### D. Data Handling & HTML
- The `recovery` and `description` fields in the database may contain raw HTML (e.g., `<p>`). Always wrap these in `stripHtml(...)` (from `@/lib/utils`) when displaying them in standard text tags or card previews to prevent raw HTML strings from appearing in the UI.

## 5. Working with the Admin Panel
- When modifying admin forms, ensure that inputs have proper dark mode text contrast. Use specific text classes like `text-slate-900 dark:text-white` on `<Input>` elements, as the browser defaults may render text invisible against certain backgrounds.

---
*End of Guide. Follow these principles tightly to maintain the health and premium feel of AsadHealthcare.*
