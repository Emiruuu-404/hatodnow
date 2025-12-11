import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

// Auth Screens
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Customer Screens
import CustomerTabNavigator from './CustomerTabNavigator';

// Vendor Screens
import VendorTabNavigator from './VendorTabNavigator';

// Rider Screens
import RiderTabNavigator from './RiderTabNavigator';

export type RootStackParamList = {
    Onboarding: undefined;
    Login: undefined;
    Register: undefined;
    CustomerApp: undefined;
    VendorApp: undefined;
    RiderApp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return null; // Or a loading screen
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
                <>
                    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
            ) : (
                <>
                    {user?.role === 'CUSTOMER' && (
                        <Stack.Screen name="CustomerApp" component={CustomerTabNavigator} />
                    )}
                    {user?.role === 'VENDOR' && (
                        <Stack.Screen name="VendorApp" component={VendorTabNavigator} />
                    )}
                    {user?.role === 'RIDER' && (
                        <Stack.Screen name="RiderApp" component={RiderTabNavigator} />
                    )}
                </>
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
