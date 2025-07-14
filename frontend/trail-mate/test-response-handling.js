// Test script to verify response handling for different query types
// Run this with: node test-response-handling.js

const testResponseHandling = async () => {
  console.log('🧪 Testing Response Handling...\n');

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
      const response = await fetch('http://127.0.0.1:8000/plan-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: test.query
        }),
      });

      if (response.ok) {
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
      } else {
        console.log(`❌ ${test.name} - HTTP ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${test.name} - ERROR: ${error.message}`);
    }
  }

  console.log('\n🎯 Test completed!');
  console.log('\n📝 Expected Frontend Behavior:');
  console.log('- "hi" → Immediate response, no agent simulation');
  console.log('- Trip planning query → 5-second agent simulation + trip plan');
};

// Run the test
testResponseHandling(); 