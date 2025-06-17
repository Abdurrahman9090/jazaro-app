# Project Structure

```
├── .next/                      # Next.js build output
├── app/                        # Main application directory
│   ├── dashboard/             # Dashboard page
│   ├── help/                  # Help and support page
│   ├── history/               # Repair history page
│   ├── messages/              # Messaging system
│   ├── notifications/         # Notifications page
│   ├── payment/               # Payment processing
│   ├── profile/               # User profile page
│   ├── provider/              # Service provider pages
│   ├── request/               # Repair request pages
│   ├── settings/              # User settings
│   ├── splash/                # Splash/landing page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout component
│   ├── loading.tsx            # Loading state component
│   └── page.tsx               # Main page component
│
├── components/                 # Reusable components
│   ├── ui/                    # UI components
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   ├── context-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input.tsx
│   │   ├── input-otp.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── resizable.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── sonner.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── toggle.tsx
│   │   ├── toggle-group.tsx
│   │   ├── tooltip.tsx
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── camera-modal.tsx       # Camera and AI analysis component
│   └── theme-provider.tsx     # Theme management
│
├── hooks/                     # Custom React hooks
├── lib/                       # Utility functions and libraries
├── public/                    # Static assets
├── styles/                    # Additional styles
│
├── .gitignore                 # Git ignore rules
├── components.json            # Component configuration
├── next-env.d.ts             # Next.js TypeScript declarations
├── next.config.mjs           # Next.js configuration
├── package.json              # Project dependencies and scripts
├── pnpm-lock.yaml            # PNPM lock file
├── postcss.config.mjs        # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Key Features

1. **Camera and AI Analysis**
   - Located in `components/camera-modal.tsx`
   - Handles camera access, photo capture, and AI analysis
   - Integrated across multiple pages

2. **UI Components**
   - Comprehensive set of reusable UI components in `components/ui/`
   - Built with accessibility and customization in mind
   - Includes form elements, navigation, feedback components, etc.

3. **Page Structure**
   - Organized by feature in the `app/` directory
   - Each feature has its own directory with related components
   - Uses Next.js 13+ app directory structure

4. **Styling**
   - Uses Tailwind CSS for styling
   - Global styles in `app/globals.css`
   - Additional styles in `styles/` directory

5. **Configuration**
   - TypeScript configuration in `tsconfig.json`
   - Next.js configuration in `next.config.mjs`
   - Tailwind configuration in `tailwind.config.ts`
   - PostCSS configuration in `postcss.config.mjs` 