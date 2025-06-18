# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with turbopack (preferred)
- `pnpm build` - Build production version
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint to check code quality

Use `pnpm` as the package manager (pnpm-lock.yaml present).

## Architecture Overview

This is a modern Next.js 15 portfolio website using the App Router pattern with TypeScript and Tailwind CSS.

### Key Architectural Patterns

- **Server Actions**: Contact form submission uses server actions in `src/app/actions.ts`
- **Type Safety**: Comprehensive TypeScript with Zod validation for forms
- **Component-Based**: Modular component structure with reusable UI components
- **Static Data**: Portfolio content stored in `src/lib/data.ts` with type definitions in `src/lib/types/`

### Core Technologies Stack

- **Next.js 15** with App Router
- **React 19 RC** with TypeScript
- **Tailwind CSS** with custom design system
- **Framer Motion** (motion library) for animations
- **React Hook Form** with Zod validation
- **Swiper** for carousels

### Directory Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components organized by feature
  - `animation/` - Animation components (scroll progress, expanders, count-up)
  - `contact/` - Contact form and related components
  - `decoration/` - Seasonal decorations (Christmas themes)
  - `experience/` - Work experience components
  - `projects/` - Project showcase components
  - `providers/` - React context providers
- `src/lib/` - Utilities, constants, and type definitions
  - `types/` - TypeScript type definitions for content

### Design System

Custom color system using CSS custom properties:
- `foreground`/`background` for main colors
- `gray-50` through `gray-950` for neutral colors  
- `primary-50` through `primary-950` for brand colors
- Custom animations: wave, fade-in, shadow-pulse

### Key Features

- **Contact Form**: Cloudflare Turnstile integration with Mailgun email delivery
- **Seasonal Decorations**: Christmas themes with snow and Santa hat animations
- **Responsive Design**: Mobile-first approach with custom breakpoints
- **Performance**: Optimized with Next.js 15 and Turbopack

### External Integrations

- **Cloudflare Turnstile**: Invisible CAPTCHA for spam protection
- **Mailgun**: Email delivery service
- **Vercel**: Deployment platform (inferred from README)

### Data Management

Portfolio content is statically defined in `src/lib/data.ts`:
- `EXPERIENCES` - Work experience entries
- `PROJECTS` - Portfolio projects
- `SKILLS` - Technical skills with SVG icons and colors

### Environment Variables Required

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Turnstile public site key
- `TURNSTILE_SECRET_KEY` - Turnstile secret key
- `MAILGUN_API_KEY` - Mailgun API key
- `MAILGUN_DOMAIN_NAME` - Mailgun domain