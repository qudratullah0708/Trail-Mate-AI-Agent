import asyncio
from agents import Agent, Runner, set_tracing_disabled
from agents.extensions.models.litellm_model import LitellmModel
from Agent_Input import extract_query_data, AccommodationRequest
from Research_dest import research_destination
from pydantic import BaseModel, ValidationError
from groq import Groq
import os
import json
from dotenv import load_dotenv
load_dotenv()
import openai

set_tracing_disabled(disabled=True)
# env variable
GROQ_API_KEY=os.getenv("GROQ_API_KEY")
MODEL=os.getenv("MODEL")
print(MODEL)

# 🔷 User input
user_query = (
    "I want a luxury stay in Paris from Aug 10 to Aug 15 for 2 guests, "
    "budget between 100 and 300 dollars per night."
)

# 🔷 Run extraction + validation
try:
   # extracted_data = extract_query_data(user_query)
    extracted_data = {
    "destination": "Paris",
    "check_in": "2025-08-10",
    "check_out": "2025-08-15",
    "guests": 2,
    "min_budget": 1000,
    "max_budget": 3000,
    "standard": "luxury"
}
    print("\n📝 Extracted JSON")
    print(json.dumps(extracted_data, indent=2))

    validated = AccommodationRequest(**extracted_data)
    print("\n✅ Validated Data:")
    print(validated.dict())

except ValidationError as e:
    print("\n❌ Validation error:\n", e)

except Exception as e:
    print("\n❌ Error:\n", e)
print("Extracted Data:", extracted_data)

destination = extracted_data["destination"]
duration = f"{extracted_data['check_in']} to {extracted_data['check_out']}"
preferences = extracted_data["standard"]
min_budget = extracted_data["min_budget"]
max_budget = extracted_data["max_budget"]
guests = extracted_data["guests"]



# Define agents
experience_planner = Agent(
    name="Experience Planner Agent",
    instructions="Plan activities for the trip.",
    tools=[research_destination]
    model=LitellmModel(model=MODEL, api_key=GROQ_API_KEY),
)

accommodation_agent = Agent(
    name="Accommodation Agent",
    instructions="Find and rank accommodation options.",
    model=LitellmModel(model=MODEL, api_key=GROQ_API_KEY),
)

budget_optimizer = Agent(
    name="Budget Optimizer Agent",
    instructions="Given an activity list and accommodation list, optimize the plan to fit within a budget.",
    model=LitellmModel(model=MODEL, api_key=GROQ_API_KEY),
)

async def main():
    print("Agents are running...")

    # Run planner & accommodation in parallel
    planner_result, accommodation_result = await asyncio.gather(
        Runner.run(experience_planner, f"{destination}, {duration}, {preferences}"),
        Runner.run(accommodation_agent, destination),
    )

    print("\n✅ Planner Output:\n", planner_result.final_output)
    print("\n✅ Accommodation Output:\n", accommodation_result.final_output)

    # Combine results & pass to Budget Optimizer
    combined_input = (
        f"Activities:\n{planner_result.final_output}\n\n"
        f"Accommodations:\n{accommodation_result.final_output}\n\n"
        "Please optimize this trip plan to fit a reasonable budget."
    )

    budget_result = await Runner.run(budget_optimizer, combined_input)

    print("\n✅ Final Budget-Optimized Plan:\n", budget_result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
