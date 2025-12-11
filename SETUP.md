# HatodNow! Setup Guide

## Quick Start

Follow these steps to get HatodNow! running on your machine:

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React Native and Expo
- React Navigation
- Maps and UI libraries

### 2. Create Asset Placeholders

The app needs some placeholder images. You can use any images or create simple colored placeholders:

**Required assets (create in `assets/` folder):**
- `icon.png` (1024x1024) - App icon
- `splash.png` (1284x2778) - Splash screen
- `adaptive-icon.png` (1024x1024) - Android adaptive icon
- `favicon.png` (48x48) - Web favicon

**Quick way to create placeholders:**
You can use online tools like:
- https://placeholder.com/
- https://via.placeholder.com/
- Or any image editing software

### 3. Start the Development Server

```bash
npm start
```

This will start the Expo development server and show a QR code.

### 4. Run the App

**Option A: On Your Phone**
1. Install "Expo Go" app from App Store or Play Store
2. Scan the QR code from step 3
3. App will load on your phone

**Option B: On Emulator/Simulator**

For iOS (Mac only):
```bash
npm run ios
```

For Android:
```bash
npm run android
```

For Web:
```bash
npm run web
```

## Testing the App

### Login
- Use any email (e.g., `test@example.com`)
- Use any password (e.g., `password`)
- Select a role: Customer, Vendor, or Rider

### As a Customer:
1. Browse restaurants on the home screen
2. Click on a restaurant to view menu
3. Add items to cart
4. Proceed to checkout
5. Place an order
6. Track your order

### As a Vendor:
1. View dashboard with statistics
2. Check incoming orders
3. Update order status (Accept → Preparing → Ready)
4. Manage menu items

### As a Rider:
1. Toggle online status
2. View available orders
3. Accept an order
4. Navigate to pickup/dropoff
5. Update delivery status
6. View earnings

## Troubleshooting

### Issue: "Module not found" errors
**Solution:**
```bash
rm -rf node_modules
npm install
npx expo start -c
```

### Issue: Metro bundler won't start
**Solution:**
```bash
npx expo start -c
```

### Issue: App won't load on phone
**Solution:**
1. Make sure phone and computer are on same WiFi
2. Try using tunnel mode: `npx expo start --tunnel`

### Issue: TypeScript errors
**Solution:**
The app should work despite TypeScript warnings. If needed:
```bash
npm install --save-dev typescript@latest
```

## Project Structure Overview

```
src/
├── screens/        # All app screens
│   ├── auth/      # Login, Register, Onboarding
│   ├── customer/  # Customer app screens
│   ├── vendor/    # Vendor app screens
│   └── rider/     # Rider app screens
├── components/     # Reusable components
├── navigation/     # Navigation setup
├── contexts/       # State management
├── services/       # Mock data services
└── constants/      # Theme and constants
```

## Customization Tips

### Change Colors
Edit `src/constants/theme.ts`:
```typescript
export const COLORS = {
  primary: '#1d4ed8',    // Your primary color
  secondary: '#dc2626',   // Your secondary color
  // ...
};
```

### Add More Restaurants
Edit `src/services/restaurantService.ts` and add to `MOCK_RESTAURANTS` array.

### Add More Menu Items
Edit `src/services/menuService.ts` and add to `MOCK_MENU_ITEMS` array.

### Change Towns
Edit `src/constants/index.ts` and modify the `TOWNS` array.

## Next Steps

1. ✅ Get the app running
2. ✅ Test all three user roles
3. ✅ Explore the features
4. 🔄 Customize for your needs
5. 🔄 Connect to a real backend API
6. 🔄 Deploy to App Store/Play Store

## Need Help?

Check the main README.md for more detailed information about:
- Features
- Architecture
- Dependencies
- Future enhancements

---

Happy coding! 🚀
