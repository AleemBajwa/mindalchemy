"""
Vercel Serverless Function Handler for FastAPI
This file handles all API routes for the backend on Vercel
"""
import sys
import os

# Add backend directory to Python path
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend')
sys.path.insert(0, backend_path)

from mangum import Mangum
from app.main import app

# Create ASGI handler for Vercel
handler = Mangum(app, lifespan="off")

