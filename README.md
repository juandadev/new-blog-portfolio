# My Personal Portfolio & Blog 👨🏻‍💻✍🏻

Welcome to my personal site and blog, a platform where I showcase my top software engineering projects, share my experiences, and host a blog for technical articles and insights. Built with modern web technologies, this project is designed to be scalable, accessible, and user-friendly.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview
This project is a full-stack web application built with Next.js, TypeScript, and PostgreSQL. It serves as a personal portfolio to highlight my software engineering work and a blog platform where I publish articles. The site includes a dashboard for managing blog posts and user accounts, with authentication and role-based access control. The design is mobile-first, accessible, and supports light/dark mode switching.

## Features
- **Portfolio Homepage**: A hero section with a brief introduction and links to social media (X, GitHub, LinkedIn, Dev.to), plus a section showcasing the latest 5 blog posts.
- **Blog Section**: Displays all articles with pagination (8 posts per page), sorted by most recent, with title, date, and description.
- **Single Blog View**: Renders full articles with markdown support for consistent styling.
- **About Page**: A customizable section to share more about myself.
- **Newsletter Signup**: A form for users to subscribe to updates via email.
- **Authentication**: Secure login for admin and collaborators using NextAuth with credentials-based authentication.
- **Dashboard**: Admin panel with:
    - **Blog Manager**: CRUD operations for articles, search by title, and status toggle (active/inactive).
    - **Users Manager**: Superuser-only section to manage user accounts, send invitations, and toggle user status.
    - **Markdown Editor**: A reusable component with write/preview tabs for creating and editing posts.
- **Role-Based Access**: Superuser has full access; regular users can only manage their own articles.
- **Accessibility**: Meets a11y standards with ARIA labels, proper color contrast, and screen reader support.
- **Theme Switcher**: Light/dark mode toggle with local storage persistence.
- **Responsive Design**: Mobile-first approach supporting 379px (mobile), 768px (tablet), and 1440px (desktop) viewports.

## Tech Stack
- **Framework**: Next.js (App Router) with TypeScript
- **Database**: PostgreSQL with Supabase + Prisma ORM
- **UI Library**: shadcn/ui for accessible and customizable components
- **Authentication**: NextAuth for secure credentials-based login
- **Forms**: React Hook Form for form management
- **Date Formatting**: date-fns for consistent date handling
- **Markdown Rendering**: react-markdown for parsing blog content
- **Styling**: Tailwind CSS with shadcn/ui
- **Fonts**: DM Sans (main text) and Fira Code (markdown editor)
- **Code Quality**: ESLint (React, Hooks, a11y, TypeScript) and Prettier
- **Deployment**: Vercel with Namecheap domain integration

## Getting Started
Follow these steps to set up the project locally.

### Prerequisites
- Node.js (>= 18.x)
- npm or yarn
- Supabase account for PostgreSQL database
- Vercel account for deployment (optional)
- Namecheap domain (optional)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/my-blog.git
   cd my-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize the database:
   Update `prisma/schema.prisma` with your Supabase connection details and run:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

### Configuration
- **Supabase**: Create a project in Supabase and get the URL and API key.
- **Fonts**: DM Sans and Fira Code are loaded via Next.js font optimization.
- **ESLint/Prettier**: Run `npm run lint` to check code quality and `npm run format` to format code.

## Project Structure
```
my-blog/
│── src/
│   ├── app/
│   │   ├── api/                    # API routes (articles, auth, etc.)
│   │   ├── dashboard/              # Admin dashboard pages
│   │   ├── blog/                   # Blog listing and single post pages
│   │   ├── about/                  # About page
│   │   ├── newsletter/             # Newsletter signup page
│   │   ├── login/                  # Login page
│   │   ├── confirm-invitation/     # Invitation confirmation page
│   │   ├── layout.tsx              # Default layout (navbar, footer)
│   │   ├── page.tsx                # Homepage
│   │   └── globals.css             # Global styles
│   ├── components/                 # Reusable UI components (e.g., Markdown Editor)
│   ├── lib/                        # Utility functions and constants
│   └── styles/                     # Additional CSS (if needed)
├── prisma/
│   └── schema.prisma           # Prisma schema for database models
├── public/                     # Static assets (e.g., profile picture)
├── .env                        # Prisma Environment variables
├── .eslint.config.mjs          # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Deployment
The project is deployed on Vercel with a custom domain from Namecheap.

1. Push your code to a GitHub repository.
2. Import the repository into Vercel.
3. Configure your Namecheap domain in Vercel under the "Domains" section.
4. Deploy the project and verify the custom domain.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please ensure your code follows the ESLint and Prettier configurations.

Made with ❤️ and ☕️ by Juan Martinez