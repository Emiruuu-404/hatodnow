export const COLORS = {
    // Brand Colors
    primary: '#22c55e', // Deli Green
    primaryDark: '#16a34a',
    primaryLight: '#4ade80',

    secondary: '#f97316', // Orange Accent
    secondaryDark: '#ea580c',
    secondaryLight: '#fb923c',

    // Neutral Colors
    background: '#ffffff',
    backgroundDark: '#1f2937',
    surface: '#f3f4f6',
    surfaceDark: '#374151',

    // Text Colors
    text: '#111827',
    textSecondary: '#6b7280',
    textDark: '#f9fafb',
    textSecondaryDark: '#9ca3af',

    // Status Colors
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // UI Colors
    border: '#e5e7eb',
    borderDark: '#4b5563',
    disabled: '#d1d5db',
    overlay: 'rgba(0, 0, 0, 0.5)',

    // Gradients (Updated to Green/Light Green)
    gradientStart: '#22c55e',
    gradientEnd: '#15803d',
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const FONT_SIZES = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
};

export const FONT_WEIGHTS = {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
};

export const BORDER_RADIUS = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
};

import { Platform } from 'react-native';

// ... existing code ...

const isWeb = Platform.OS === 'web';

export const SHADOWS = {
    sm: isWeb
        ? { boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)' }
        : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
    md: isWeb
        ? { boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }
        : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
        },
    lg: isWeb
        ? { boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)' }
        : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 8,
        },
};
