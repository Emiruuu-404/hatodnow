import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

// Rider Screens
import RiderHomeScreen from '../screens/rider/RiderHomeScreen';
import RiderDeliveryScreen from '../screens/rider/RiderDeliveryScreen';
import RiderEarningsScreen from '../screens/rider/RiderEarningsScreen';
import RiderProfileScreen from '../screens/rider/RiderProfileScreen';

export type RiderTabParamList = {
    RiderHome: undefined;
    Earnings: undefined;
    RiderProfile: undefined;
};

export type RiderStackParamList = {
    RiderHomeTab: undefined;
    Delivery: { orderId: string };
};

const Tab = createBottomTabNavigator<RiderTabParamList>();
const Stack = createStackNavigator<RiderStackParamList>();

const RiderHomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="RiderHomeTab" component={RiderHomeScreen} />
            <Stack.Screen name="Delivery" component={RiderDeliveryScreen} />
        </Stack.Navigator>
    );
};

const RiderTabNavigator = () => {
    const { colors, isDark } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';

                    if (route.name === 'RiderHome') {
                        iconName = focused ? 'bicycle' : 'bicycle-outline';
                    } else if (route.name === 'Earnings') {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    } else if (route.name === 'RiderProfile') {
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
            <Tab.Screen
                name="RiderHome"
                component={RiderHomeStack}
                options={{ tabBarLabel: 'Orders' }}
            />
            <Tab.Screen name="Earnings" component={RiderEarningsScreen} />
            <Tab.Screen
                name="RiderProfile"
                component={RiderProfileScreen}
                options={{ tabBarLabel: 'Profile' }}
            />
        </Tab.Navigator>
    );
};

export default RiderTabNavigator;
