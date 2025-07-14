# TrailMate React Frontend Development Prompt

## 📋 Project Overview

TrailMate is a smart travel planning chatbot powered by AI agent orchestration with three specialized agents:
- **Accommodation Agent**: Finds suitable housing options
- **Experience Planner Agent**: Suggests activities and itineraries
- **Budget Optimizer Agent**: Optimizes plans within budget constraints

This document provides guidance for developing a modern React frontend to replace the originally planned Streamlit interface.

## 🎯 Frontend Requirements

### Core Functionality

1. **Conversational Interface**
   - Chat-based UI for interacting with the TrailMate agents
   - Support for text input and structured form inputs when needed
   - Real-time response streaming from agents
   - Chat history persistence with mem0 integration

2. **Trip Planning Flow**
   - Initial trip parameters collection (destination, dates, guests, budget, preferences)
   - Display of accommodation options with sorting/filtering
   - Display of experience/activity recommendations with filtering options
   - Budget optimization view with cost breakdown
   - Final itinerary view with day-by-day planning

3. **User Management**
   - Authentication via Supabase (login/signup)
   - User profile management
   - Saved trips and preferences
   - Trip sharing capabilities

4. **Responsive Design**
   - Mobile-first approach
   - Tablet and desktop optimized layouts
   - Offline capabilities for viewing saved trips

## 🛠️ Technical Stack

### Core Technologies
- **Frontend Framework**: React with TypeScript
- **State Management**: Redux Toolkit or React Context API
- **Styling**: Tailwind CSS with a component library (Chakra UI or MUI)
- **API Communication**: React Query + Axios
- **Authentication**: Supabase Auth
- **Form Handling**: React Hook Form + Zod validation

### Integration Points
- **Backend**: FastAPI endpoints
- **Database**: Supabase
- **Memory**: mem0 for conversational history
- **Agent Communication**: WebSockets for real-time agent responses

## 📱 Key UI Components

### 1. Chat Interface
- Message bubbles with support for:
  - Text messages
  - Rich media (images, maps)
  - Interactive components (selection cards, date pickers)
  - Loading states for agent responses
  - Error handling and retry mechanisms

### 2. Trip Parameters Form
- Location search with autocomplete
- Date range picker
- Guest count selector
- Budget range slider
- Preference selection (economy, standard, luxury)
- Interest tags selection (nature, culture, food, etc.)

### 3. Accommodation Display
- Card-based listing view
- Detail modal/page with:
  - Photo gallery
  - Amenities list
  - Map location
  - Price breakdown
  - Booking link integration

### 4. Experience/Activity Browser
- Category-based filtering
  - By type (attractions, dining, entertainment)
  - By interest tags
  - By price range
- Map view integration
- Day-based grouping for itinerary planning
- Drag-and-drop reordering capability

### 5. Budget Optimization View
- Visual budget allocation breakdown
- Interactive sliders for adjusting priorities
- Alternative plan comparison
- Cost summary with alerts for over-budget items

### 6. Itinerary Dashboard
- Timeline view of the complete trip
- Day-by-day breakdown
- Cost tracking
- Sharing options
- Export to calendar/PDF functionality

## 🎨 Design Guidelines

### Visual Identity
- **Color Palette**:
  - Primary: #3B82F6 (Blue)
  - Secondary: #10B981 (Green)
  - Accent: #F59E0B (Amber)
  - Neutrals: #1F2937, #4B5563, #9CA3AF, #F3F4F6
- **Typography**:
  - Headings: Inter (600, 700)
  - Body: Inter (400, 500)
- **Iconography**: Phosphor Icons or Heroicons

### UI Patterns
- Clean, minimal interface with focus on content
- Card-based design for accommodation and activities
- Progressive disclosure for complex information
- Skeleton loaders for async content
- Micro-interactions for engagement
- Dark/light mode support

## 🔄 Data Flow Architecture

### Agent Communication Flow
1. User inputs travel requirements (text or structured form)
2. Frontend sends request to FastAPI backend
3. Backend orchestrates agent communication:
   - Accommodation Agent processes housing options
   - Experience Planner Agent generates activity recommendations
   - Budget Optimizer Agent creates optimized plan
4. Real-time updates streamed to frontend via WebSockets
5. Final results displayed in organized UI components

### State Management
- Global app state for:
  - User authentication
  - Current trip parameters
  - Chat history
  - Agent processing status
- Component-level state for UI interactions
- Persistent storage with Supabase and mem0

## 📊 API Integration

### Backend Endpoints
- `/api/chat` - WebSocket endpoint for agent communication
- `/api/trips` - CRUD operations for saved trips
- `/api/user` - User profile management
- `/api/accommodations` - Accommodation search and filtering
- `/api/activities` - Activity search and recommendations
- `/api/budget` - Budget optimization requests

### Authentication Flow
- Supabase authentication integration
- JWT token management
- Protected routes with auth guards
- Role-based access control

## 🧪 Testing Strategy

- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: Page flows with Mock Service Worker
- **E2E Tests**: Critical user journeys with Cypress
- **Visual Regression**: Storybook + Chromatic

## 🚀 Implementation Plan

### Phase 1: Core Chat Interface
- Setup React project with TypeScript
- Implement basic chat UI components
- Connect to backend WebSocket for agent communication
- Build initial trip parameter collection form

### Phase 2: Results Display
- Develop accommodation listing components
- Create activity recommendation views
- Implement budget visualization components
- Build itinerary timeline view

### Phase 3: User Management
- Integrate Supabase authentication
- Implement user profiles
- Add trip saving and loading functionality
- Develop sharing capabilities

### Phase 4: Polish & Optimization
- Implement responsive design optimizations
- Add offline capabilities
- Optimize performance
- Implement analytics tracking

## 🔍 Key Considerations

1. **Performance Optimization**
   - Virtualized lists for long accommodation/activity lists
   - Lazy loading of images and heavy components
   - Code splitting for route-based chunks
   - Memoization of expensive calculations

2. **Accessibility**
   - WCAG 2.1 AA compliance
   - Keyboard navigation support
   - Screen reader compatibility
   - Sufficient color contrast

3. **Error Handling**
   - Graceful degradation for API failures
   - Meaningful error messages
   - Retry mechanisms
   - Fallback UI components

4. **Security**
   - Input sanitization
   - XSS protection
   - CSRF protection
   - Secure storage of sensitive data

## 📚 Development Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Query Documentation](https://react-query.tanstack.com/overview)

## 🧩 Component Library Structure

```
/src
  /components
    /chat
      ChatContainer.tsx
      MessageBubble.tsx
      InputArea.tsx
      ...
    /trip
      TripForm.tsx
      LocationSearch.tsx
      DateRangePicker.tsx
      ...
    /accommodation
      AccommodationList.tsx
      AccommodationCard.tsx
      AccommodationDetail.tsx
      ...
    /activities
      ActivityList.tsx
      ActivityCard.tsx
      CategoryFilter.tsx
      ...
    /budget
      BudgetBreakdown.tsx
      PrioritySlider.tsx
      CostSummary.tsx
      ...
    /itinerary
      ItineraryTimeline.tsx
      DayCard.tsx
      ItineraryMap.tsx
      ...
    /common
      Button.tsx
      Card.tsx
      Modal.tsx
      ...
  /pages
    Home.tsx
    Chat.tsx
    Accommodations.tsx
    Activities.tsx
    Budget.tsx
    Itinerary.tsx
    Profile.tsx
    ...
  /hooks
    useChat.ts
    useTrip.ts
    useAccommodation.ts
    ...
  /services
    api.ts
    supabase.ts
    mem0.ts
    ...
  /store
    index.ts
    authSlice.ts
    tripSlice.ts
    ...
  /types
    index.ts
    accommodation.ts
    activity.ts
    ...
  /utils
    formatting.ts
    validation.ts
    ...
```

This prompt provides a comprehensive guide for developing the TrailMate React frontend, aligning with the agent requirements and project specifications. 