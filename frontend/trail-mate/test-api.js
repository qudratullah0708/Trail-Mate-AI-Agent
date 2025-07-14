// Simple test to verify API connection with the FastAPI backend
// Run this with: node test-api.js

const testApiConnection = async () => {
  console.log('🧪 Testing TrailMate API Connection...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing health check...');
    const healthResponse = await fetch('http://127.0.0.1:8000/health');
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health check passed:', healthData);
    } else {
      console.log('❌ Health check failed:', healthResponse.status);
    }
  } catch (error) {
    console.log('❌ Health check error:', error.message);
  }

  console.log('\n');

  try {
    // Test 2: Plan Trip Endpoint
    console.log('2️⃣ Testing plan-trip endpoint...');
    const planResponse = await fetch('http://127.0.0.1:8000/plan-trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: "I want a luxury stay in Australia from Aug 20 to Aug 23 for 3 guests"
      }),
    });

    if (planResponse.ok) {
      const planData = await planResponse.json();
      console.log('✅ Plan trip endpoint working!');
      console.log('📋 Response preview:', {
        hasMessage: !!planData.message,
        messageLength: planData.message?.length || 0,
        hasPlan: !!planData.plan,
        destination: planData.plan?.destination || 'N/A'
      });
    } else {
      console.log('❌ Plan trip failed:', planResponse.status);
      const errorText = await planResponse.text();
      console.log('Error details:', errorText);
    }
  } catch (error) {
    console.log('❌ Plan trip error:', error.message);
  }

  console.log('\n🎯 Test completed! Make sure your FastAPI server is running on http://127.0.0.1:8000');
};

// Run the test
testApiConnection(); 