import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_ROLES } from '../constants';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: keyof typeof USER_ROLES;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string, role: keyof typeof USER_ROLES) => Promise<void>;
    register: (name: string, email: string, phone: string, password: string, role: keyof typeof USER_ROLES) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Failed to load user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string, role: keyof typeof USER_ROLES) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockUser: User = {
                id: Math.random().toString(36).substr(2, 9),
                name: email.split('@')[0],
                email,
                phone: '+63 912 345 6789',
                role,
            };

            await AsyncStorage.setItem('user', JSON.stringify(mockUser));
            setUser(mockUser);
        } catch (error) {
            throw new Error('Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, email: string, phone: string, password: string, role: keyof typeof USER_ROLES) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockUser: User = {
                id: Math.random().toString(36).substr(2, 9),
                name,
                email,
                phone,
                role,
            };

            await AsyncStorage.setItem('user', JSON.stringify(mockUser));
            setUser(mockUser);
        } catch (error) {
            throw new Error('Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const updateProfile = async (data: Partial<User>) => {
        if (!user) return;

        const updatedUser = { ...user, ...data };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
