import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

// Vendor Screens
import VendorDashboardScreen from '../screens/vendor/VendorDashboardScreen';
import VendorOrdersScreen from '../screens/vendor/VendorOrdersScreen';
import VendorMenuScreen from '../screens/vendor/VendorMenuScreen';
import VendorProfileScreen from '../screens/vendor/VendorProfileScreen';

export type VendorTabParamList = {
    Dashboard: undefined;
    VendorOrders: undefined;
    Menu: undefined;
    VendorProfile: undefined;
};

const Tab = createBottomTabNavigator<VendorTabParamList>();

const VendorTabNavigator = () => {
    const { colors, isDark } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'grid' : 'grid-outline';
                    } else if (route.name === 'VendorOrders') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Menu') {
                        iconName = focused ? 'restaurant' : 'restaurant-outline';
                    } else if (route.name === 'VendorProfile') {
                        iconName = focused ? 'settings' : 'settings-outline';
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
                name="Dashboard"
                component={VendorDashboardScreen}
                options={{ tabBarLabel: 'Dashboard' }}
            />
            <Tab.Screen
                name="VendorOrders"
                component={VendorOrdersScreen}
                options={{ tabBarLabel: 'Orders' }}
            />
            <Tab.Screen
                name="Menu"
                component={VendorMenuScreen}
                options={{ tabBarLabel: 'Menu' }}
            />
            <Tab.Screen
                name="VendorProfile"
                component={VendorProfileScreen}
                options={{ tabBarLabel: 'Settings' }}
            />
        </Tab.Navigator>
    );
};

export default VendorTabNavigator;
