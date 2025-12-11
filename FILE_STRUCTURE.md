# 📁 HatodNow! Complete File Tree

```
hatodnow/
│
├── 📱 App.tsx                          # Main app entry point
├── 📋 app.json                         # Expo configuration
├── 📦 package.json                     # Dependencies
├── ⚙️ tsconfig.json                    # TypeScript config
├── ⚙️ babel.config.js                  # Babel config
├── 🚫 .gitignore                       # Git ignore rules
│
├── 📚 README.md                        # Full documentation
├── 📚 SETUP.md                         # Setup instructions
├── 📚 PROJECT_SUMMARY.md               # Complete overview
├── 📚 QUICKSTART.md                    # Quick reference
│
├── 🖼️ assets/                          # Images and assets
│   └── README.md                       # Asset instructions
│
└── 📂 src/                             # Source code
    │
    ├── 🎨 components/                  # Reusable UI components
    │   ├── Button.tsx                  # Custom button component
    │   ├── RestaurantCard.tsx          # Restaurant display card
    │   └── MenuItemCard.tsx            # Menu item display card
    │
    ├── ⚙️ constants/                   # App constants
    │   ├── index.ts                    # General constants (towns, services, etc.)
    │   └── theme.ts                    # Theme constants (colors, spacing, fonts)
    │
    ├── 🔄 contexts/                    # React Context providers
    │   ├── AuthContext.tsx             # Authentication state
    │   ├── CartContext.tsx             # Shopping cart state
    │   └── ThemeContext.tsx            # Dark/Light mode state
    │
    ├── 🧭 navigation/                  # Navigation configuration
    │   ├── RootNavigator.tsx           # Main navigation router
    │   ├── CustomerTabNavigator.tsx    # Customer bottom tabs
    │   ├── VendorTabNavigator.tsx      # Vendor bottom tabs
    │   └── RiderTabNavigator.tsx       # Rider bottom tabs
    │
    ├── 📱 screens/                     # All app screens
    │   │
    │   ├── 🔐 auth/                    # Authentication screens
    │   │   ├── OnboardingScreen.tsx    # Welcome/intro screen
    │   │   ├── LoginScreen.tsx         # Login with role selection
    │   │   └── RegisterScreen.tsx      # Registration form
    │   │
    │   ├── 👤 customer/                # Customer app screens
    │   │   ├── HomeScreen.tsx          # Main home with services
    │   │   ├── RestaurantListScreen.tsx # Browse restaurants
    │   │   ├── RestaurantDetailScreen.tsx # Menu & ordering
    │   │   ├── CartScreen.tsx          # Shopping cart
    │   │   ├── CheckoutScreen.tsx      # Checkout flow
    │   │   ├── OrdersScreen.tsx        # Order history
    │   │   ├── OrderTrackingScreen.tsx # Real-time tracking
    │   │   └── ProfileScreen.tsx       # User profile
    │   │
    │   ├── 🏪 vendor/                  # Vendor app screens
    │   │   ├── VendorDashboardScreen.tsx # Stats & overview
    │   │   ├── VendorOrdersScreen.tsx  # Order management
    │   │   ├── VendorMenuScreen.tsx    # Menu management
    │   │   └── VendorProfileScreen.tsx # Vendor settings
    │   │
    │   └── 🚴 rider/                   # Rider app screens
    │       ├── RiderHomeScreen.tsx     # Available orders
    │       ├── RiderDeliveryScreen.tsx # Delivery navigation
    │       ├── RiderEarningsScreen.tsx # Earnings tracking
    │       └── RiderProfileScreen.tsx  # Rider profile
    │
    └── 🔧 services/                    # Data services (Mock APIs)
        ├── restaurantService.ts        # Restaurant data & operations
        ├── menuService.ts              # Menu items data & operations
        └── orderService.ts             # Order management & operations
```

## 📊 File Count by Category

| Category | Count | Description |
|----------|-------|-------------|
| **Screens** | 20 | All UI screens |
| **Components** | 3 | Reusable UI components |
| **Navigation** | 4 | Navigation setup |
| **Contexts** | 3 | State management |
| **Services** | 3 | Mock data services |
| **Constants** | 2 | Theme & config |
| **Config Files** | 5 | Project configuration |
| **Documentation** | 5 | README, guides, etc. |
| **TOTAL** | **45+** | Core project files |

## 🎯 Key Files to Know

### For Customization:
- `src/constants/theme.ts` - Change colors, spacing, fonts
- `src/services/restaurantService.ts` - Add/edit restaurants
- `src/services/menuService.ts` - Add/edit menu items
- `src/constants/index.ts` - Change towns, services

### For Understanding:
- `App.tsx` - App entry point
- `src/navigation/RootNavigator.tsx` - Navigation logic
- `src/contexts/AuthContext.tsx` - How auth works
- `src/contexts/CartContext.tsx` - How cart works

### For Development:
- `package.json` - Dependencies
- `app.json` - Expo configuration
- `tsconfig.json` - TypeScript settings

## 🔍 Quick File Finder

**Need to change...?**

- **App name/branding** → `app.json`
- **Colors** → `src/constants/theme.ts`
- **Restaurants** → `src/services/restaurantService.ts`
- **Menu items** → `src/services/menuService.ts`
- **Towns** → `src/constants/index.ts`
- **Login logic** → `src/contexts/AuthContext.tsx`
- **Cart logic** → `src/contexts/CartContext.tsx`
- **Home screen** → `src/screens/customer/HomeScreen.tsx`
- **Order flow** → `src/services/orderService.ts`

## 📝 File Naming Conventions

- **Screens**: `ScreenName` + `Screen.tsx` (e.g., `HomeScreen.tsx`)
- **Components**: `ComponentName.tsx` (e.g., `Button.tsx`)
- **Services**: `serviceName` + `Service.ts` (e.g., `orderService.ts`)
- **Contexts**: `ContextName` + `Context.tsx` (e.g., `AuthContext.tsx`)
- **Constants**: Lowercase (e.g., `theme.ts`, `index.ts`)

## 🎨 Code Organization

Each screen follows this pattern:
```typescript
1. Imports (React, navigation, components, etc.)
2. Type definitions
3. Component definition
4. Styles (StyleSheet.create)
5. Export
```

Each service follows this pattern:
```typescript
1. Type definitions (interfaces)
2. Mock data constants
3. Service functions (async)
4. Export
```

---

**Navigate with confidence!** 🗺️
