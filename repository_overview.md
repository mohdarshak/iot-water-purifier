# PurityGrid - IoT Water Purifier Repository Overview

## Project Summary
**PurityGrid** (also known as `iot-water-purifier`) is an intelligent IoT-based water purifier rental system that provides water purifiers as a service. The application allows users to rent water purifiers and monitor their health and water quality through a comprehensive dashboard.

## Tech Stack
- **Framework**: Next.js 15.2.4 with TypeScript
- **UI**: React 19 + Tailwind CSS + Radix UI components
- **Package Manager**: pnpm
- **Backend**: AWS services (IoT Core, Lambda, DynamoDB)
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization

## Project Structure

### Core Directories
```
/
├── app/                     # Next.js App Router pages
│   ├── business/           # Business user features
│   │   ├── login/
│   │   ├── signup/
│   │   ├── dashboard/
│   │   ├── maintenance/
│   │   └── income/
│   ├── user/               # End user features
│   │   ├── login/
│   │   ├── signup/
│   │   ├── dashboard/
│   │   ├── billing/
│   │   ├── charts/
│   │   └── rent/
│   ├── about/
│   ├── contact/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css
├── components/
│   ├── ui/                 # Comprehensive UI component library
│   └── theme-provider.tsx
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
├── public/                 # Static assets
└── styles/                 # Additional styling
```

## Key Features

### 1. **Dual User Interface**
- **User Portal**: For individuals renting water purifiers
  - Login/Signup functionality
  - Dashboard for monitoring purifier health
  - Water quality tracking
  - Billing management
  - Rental services

- **Business Portal**: For fleet management
  - Business login/signup
  - Fleet dashboard
  - Maintenance tracking
  - Income monitoring
  - Multiple purifier management

### 2. **Modern UI Components**
The project includes a comprehensive UI library with 50+ components:
- Form components (inputs, selects, checkboxes, etc.)
- Navigation (menus, breadcrumbs, sidebars)
- Data display (tables, charts, cards)
- Feedback (alerts, toasts, progress bars)
- Layout components (dialogs, sheets, accordions)

### 3. **IoT Integration**
- Real-time water quality monitoring
- Device health tracking
- AWS IoT Core integration
- Lambda functions for backend processing
- DynamoDB for data storage

## Landing Page Features
The main landing page (`app/page.tsx`) features:
- Modern gradient design with backdrop blur effects
- Dual login portals (User vs Business)
- Feature showcase
- Responsive design
- Professional branding as "PurityGrid"

## Development Setup
- Uses TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality
- Modern React patterns with hooks
- Form validation with Zod schemas

## Current Status
According to the README, this appears to be an **Initial Release** version of the water purifier rental platform, with core functionality for both user and business interfaces implemented.

The application represents a comprehensive IoT solution for water purification services, combining modern web technologies with AWS backend services to create a scalable rental platform.