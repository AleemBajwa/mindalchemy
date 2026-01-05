# Demographics & Country-Specific Crisis Resources Implementation

## ✅ Implementation Complete

### Backend Changes

1. **User Model** (`backend/app/models.py`)
   - Added demographic fields:
     - `country` (String) - Country code (e.g., 'US', 'PK', 'IN')
     - `age` (Integer) - User's age
     - `gender` (String) - Gender identity
     - `timezone` (String) - User's timezone
     - `language` (String) - Preferred language (default: 'en')

2. **Schemas** (`backend/app/schemas.py`)
   - Added `UserUpdate` schema for profile updates
   - Updated `UserBase` and `UserResponse` to include demographic fields

3. **API Endpoints** (`backend/app/api/auth.py`)
   - `PUT /api/auth/me` - Update user profile/demographics
   - Updated registration to accept demographic fields

4. **Crisis Resources Service** (`backend/app/services/crisis_resources.py`)
   - Country-specific crisis resources for:
     - **US** (United States) - 911, 988, Crisis Text Line
     - **PK** (Pakistan) - 15, Aman Foundation, Rozan
     - **IN** (India) - 112, Vandrevala, iCall, Sneha, Aasra
     - **GB** (United Kingdom) - 999, Samaritans
     - **CA** (Canada) - 911, Crisis Services Canada
     - **AU** (Australia) - 000, Lifeline, Beyond Blue

5. **Crisis API** (`backend/app/api/crisis.py`)
   - `GET /api/crisis/resources` - Get country-specific resources for current user
   - `GET /api/crisis/countries` - List available countries

6. **Database Migration** (`backend/migrate_demographics.py`)
   - Script to add demographic columns to existing database
   - Preserves existing user data

### Frontend Changes

1. **Onboarding** (`frontend/src/pages/Onboarding.jsx`)
   - Added Step 4: Demographics collection
   - Collects: Country (required), Age (optional), Gender (optional)
   - Automatically saves to user profile on completion
   - Total steps increased from 4 to 5

2. **Crisis Resources Page** (`frontend/src/pages/CrisisResources.jsx`)
   - Dynamically loads country-specific resources from API
   - Shows country name and emergency number
   - Displays country-specific hotlines and online resources
   - Premium styling with Lucide icons
   - Loading states and error handling

3. **Crisis Service** (`frontend/src/services/crisisService.js`)
   - Service for fetching country-specific crisis resources
   - Service for fetching available countries list

## 🚀 How to Use

### Database Migration

Run the migration script to add demographic fields:

```bash
python backend/migrate_demographics.py
```

This will:
- Check if columns already exist
- Add missing columns without losing data
- Verify the migration

### User Flow

1. **New User Registration**
   - User registers with email/password
   - Goes through onboarding (5 steps)
   - Step 4: Selects country (required), age (optional), gender (optional)
   - Demographics saved to profile

2. **Crisis Resources**
   - User visits Crisis Resources page
   - System loads resources based on user's country
   - Shows country-specific hotlines and emergency numbers
   - Displays relevant online resources

3. **Profile Update**
   - User can update demographics via `PUT /api/auth/me`
   - Crisis resources update automatically based on new country

## 📋 Supported Countries

- 🇺🇸 **United States (US)** - 911, 988, Crisis Text Line
- 🇵🇰 **Pakistan (PK)** - 15, Aman Foundation, Rozan
- 🇮🇳 **India (IN)** - 112, Vandrevala, iCall, Sneha, Aasra
- 🇬🇧 **United Kingdom (GB)** - 999, Samaritans
- 🇨🇦 **Canada (CA)** - 911, Crisis Services Canada
- 🇦🇺 **Australia (AU)** - 000, Lifeline, Beyond Blue

## 🔧 Technical Details

- **Default Country**: If user hasn't set country, defaults to 'US'
- **Fallback**: If country not found in resources, falls back to US resources
- **API Authentication**: All crisis resource endpoints require authentication
- **Data Privacy**: Demographic data stored securely in database

## ✨ Features

- ✅ Country-specific emergency numbers
- ✅ Country-specific crisis hotlines
- ✅ Country-specific online resources
- ✅ Premium UI with warm, cozy design
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

