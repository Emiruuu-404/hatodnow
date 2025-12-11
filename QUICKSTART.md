# 🚀 HatodNow! Quick Start

## Installation (One-Time Setup)

```bash
npm install
```

## Running the App

```bash
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator  
- `w` for web browser
- Or scan QR code with Expo Go app on your phone

## Login

Use **any email and password** to login. Select your role:
- 👤 **Customer** - Order food and track deliveries
- 🏪 **Vendor** - Manage restaurant and orders
- 🚴 **Rider** - Deliver orders and earn money

## Quick Test Flow

### As Customer:
1. Login → Select "Customer"
2. Click "Food Delivery" on home
3. Choose a restaurant (e.g., "Bigg's Diner")
4. Add "Bicol Express" to cart
5. Go to cart → Checkout → Place Order
6. Track your order!

### As Vendor:
1. Login → Select "Vendor"
2. View dashboard stats
3. Go to "Orders" tab
4. Accept pending orders
5. Update status to "Preparing" → "Ready"

### As Rider:
1. Login → Select "Rider"
2. Toggle "Online" status
3. Accept an available order
4. Update status: "On the Way" → "Delivered"
5. Check earnings!

## Folder Structure

```
src/
├── screens/     # All app screens
├── components/  # Reusable UI components
├── navigation/  # Navigation setup
├── contexts/    # State management
├── services/    # Mock data
└── constants/   # Theme & config
```

## Customization

**Change colors:** `src/constants/theme.ts`
**Add restaurants:** `src/services/restaurantService.ts`
**Add menu items:** `src/services/menuService.ts`

## Troubleshooting

**Clear cache:**
```bash
npx expo start -c
```

**Reinstall:**
```bash
rm -rf node_modules
npm install
```

## Features

✅ 3 complete apps (Customer, Vendor, Rider)
✅ 20+ screens with beautiful UI
✅ Dark/Light mode
✅ Order tracking with maps
✅ Cart management
✅ Mock data for testing
✅ TypeScript
✅ Fully functional

## Need Help?

📖 Read `README.md` for full documentation
📖 Read `SETUP.md` for detailed setup guide
📖 Read `PROJECT_SUMMARY.md` for complete overview

---

**Happy coding!** 🎉
