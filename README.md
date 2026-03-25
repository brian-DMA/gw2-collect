# GW2 Collect - Guild Wars 2 Collection Tracker

A Guild Wars 2 website with full API integration for tracking account progress across maps, achievements, skins, minis, and novelties.

## 🎮 Features

### Core Functionality

- **Map Pages**: Individual pages for each map (e.g., Verdant Brink) showing only that map's unlocks
- **Category Pages**: Expansion/category pages (e.g., Heart of Thorns) showing ALL unlocks from all maps in that category
- **Real-time Progress Tracking**: Uses your GW2 API key to check which items you've unlocked
- **Visual Progress Indicators**: Green checkmarks for unlocked items, red X for locked items
- **Completion Statistics**: Shows X/Y unlocked and percentage complete

### Supported Content Types

- ✨ **Skins**: Armor and weapon skins with icons from the render service
- 🐾 **Minis**: Miniature pets with their icons
- 🎭 **Novelties**: Toys, tonics, and other novelty items
- 🏆 **Achievements**: Track achievement completion

### Design

- Dark theme with amber/orange accents
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and hover effects
- Item tooltips on hover with descriptions

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Guild Wars 2 API key with appropriate permissions

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Your API Key

Open `src/services/gw2Api.js` and replace the API key with your own:

```javascript
const API_KEY = "YOUR-API-KEY-HERE";
```

**Required API Key Permissions:**

- `account` - Basic account info (always required)
- `unlocks` - Access to unlocked skins, minis, novelties
- `progression` - Access to achievement progress

### 3. Start Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## 📁 Project Structure

```
gw2collect/
├── src/
│   ├── data/
│   │   └── mapData.js          # Map and category item ID configuration
│   ├── pages/
│   │   ├── MapPage.jsx         # Individual map view
│   │   └── CategoryPage.jsx    # Category/expansion view
│   ├── services/
│   │   └── gw2Api.js           # GW2 API service wrapper
│   ├── App.jsx                 # Main app with routing and home page
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind imports
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🗺️ Adding More Maps

To add items for additional maps, edit `src/data/mapData.js`:

### Example: Adding Auric Basin Items

```javascript
auric_basin: {
  name: 'Auric Basin',
  category: 'heart_of_thorns',
  skins: [
    // Add skin IDs here from GW2 API
    5026, 5027, 5028  // Example IDs
  ],
  minis: [
    429, 430  // Example mini IDs
  ],
  novelties: [
    16  // Example novelty ID
  ],
  achievements: [
    2230, 2231, 2232  // Example achievement IDs
  ]
}
```

### Finding Item IDs

Use the GW2 API to find IDs:

- **Skins**: `https://api.guildwars2.com/v2/skins`
- **Minis**: `https://api.guildwars2.com/v2/minis`
- **Novelties**: `https://api.guildwars2.com/v2/novelties`
- **Achievements**: `https://api.guildwars2.com/v2/achievements`

You can also search by name using the API.

## 🔧 How It Works

### API Integration Flow

1. **Route Navigation**: User clicks on a map or category link
2. **Data Loading**: Component fetches item configuration from `mapData.js`
3. **Parallel API Calls**: Makes concurrent requests to:
   - Get item details (names, icons, descriptions)
   - Get account unlock status for each item type
4. **Render**: Displays items in a grid with unlock status indicators
5. **Progress Calculation**: Computes completion percentage

### API Endpoints Used

```javascript
// Item Details (no auth required)
GET /v2/skins?ids=1,2,3
GET /v2/minis?ids=1,2,3
GET /v2/novelties?ids=1,2,3
GET /v2/achievements?ids=1,2,3

// Account Progress (requires API key)
GET /v2/account/skins?access_token=YOUR_KEY
GET /v2/account/minis?access_token=YOUR_KEY
GET /v2/account/novelties?access_token=YOUR_KEY
GET /v2/account/achievements?access_token=YOUR_KEY
```

## 🎨 Customization

### Colors

Main color variables are in `src/App.jsx` CSS:

- Background: `slate-950`, `slate-900`
- Accent: `amber-500`, `amber-600`, `amber-700`
- Success: `green-500` (unlocked items)

### Fonts

Using Google Fonts:

- Display/Headings: **Cinzel** (elegant serif)
- Body: **Jost** (modern sans-serif)

Change in the `<style>` block in `App.jsx`.

## 📊 Current Data

### Heart of Thorns - Verdant Brink (Example)

- **Skins**: 22 items
  - Bladed Armor (6 pieces)
  - Ley Line Weapons (16 weapons)
- **Minis**: 2 items
- **Novelties**: 1 item
- **Achievements**: 53 items

Other HoT maps (Auric Basin, Tangled Depths, Dragon's Stand) are configured but need their item IDs added.

## 🚧 To-Do / Future Enhancements

- [ ] Add all Heart of Thorns map item IDs
- [ ] Add Path of Fire maps and items
- [ ] Add End of Dragons maps and items
- [ ] Add Living World seasons
- [ ] Add Dungeons, Fractals, Raids, Strikes
- [ ] Add user settings to save/change API key
- [ ] Add filters (show only locked/unlocked)
- [ ] Add search functionality
- [ ] Add export progress feature
- [ ] Cache API responses to reduce calls

## 🔗 Useful Links

- [GW2 API Documentation](https://wiki.guildwars2.com/wiki/API:Main)
- [API Key Management](https://account.arena.net/applications)

## ⚠️ Important Notes

### API Rate Limits

The GW2 API has rate limits (typically 600 requests per minute). This app makes batch requests to minimize API calls.

### API Key Security

**NEVER commit your API key to public repositories**. In production, you should:

- Use environment variables
- Implement backend proxy
- Use local storage with encryption

### CORS

The GW2 API supports CORS, so browser-based requests work fine. API keys are passed via query parameters to avoid preflight requests.

## 🏗️ Building for Production

```bash
npm run build
```

Built files will be in `dist/` folder. Deploy to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## 📝 License

This is a fan project for educational purposes. Guild Wars 2 and its API are © ArenaNet, LLC. Not affiliated with or endorsed by ArenaNet.

## 🙏 Credits

- Original site design inspiration: [GW2EST.com](https://gw2est.com) by WideWeb
- Guild Wars 2 API by ArenaNet
- Icons and images from GW2 Render Service
