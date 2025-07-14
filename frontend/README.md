# TrailMate React Frontend

A modern React-based frontend for the TrailMate AI travel planning application.

## Overview

TrailMate is a smart travel planning chatbot powered by AI agent orchestration with three specialized agents:
- **Accommodation Agent**: Finds suitable housing options
- **Experience Planner Agent**: Suggests activities and itineraries
- **Budget Optimizer Agent**: Optimizes plans within budget constraints

This React frontend provides a user-friendly interface to interact with these agents and plan your perfect trip.

## Features

- Conversational chat interface for interacting with AI agents
- Trip parameter collection with intuitive forms
- Visual display of accommodation options and activities
- Budget optimization with interactive controls
- Day-by-day itinerary planning
- User account management and trip saving
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher

### Installation

1. Clone the repository
2. Navigate to the frontend directory
```bash
cd frontend
```
3. Install dependencies
```bash
npm install
```
4. Create a `.env` file with the required environment variables (see `.env.example`)
5. Start the development server
```bash
npm run dev
```

## Project Structure

The project follows a modular architecture with the following structure:

```
/src
  /components     # Reusable UI components
  /pages          # Page components for routing
  /hooks          # Custom React hooks
  /services       # API and external service integrations
  /store          # State management
  /types          # TypeScript type definitions
  /utils          # Utility functions
  /assets         # Static assets (images, fonts, etc.)
```

## Development

### Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run linting

### Environment Variables

Create a `.env` file with the following variables:

```
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_MEM0_PUBLIC_KEY=your-mem0-public-key
```

## Technologies

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Query** - Data fetching and caching
- **React Router** - Routing
- **Supabase** - Authentication and database
- **Zod** - Schema validation

## Integration Points

- FastAPI backend for agent orchestration
- Supabase for authentication and data storage
- mem0 for conversational memory
- WebSockets for real-time agent communication

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 