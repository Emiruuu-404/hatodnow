import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../constants/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    gradient?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon,
    gradient = false,
    style,
    textStyle,
}) => {
    const { colors, isDark } = useTheme();

    const getButtonStyle = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: BORDER_RADIUS.md,
            paddingHorizontal: size === 'small' ? SPACING.md : size === 'large' ? SPACING.xl : SPACING.lg,
            paddingVertical: size === 'small' ? SPACING.sm : size === 'large' ? SPACING.md : SPACING.sm + 2,
            opacity: disabled ? 0.5 : 1,
        };

        if (fullWidth) {
            baseStyle.width = '100%';
        }

        switch (variant) {
            case 'primary':
                return { ...baseStyle, backgroundColor: colors.primary };
            case 'secondary':
                return { ...baseStyle, backgroundColor: colors.secondary };
            case 'outline':
                return {
                    ...baseStyle,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: colors.primary,
                };
            case 'ghost':
                return { ...baseStyle, backgroundColor: 'transparent' };
            default:
                return baseStyle;
        }
    };

    const getTextStyle = (): TextStyle => {
        const baseStyle: TextStyle = {
            fontSize: size === 'small' ? FONT_SIZES.sm : size === 'large' ? FONT_SIZES.lg : FONT_SIZES.md,
            fontWeight: FONT_WEIGHTS.semibold,
            marginLeft: icon ? SPACING.sm : 0,
        };

        switch (variant) {
            case 'primary':
            case 'secondary':
                return { ...baseStyle, color: '#ffffff' };
            case 'outline':
                return { ...baseStyle, color: colors.primary };
            case 'ghost':
                return { ...baseStyle, color: isDark ? colors.textDark : colors.text };
            default:
                return baseStyle;
        }
    };

    const buttonContent = (
        <>
            {loading ? (
                <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? colors.primary : '#ffffff'} />
            ) : (
                <>
                    {icon}
                    <Text style={[getTextStyle(), textStyle]}>{title}</Text>
                </>
            )}
        </>
    );

    if (gradient && variant === 'primary') {
        return (
            <TouchableOpacity onPress={onPress} disabled={disabled || loading} activeOpacity={0.8}>
                <LinearGradient
                    colors={[colors.gradientStart, colors.gradientEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[getButtonStyle(), style]}
                >
                    {buttonContent}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={[getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {buttonContent}
        </TouchableOpacity>
    );
};

export default Button;
