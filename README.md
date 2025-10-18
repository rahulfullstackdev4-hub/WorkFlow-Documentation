# Workflow Documentation Platform

A comprehensive workflow documentation platform built with Next.js, featuring AI-assisted content creation, rich text editing, and collaborative features.

## Features

- **Authentication & Authorization**: Secure sign-in with Clerk, role-based access control
- **Rich Text Editor**: Tiptap editor with formatting, AI suggestions, summarization, and content generation
- **Workflow Management**: Create, edit, delete, and share workflows with version history
- **AI Integration**: OpenAI-powered workflow step suggestions, content summarization, and generation
- **Collaboration**: Comment system for team collaboration
- **Sharing**: Public sharing with unique tokens for read-only access
- **Version History**: Track changes with automatic snapshots
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Theme toggle for user preference

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS, Shadcn/UI
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL) with Prisma ORM
- **Authentication**: Clerk
- **Rich Text Editor**: Tiptap
- **AI**: OpenAI API
- **Styling**: TailwindCSS with Shadcn/UI components

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Clerk account
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd workflow-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/workflow_db"
DIRECT_URL="postgresql://username:password@localhost:5432/workflow_db"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Supabase (if using Supabase instead of local PostgreSQL)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

4. Set up the database:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following main models:

- **User**: Clerk user data with roles
- **Workflow**: Main workflow documents with content, metadata
- **Version**: Version history snapshots
- **Comment**: User comments on workflows
- **Share**: Public sharing tokens

## API Routes

### Workflows
- `GET /api/workflows` - List user's workflows
- `POST /api/workflows` - Create new workflow
- `GET /api/workflows/[id]` - Get workflow details
- `PUT /api/workflows/[id]` - Update workflow
- `DELETE /api/workflows/[id]` - Delete workflow

### AI Features
- `POST /api/ai` - AI suggestions, summarization, generation

### Comments
- `GET /api/workflows/[id]/comments` - Get workflow comments
- `POST /api/workflows/[id]/comments` - Add comment

### Sharing
- `POST /api/workflows/[id]/share` - Create share link
- `DELETE /api/workflows/[id]/share` - Remove sharing
- `GET /api/public/[token]` - Access public workflow

## Usage

### Creating Workflows

1. Sign in to your account
2. Navigate to the Dashboard
3. Click "Create New Workflow"
4. Fill in title, description, and initial content
5. Use the rich text editor to format your content
6. Leverage AI features for suggestions and generation

### AI Features

- **Suggest Steps**: Get AI-generated workflow steps based on your description
- **Summarize**: Create concise summaries of your workflow content
- **Generate Content**: AI-assisted content creation

### Collaboration

- Add comments to workflows for team discussion
- Share workflows publicly with read-only access
- Track version history for changes

## Deployment

### Vercel Deployment

1. **Connect Repository**: Connect your GitHub repository to Vercel
2. **Environment Variables**: Add the following environment variables in Vercel dashboard:
   - `DATABASE_URL`: Your PostgreSQL database URL (use Vercel Postgres)
   - `DIRECT_URL`: Direct database URL for migrations (Vercel Postgres)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
   - `CLERK_SECRET_KEY`: Clerk secret key
   - `GEMINI_API_KEY`: Google Gemini API key
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: `/sign-in`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: `/sign-up`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: `/dashboard`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`: `/dashboard`

3. **Database Setup**:
   - Use Vercel Postgres for the database
   - Run `npm run db:push` to push the schema to production
   - Alternatively, use `npm run db:migrate` if you have migrations

4. **Deploy**: Vercel will automatically build and deploy your application

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables are validated at build time to prevent deployment issues.

### Vercel Configuration

The `vercel.json` file is configured for:
- Next.js framework detection
- API function timeout settings (30s for AI operations)
- CORS headers for API routes
- Production environment settings
- Optimized build commands

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
