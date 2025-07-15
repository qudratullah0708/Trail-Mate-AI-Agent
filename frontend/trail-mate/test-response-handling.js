// Test script to verify response handling for different query types
// Run this with: node test-response-handling.js

// Use the same endpoint strategy as the main app
const API_ENDPOINTS = [
  'https://trail-mate-ai-agent-7sgi.vercel.app',
  'http://127.0.0.1:8000'
];

// Helper function to try multiple API endpoints (same as main app)
async function tryApiEndpoints(endpoint, options) {
  let lastError = null;
  
  for (const baseUrl of API_ENDPOINTS) {
    try {
      console.log(`Trying API endpoint: ${baseUrl}${endpoint}`);
      const response = await fetch(`${baseUrl}${endpoint}`, options);
      
      if (response.ok) {
        console.log(`✅ Success with endpoint: ${baseUrl}${endpoint}`);
        return response;
      }
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      console.warn(`❌ Failed with endpoint ${baseUrl}${endpoint}:`, error.message);
      lastError = error;
      continue;
    }
  }
  
  throw lastError || new Error('All API endpoints failed');
}

const testResponseHandling = async () => {
  console.log('🧪 Testing Response Handling with Multi-Endpoint Support...\n');

  const testQueries = [
    {
      name: "General Info Query",
      query: "hi",
      expectedIntent: "general_info"
    },
    {
      name: "Trip Planning Query", 
      query: "I want to visit Paris from March 5-12 for 2 people with a budget of $2000-4000",
      expectedIntent: "trip_planning"
    }
  ];

  for (const test of testQueries) {
    console.log(`\n🔍 Testing: ${test.name}`);
    console.log(`Query: "${test.query}"`);
    
    try {
      const response = await tryApiEndpoints('/plan-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: test.query
        }),
      });

      const data = await response.json();
      console.log(`✅ Intent: ${data.intent}`);
      
      if (data.intent === 'general_info') {
        console.log(`📝 Response: ${data.response?.substring(0, 100)}...`);
      } else if (data.intent === 'trip_planning') {
        console.log(`📋 Has extracted data: ${!!data.extracted_data}`);
        console.log(`🏨 Has accommodation: ${!!data.accommodation}`);
        console.log(`🎯 Has activities: ${!!data.activities}`);
        console.log(`💰 Has optimized plan: ${!!data.optimized_plan}`);
      }
      
      console.log(`✅ ${test.name} - SUCCESS`);
    } catch (error) {
      console.log(`❌ ${test.name} - Failed on all endpoints: ${error.message}`);
    }
  }

  console.log('\n🎯 Test completed!');
  console.log('\n📝 Expected Frontend Behavior:');
  console.log('- "hi" → Immediate response, no agent simulation');
  console.log('- Trip planning query → 5-second agent simulation + trip plan');
};

// Run the test
testResponseHandling(); 