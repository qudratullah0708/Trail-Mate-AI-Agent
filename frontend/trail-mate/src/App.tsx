import { ChakraProvider, Box } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './theme';

// Pages
import HomePage from './pages/Home';
import ChatPage from './pages/Chat';
import AccommodationsPage from './pages/Accommodations';
import ActivitiesPage from './pages/Activities';
import BudgetPage from './pages/Budget';
import ItineraryPage from './pages/Itinerary';
import ProfilePage from './pages/Profile';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router>
          <Box minH="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex="1" as="main" width="100%">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/chat/:tripId" element={<ChatPage />} />
                <Route path="/accommodations" element={<AccommodationsPage />} />
                <Route path="/accommodations/:tripId" element={<AccommodationsPage />} />
                <Route path="/activities" element={<ActivitiesPage />} />
                <Route path="/activities/:tripId" element={<ActivitiesPage />} />
                <Route path="/budget" element={<BudgetPage />} />
                <Route path="/budget/:tripId" element={<BudgetPage />} />
                <Route path="/itinerary" element={<ItineraryPage />} />
                <Route path="/itinerary/:tripId" element={<ItineraryPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
