# Apartments App

A modern, responsive web application for discovering and browsing apartment listings. Built with Next.js 14 (App Router), TypeScript, and Material-UI, this application provides an intuitive user experience for filtering, searching, and exploring available apartments with advanced filters and pagination.

---

## Table of Contents

- Project Overview
- Features
- Tech Stack
- Project Structure
- Getting Started
  - Prerequisites
  - Installation
  - Environment Variables
  - Running the Application
- Project Architecture
  - Pages
  - Components
  - State Management
  - API Integration
- Usage Guide
  - Landing Page
  - Browse Apartments
  - Filter & Search
  - Apartment Details
  - Pagination (Infinite Scroll)
- Styling & Theme
- Development Practices
- Deployment
- Troubleshooting
- Contributing
- License

---

## Project Overview

**Apartments App** is a full-featured apartment discovery platform that connects users with available listings in their desired locations and preferences. The application seamlessly integrates with a RESTful backend API to fetch, filter, and display apartment data in real-time.

Users can:
- Browse all available apartments
- Filter by price, bedrooms, bathrooms, and area
- Search by unit name or address
- View detailed apartment information with image galleries
- Experience smooth infinite scrolling pagination

The application prioritizes responsive design, performance, and user experience across all device sizes.

## Features

### Core Functionality
- **Browse Listings** — Explore a paginated list of all available apartments with infinite scroll loading
- **Advanced Filtering** — Filter apartments by:
  - Price range (min/max)
  - Number of bedrooms
  - Number of bathrooms
  - Unit area range (sqft)
  - Unit number (exact match)
- **Search Functionality** — Real-time search across unit name and address (case-insensitive)
- **Detailed Views** — Rich apartment detail pages with:
  - Image carousel/gallery
  - Full apartment specifications (beds, baths, area)
  - Address and description
  - Current availability status
  - Price display
- **Infinite Scroll Pagination** — Seamlessly load more apartments as users scroll down
- **Responsive Design** — Mobile-first approach supporting all device sizes
- **Skeleton Loading** — Professional loading states for improved perceived performance

### User Experience
- Smooth animations and transitions (fade-in effects)
- Accessibility-first component design
- Error handling and user feedback
- Loading indicators and skeleton screens
- Back-to-listing navigation
- Consistent theming across the application

## Tech Stack

### Core Framework
- **Next.js 14** — React meta-framework with App Router, server components, and optimized image handling
- **React 18** — Component-based UI library with hooks
- **TypeScript** — Type-safe JavaScript development

### UI & Styling
- **Material-UI (MUI)** — Comprehensive component library and theming system
- **CSS-in-JS (sx prop)** — MUI's sx styling API for component-scoped styles
- **Custom Theme** — Centralized theme configuration with indigo primary color and grey palettes

### API & Data Fetching
- **Fetch API** — Native browser API for HTTP requests
- **Next.js Server Components** — Server-side data fetching for detail pages

### Development & Build Tools
- **Node.js & npm** — Package management and runtime
- **TypeScript Compiler** — Type checking and transpilation
- **Next.js Build System** — Optimized production builds

## Project Structure

```
apartments-app/
├── app/
│   ├── layout.tsx              # Root layout with theme provider
│   ├── globals.css             # Global styles
│   ├── page.tsx                # Landing page (home)
│   ├── theme.ts                # MUI theme configuration
│   ├── themeProviders.tsx       # Theme provider wrapper
│   ├── _components/
│   │   └── appHeader.tsx        # Sticky header with branding
│   └── apartments/
│       ├── page.tsx            # Apartment listing page
│       ├── types.ts            # TypeScript interfaces
│       ├── [apartmentId]/
│       │   └── page.tsx        # Apartment detail page (SSR)
│       └── _components/
│           ├── filterSidebar.tsx         # Filter UI component
│           ├── apartmentCard.tsx         # Apartment list card
│           ├── apartmentCardSkeleton.tsx # Loading skeleton
│           └── imageCarousel.tsx         # Image gallery component
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
├── theme.ts                    # Shared theme (exported)
└── README.md                   # This file
```

### Key Files Explained

- **`app/layout.tsx`** — Root layout component wrapping all pages with Material-UI theme provider
- **`app/page.tsx`** — Landing page introducing the app with a call-to-action button
- **`app/apartments/page.tsx`** — Main listing page with filters, search, and infinite scroll
- **`app/apartments/[apartmentId]/page.tsx`** — Server-rendered apartment detail page
- **`theme.ts`** — Centralized Material-UI theme with custom indigo palette
- **`app/_components/appHeader.tsx`** — Sticky header with logo and branding

## Getting Started

### Prerequisites

- **Node.js** >= 16 (recommended 18 or 20)
- **npm** or yarn package manager
- **Git** for version control

### Installation

1. Clone the repository

```bash
git clone https://github.com/AhmeddNofal/apartments-finder.git
cd apartments-app
```

2. Install dependencies

```bash
npm install
```

3. Create environment variables file

```bash
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Important:** Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Only add non-sensitive data here.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL (e.g., `http://localhost:5000`) |

### Running the Application

**Development Mode:**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

**Production Build:**

```bash
npm run build
npm run start
```

**Linting:**

```bash
npm run lint
```

## Project Architecture

### Pages (App Router)

#### Landing Page (`app/page.tsx`)
- Hero section with call-to-action
- Introduces the app value proposition
- Link to browse apartments
- Responsive design with animations

#### Apartment Listing (`app/apartments/page.tsx`)
- Client-side rendered page with state management
- Displays paginated list of apartments
- Integrates filter sidebar and apartment cards
- Implements infinite scroll pagination using Intersection Observer API
- Features:
  - Dynamic filter state management
  - Lazy loading with skeleton screens
  - Error handling and empty state messages
  - Responsive two-column layout (sidebar + listings)

#### Apartment Detail (`app/apartments/[apartmentId]/page.tsx`)
- Server-side rendered for SEO and performance
- Fetches apartment data at build/request time
- Displays:
  - Image carousel
  - Apartment specifications (beds, baths, area)
  - Address and location
  - Full description
  - Price and availability
- Error handling for missing apartments

### Components

#### `AppHeader` (`_components/appHeader.tsx`)
- Sticky positioning for persistent navigation
- Logo and branding
- Theme-aware styling using `primary.main` and `text.primary` palette tokens
- Icon inheritance for consistent color application

#### `FilterSidebar` (`_components/filterSidebar.tsx`)
- Encapsulated filter form with validation
- Filters:
  - Price range (min/max)
  - Bedrooms and bathrooms (exact)
  - Area range (min/max)
  - Unit number (exact)
- Callback-based state management with parent component
- Form reset functionality

#### `ApartmentCard` (`_components/apartmentCard.tsx`)
- Reusable card component for apartment preview
- Displays key metrics (price, beds, baths, area)
- Link-friendly wrapper
- Hover effects and animations

#### `ApartmentCardSkeleton` (`_components/apartmentCardSkeleton.tsx`)
- Loading skeleton matching `ApartmentCard` dimensions
- Provides visual feedback during data fetching
- Improves perceived performance

#### `ImageCarousel` (`_components/imageCarousel.tsx`)
- Image gallery/slider component
- Displays apartment photos
- Navigation controls (previous/next)
- Fallback to placeholder image if no images available

### State Management

The application uses React hooks for state management at the page/component level:

```typescript
// Apartment Listing Page State
const [filters, setFilters] = useState({});           // Active filters
const [apartments, setApartments] = useState([]);     // Fetched apartments
const [loading, setLoading] = useState(true);         // Loading state
const [error, setError] = useState("");               // Error messages
const [page, setPage] = useState(1);                  // Current page
const [hasMore, setHasMore] = useState(true);         // More data available?
```

### API Integration

The frontend communicates with the backend API at `NEXT_PUBLIC_API_URL` (e.g., `http://localhost:5000`).

#### Endpoints Used

**Fetch Apartments (with filters)**

```
GET /apartments?page=1&limit=10&search=...&minPrice=...&maxPrice=...
```

Response:
```json
{
  "data": [
    {
      "_id": "...",
      "unitName": "...",
      "price": 250000,
      "bedrooms": 3,
      "baths": 2,
      "unitArea": 120,
      "address": "...",
      "description": "...",
      "images": ["fileId1", "fileId2"]
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

**Fetch Single Apartment**

```
GET /apartments/:id
```

**Download Image**

```
GET /apartments/file/:fileId
```

## Usage Guide

### Landing Page

1. User opens the app and sees the landing page
2. Hero section displays the value proposition
3. "See Available Apartments" button navigates to `/apartments`
4. Footer displays trust indicators

### Browse Apartments

1. Navigate to `/apartments` to view all listings
2. Apartments are displayed in a scrollable list
3. Infinite scroll automatically loads more as you reach the bottom
4. Skeleton loaders indicate loading state

### Filter & Search

1. **Price Range:** Enter min/max price in the sidebar
2. **Bedrooms/Bathrooms:** Select exact number
3. **Area:** Define min/max square footage
4. **Search:** Type in search field to filter by name or address (all filters apply together)
5. Filters update results in real-time
6. Clear filters to reset to default view

### Apartment Details

1. Click any apartment card in the listing
2. Navigate to the detail page (`/apartments/:id`)
3. View:
   - Image carousel with multiple photos
   - Complete specifications
   - Full description
   - Address with location icon
   - Price and availability badge
4. Click "← Back to Listings" to return

### Pagination (Infinite Scroll)

1. Scroll down the apartment list
2. When you near the bottom, more apartments load automatically
3. Indicator at the bottom shows loading state
4. Process repeats until all apartments are loaded

## Styling & Theme

### Theme Configuration (`theme.ts`)

The application uses a centralized Material-UI theme:

```typescript
const appTheme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  palette: {
    primary: {
      main: '#4f46e5',      // Indigo-600
      light: '#6366f1',     // Indigo-500
      dark: '#4338ca',      // Indigo-700
    },
    background: {
      default: '#f9fafb',   // Grey-50
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      // ... more grey shades
    },
  },
});
```

### Custom Palette Access

Components access theme colors via the `sx` prop:

```typescript
sx={{
  color: 'primary.main',           // Indigo-600
  backgroundColor: 'grey[50]',     // Light grey
  borderColor: 'text.primary',     // Theme text color
}}
```

### Animations

Global animations defined in `globals.css`:

```css
.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.fade-in-left {
  animation: fadeInLeft 0.6s ease-out forwards;
}

.fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
```

Components use these classes for entrance animations:

```tsx
<Box className="fade-in-up">
  <ApartmentCard apartment={apt} />
</Box>
```

## Development Practices

### TypeScript

All code is strongly typed with TypeScript. Key types:

```typescript
// Apartment type (from backend)
interface Apartment {
  _id: string;
  unitName: string;
  unitNo: number;
  bedrooms: number;
  baths: number;
  unitArea: number;
  price: number;
  address: string;
  description: string;
  images: string[];
}
```

### Component Patterns

- **Server Components** — Detail pages use Next.js server components for data fetching
- **Client Components** — Interactive pages marked with `"use client"`
- **Props Drilling** — Minimal prop passing; filters managed at page level
- **Controlled Components** — Form inputs managed by React state

### Error Handling

- API errors displayed via `Alert` component
- Empty state messages when no apartments match filters
- Fallback images if apartment images unavailable
- Graceful 404 handling on detail pages

## Deployment

### Vercel (Recommended)

Vercel is optimized for Next.js applications:

1. Push code to GitHub
2. Connect repository to Vercel dashboard
3. Set environment variables in Vercel project settings
4. Deploy automatically on push to main branch

### Self-Hosted

1. Build the application

```bash
npm run build
```

2. Start the production server

```bash
npm run start
```

3. Use a process manager (PM2) or reverse proxy (nginx) for production deployment

### Environment Variables for Deployment

Ensure `NEXT_PUBLIC_API_URL` points to your production backend API.


## Related Projects

- **Apartments API** — Backend REST API for apartment data and file storage
  - Repository: `apartments-api/`
  - Documentation: See `apartments-api/README.md`


## Quick Reference

### Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Key Routes

- `/` — Landing page
- `/apartments` — Browse listings with filters
- `/apartments/:id` — Apartment detail view

### API Base URL

Set in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

