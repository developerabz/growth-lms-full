# Growth LMS

**In Progress**

A modern Learning Management System built with .NET 8 and Next.js 14.

## Project Structure

### Backend (.NET 8)
- **GrowthLMS.API**: Main Web API project
- **GrowthLMS.Core**: Core domain models and interfaces
- **GrowthLMS.Infrastructure**: Data access and external service implementations
- **GrowthLMS.Application**: Application services and business logic

### Frontend (Next.js 14)
- Modern React with TypeScript
- Tailwind CSS for styling
- Server-Side Rendering (SSR) and Static Site Generation (SSG)
- Type-safe API integration

## Prerequisites
- .NET 8 SDK
- Node.js 18+ and npm
- PostgreSQL 15+
- Azure CLI (for deployment)

## Getting Started

### Backend Setup
1. Navigate to the backend directory
2. Run `dotnet restore`
3. Update connection strings in `appsettings.json`
4. Run `dotnet run` from the GrowthLMS.API directory

### Frontend Setup
1. Navigate to the frontend directory
2. Run `npm install`
3. Create `.env.local` file with necessary environment variables
4. Run `npm run dev`

## Development
- Backend API runs on `https://localhost:7001`
- Frontend development server runs on `http://localhost:3000`

## Deployment
- Frontend: Vercel
- Backend: Azure App Service
- Database: Azure Database for PostgreSQL

## License
MIT 