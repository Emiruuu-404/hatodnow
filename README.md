# HatodNow! - React Native Delivery App

A fully functional React Native application for food delivery, parcel delivery, and ride booking services localized for Camarines Sur, Philippines.

## 🚀 Features

### Customer App
- **Service Selection**: Food Delivery, Parcel Delivery, Ride Booking
- **Restaurant Browsing**: Browse by town, filter by ratings, featured restaurants
- **Menu & Ordering**: View menus, select variants, add special instructions
- **Cart Management**: Add/remove items, update quantities
- **Order Tracking**: Real-time order status with map tracking
- **Order History**: View past and active orders
- **User Profile**: Manage account settings, dark mode

### Vendor App
- **Dashboard**: Overview of orders, revenue, and statistics
- **Order Management**: Accept orders, update preparation status
- **Menu Management**: Add, edit, and manage menu items
- **Store Settings**: Configure store information

### Rider App
- **Available Orders**: View and accept delivery orders
- **Delivery Navigation**: Map-based navigation to pickup and dropoff
- **Earnings Tracking**: View daily, weekly, and monthly earnings
- **Online/Offline Toggle**: Control availability status

## 📱 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6 (Stack + Bottom Tabs)
- **State Management**: React Context API
- **Storage**: AsyncStorage
- **Maps**: React Native Maps
- **UI Components**: Custom components with Expo Linear Gradient
- **Icons**: Expo Vector Icons (Ionicons)

## 🎨 Design Features

- **Theme**: Bicol Blue (#1d4ed8) and Fiery Red (#dc2626)
- **Dark/Light Mode**: Automatic system preference detection
- **Responsive UI**: Mobile-optimized layouts
- **Animations**: Smooth transitions and gradient effects
- **Modern UI**: Rounded cards, soft shadows, icon-based navigation

## 📂 Project Structure

```
hatodnow/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── RestaurantCard.tsx
│   │   └── MenuItemCard.tsx
│   ├── constants/           # App constants and theme
│   │   ├── index.ts
│   │   └── theme.ts
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   └── ThemeContext.tsx
│   ├── navigation/          # Navigation configuration
│   │   ├── RootNavigator.tsx
│   │   ├── CustomerTabNavigator.tsx
│   │   ├── VendorTabNavigator.tsx
│   │   └── RiderTabNavigator.tsx
│   ├── screens/             # App screens
│   │   ├── auth/           # Authentication screens
│   │   ├── customer/       # Customer app screens
│   │   ├── vendor/         # Vendor app screens
│   │   └── rider/          # Rider app screens
│   ├── services/            # API/Data services
│   │   ├── restaurantService.ts
│   │   ├── menuService.ts
│   │   └── orderService.ts
│   └── utils/              # Utility functions
├── assets/                  # Images, fonts, etc.
├── App.tsx                  # Main app entry point
├── app.json                 # Expo configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
└── babel.config.js          # Babel configuration
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start the Development Server

```bash
npm start
```

### Step 3: Run on Device/Emulator

**For iOS:**
```bash
npm run ios
```

**For Android:**
```bash
npm run android
```

**For Web:**
```bash
npm run web
```

## 📱 Using the App

### Login Credentials (Mock)
You can login with any email and password. Select your role:
- **Customer**: Browse restaurants and place orders
- **Vendor**: Manage restaurant and orders
- **Rider**: Accept and deliver orders

### Sample Data
The app includes mock data for:
- 8 restaurants across Camarines Sur towns
- Menu items with Bicol specialties (Bicol Express, Laing, etc.)
- Sample orders for testing

## 🌍 Camarines Sur Towns Supported

- Naga City
- Sipocot
- Libmanan
- Pili
- Pamplona
- Iriga City
- Nabua
- Bula
- Baao
- Calabanga

## 🎯 Key Features Implementation

### Authentication
- Role-based login (Customer/Vendor/Rider)
- AsyncStorage for session persistence
- Auto-login on app restart

### Order Flow
1. Customer browses restaurants
2. Adds items to cart
3. Proceeds to checkout
4. Places order
5. Vendor receives and prepares order
6. Rider picks up and delivers
7. Customer tracks in real-time

### Real-time Updates (Simulated)
- Order status updates
- Delivery tracking
- Rider location (mock)

## 🎨 Customization

### Colors
Edit `src/constants/theme.ts` to change the color scheme:
```typescript
export const COLORS = {
  primary: '#1d4ed8',    // Bicol Blue
  secondary: '#dc2626',   // Fiery Red
  // ... more colors
};
```

### Mock Data
Edit service files in `src/services/` to modify:
- Restaurants
- Menu items
- Towns
- Order data

## 📦 Dependencies

```json
{
  "expo": "~51.0.0",
  "react": "18.2.0",
  "react-native": "0.74.0",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "react-native-maps": "1.14.0",
  "expo-linear-gradient": "~13.0.2",
  "@expo/vector-icons": "^14.0.0"
}
```

## 🚧 Future Enhancements

- [ ] Real backend API integration
- [ ] Push notifications
- [ ] Payment gateway integration
- [ ] Chat support
- [ ] Reviews and ratings
- [ ] Promo codes and vouchers
- [ ] Multiple payment methods
- [ ] Advanced order filtering
- [ ] Analytics dashboard

## 📄 License

This project is created for demonstration purposes.

## 👨‍💻 Developer

Built with ❤️ for Camarines Sur

---

## 🆘 Troubleshooting

### Common Issues

**1. Metro bundler issues:**
```bash
npx expo start -c
```

**2. Module not found errors:**
```bash
rm -rf node_modules
npm install
```

**3. iOS build issues:**
```bash
cd ios && pod install && cd ..
```

**4. Android build issues:**
```bash
cd android && ./gradlew clean && cd ..
```

## 📞 Support

For issues or questions, please check the documentation or create an issue in the repository.

---

**HatodNow!** - Bringing Camarines Sur closer, one delivery at a time! 🌶️🚴‍♂️
