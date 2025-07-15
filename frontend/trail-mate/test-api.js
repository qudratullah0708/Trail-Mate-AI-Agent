// Simple test to verify API connection with the FastAPI backend
// Run this with: node test-api.js

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

const testApiConnection = async () => {
  console.log('🧪 Testing TrailMate API Connection with Multi-Endpoint Support...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing health check...');
    const healthResponse = await tryApiEndpoints('/health', {
      method: 'GET'
    });
    
    const healthData = await healthResponse.json();
    console.log('✅ Health check passed:', healthData);
  } catch (error) {
    console.log('❌ Health check failed on all endpoints:', error.message);
  }

  console.log('\n');

  try {
    // Test 2: Plan Trip Endpoint
    console.log('2️⃣ Testing plan-trip endpoint...');
    const planResponse = await tryApiEndpoints('/plan-trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: "I want a luxury stay in Australia from Aug 20 to Aug 23 for 3 guests"
      }),
    });

    const planData = await planResponse.json();
    console.log('✅ Plan trip endpoint working!');
    console.log('📋 Response preview:', {
      hasMessage: !!planData.message,
      messageLength: planData.message?.length || 0,
      hasPlan: !!planData.plan,
      destination: planData.plan?.destination || 'N/A'
    });
  } catch (error) {
    console.log('❌ Plan trip error:', error.message);
  }

  console.log('\n🎯 Test completed! Make sure your FastAPI server is running on http://127.0.0.1:8000');
};

// Run the test
testApiConnection(); 