# Country Expansion - Crisis Resources

## ✅ Expanded from 6 to 40 Countries!

### Why Only 6 Countries Initially?
The initial implementation included 6 countries as a starting point to:
- Establish the infrastructure and data structure
- Test the functionality with a manageable dataset
- Ensure the system works correctly before scaling

### Now Supporting 40 Countries!

#### **Americas (7 countries)**
- 🇺🇸 United States (US)
- 🇨🇦 Canada (CA)
- 🇧🇷 Brazil (BR)
- 🇲🇽 Mexico (MX)
- 🇦🇷 Argentina (AR)

#### **Europe (15 countries)**
- 🇬🇧 United Kingdom (GB)
- 🇩🇪 Germany (DE)
- 🇫🇷 France (FR)
- 🇪🇸 Spain (ES)
- 🇮🇹 Italy (IT)
- 🇳🇱 Netherlands (NL)
- 🇧🇪 Belgium (BE)
- 🇨🇭 Switzerland (CH)
- 🇸🇪 Sweden (SE)
- 🇳🇴 Norway (NO)
- 🇩🇰 Denmark (DK)
- 🇫🇮 Finland (FI)
- 🇵🇱 Poland (PL)
- 🇬🇷 Greece (GR)
- 🇵🇹 Portugal (PT)
- 🇮🇪 Ireland (IE)
- 🇷🇺 Russia (RU)

#### **Asia (12 countries)**
- 🇮🇳 India (IN)
- 🇵🇰 Pakistan (PK)
- 🇨🇳 China (CN)
- 🇯🇵 Japan (JP)
- 🇰🇷 South Korea (KR)
- 🇮🇩 Indonesia (ID)
- 🇵🇭 Philippines (PH)
- 🇹🇭 Thailand (TH)
- 🇻🇳 Vietnam (VN)
- 🇲🇾 Malaysia (MY)
- 🇸🇬 Singapore (SG)

#### **Middle East & Africa (6 countries)**
- 🇸🇦 Saudi Arabia (SA)
- 🇦🇪 United Arab Emirates (AE)
- 🇹🇷 Turkey (TR)
- 🇪🇬 Egypt (EG)
- 🇿🇦 South Africa (ZA)
- 🇳🇬 Nigeria (NG)

#### **Oceania (2 countries)**
- 🇦🇺 Australia (AU)
- 🇳🇿 New Zealand (NZ)

### Features for Each Country

Each country includes:
- ✅ Emergency services number
- ✅ Crisis/suicide prevention hotlines (where available)
- ✅ Online resources (where available)
- ✅ 24/7 availability information

### Data Sources

Crisis resources are compiled from:
- Official government emergency numbers
- International suicide prevention organizations
- National mental health associations
- Verified crisis helplines

### Future Expansion

The system is designed to easily add more countries. To add a new country:

1. Add country data to `CRISIS_RESOURCES` dictionary in `backend/app/services/crisis_resources.py`
2. Add country to `get_available_countries()` list
3. Add country to frontend `countries` array in `Onboarding.jsx`

### Coverage

- **40 countries** across 6 continents
- **Major languages** supported
- **Global reach** for crisis support
- **Localized resources** for each region

### Notes

- Some countries may have limited online resources due to language barriers or data availability
- Emergency numbers are verified but may change - users should verify locally
- Crisis hotlines are included where reliable information is available
- The system falls back to US resources if a country is not found

