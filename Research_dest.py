from agents import function_tool
from dotenv import load_dotenv
load_dotenv()   
import googlemaps
import os

API_KEY = os.getenv("GOOGLE_API_KEY")
gmaps = googlemaps.Client(key=API_KEY)

@function_tool
def research_destination(destination:str) -> list[dict]:
    """
    Research top tourist attractions in the given destination using Google Places API.
    
    Args:
        destination (str): City or location name.
    Returns:
        list[dict]: List of places with name, address, rating, reviews, etc.
    """
    results = gmaps.places(query=f"Top Tourist Attractions in {destination}")
    results = results.get("results", [])
    
    # for result in results:
    #     print("Name: ", result["name"])
    #     print("Address: ", result["formatted_address"])
    #     print("Rating: ", result["rating"])
    #     print("Total Reviews: ", result["user_ratings_total"])

    return results





