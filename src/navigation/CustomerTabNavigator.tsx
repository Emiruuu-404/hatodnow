import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

// Customer Screens
import HomeScreen from '../screens/customer/HomeScreen';
import RestaurantListScreen from '../screens/customer/RestaurantListScreen';
import RestaurantDetailScreen from '../screens/customer/RestaurantDetailScreen';
import CartScreen from '../screens/customer/CartScreen';
import CheckoutScreen from '../screens/customer/CheckoutScreen';
import OrdersScreen from '../screens/customer/OrdersScreen';
import OrderTrackingScreen from '../screens/customer/OrderTrackingScreen';
import ProfileScreen from '../screens/customer/ProfileScreen';

export type CustomerTabParamList = {
    Home: undefined;
    Orders: undefined;
    Profile: undefined;
};

export type CustomerStackParamList = {
    HomeTab: undefined;
    RestaurantList: { service: string; town?: string };
    RestaurantDetail: { restaurantId: string };
    Cart: undefined;
    Checkout: undefined;
    OrderTracking: { orderId: string };
};

const Tab = createBottomTabNavigator<CustomerTabParamList>();
const Stack = createStackNavigator<CustomerStackParamList>();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTab" component={HomeScreen} />
            <Stack.Screen name="RestaurantList" component={RestaurantListScreen} />
            <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
        </Stack.Navigator>
    );
};

const CustomerTabNavigator = () => {
    const { colors, isDark } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Orders') {
                        iconName = focused ? 'receipt' : 'receipt-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: isDark ? colors.textSecondaryDark : colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                    borderTopColor: isDark ? colors.borderDark : colors.border,
                    paddingBottom: 5,
                    paddingTop: 5,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Orders" component={OrdersScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default CustomerTabNavigator;
