"""
Vercel Serverless Entry Point for FastAPI

This file exposes the FastAPI `app` from the backend so that Vercel's
Python runtime can serve it directly as an ASGI application.
"""
import os
import sys

# Ensure the backend package is on the Python path
backend_path = os.path.join(os.path.dirname(__file__), "..", "backend")
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

# Import the FastAPI app from our backend
from app.main import app as fastapi_app  # type: ignore

# Vercel expects an ASGI/W.SGI-compatible callable.
# We re-export the FastAPI app under the name `app`.
app = fastapi_app


