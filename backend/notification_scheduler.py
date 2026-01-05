"""
Notification Scheduler Script
Run this periodically (e.g., via cron job) to check and send notifications

Usage:
    python notification_scheduler.py

Or set up a cron job:
    # Run every minute
    * * * * * cd /path/to/backend && python notification_scheduler.py
"""
import sys
import os
import requests
import logging

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# API URL (adjust if needed)
API_URL = os.getenv('API_URL', 'http://localhost:8000')

def check_and_send_notifications():
    """Call the notification check endpoint"""
    try:
        url = f"{API_URL}/api/notifications/check-and-send"
        response = requests.post(url, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            logger.info(f"Notification check completed: {data.get('message', 'Success')}")
            return True
        else:
            logger.error(f"Notification check failed: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        logger.error(f"Error checking notifications: {e}", exc_info=True)
        return False

if __name__ == "__main__":
    logger.info("Starting notification scheduler check...")
    success = check_and_send_notifications()
    sys.exit(0 if success else 1)

