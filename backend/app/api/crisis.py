"""
Crisis Resources API Routes
"""
from fastapi import APIRouter, Depends
from app.api.auth import get_current_user
from app.models import User
from app.services.crisis_resources import get_crisis_resources, get_available_countries

router = APIRouter()

@router.get("/resources")
async def get_crisis_resources_for_user(current_user: User = Depends(get_current_user)):
    """Get country-specific crisis resources for the current user"""
    country_code = current_user.country or 'US'  # Default to US if not set
    resources = get_crisis_resources(country_code)
    return {
        "country": country_code,
        "country_name": next((c['name'] for c in get_available_countries() if c['code'] == country_code), 'United States'),
        **resources
    }

@router.get("/countries")
async def get_countries():
    """Get list of available countries"""
    return {"countries": get_available_countries()}

