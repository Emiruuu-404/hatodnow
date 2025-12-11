import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
    Image,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../../components/Button';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../../constants/theme';

type OnboardingNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
    const navigation = useNavigation<OnboardingNavigationProp>();
    const { colors, isDark } = useTheme();
    const [loading, setLoading] = React.useState(false);

    // Animation Values
    const logoScale = useRef(new Animated.Value(1)).current;
    const featuresOpacity = useRef(new Animated.Value(1)).current;
    const contentTranslateY = useRef(new Animated.Value(0)).current;

    const handleGetStarted = () => {
        setLoading(true);

        // Start Animations
        Animated.parallel([
            // 1. Pulse Logo
            Animated.loop(
                Animated.sequence([
                    Animated.timing(logoScale, {
                        toValue: 1.1,
                        duration: 600,
                        useNativeDriver: true,
                        easing: Easing.inOut(Easing.ease),
                    }),
                    Animated.timing(logoScale, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                        easing: Easing.inOut(Easing.ease),
                    }),
                ])
            ),
            // 2. Fade Out Features
            Animated.timing(featuresOpacity, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
            // 3. Move Content Up slightly
            Animated.timing(contentTranslateY, {
                toValue: -30,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.out(Easing.exp),
            }),
        ]).start();

        // Simulate loading then navigate
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('Login');
            // Reset animations
            setTimeout(() => {
                logoScale.setValue(1);
                featuresOpacity.setValue(1);
                contentTranslateY.setValue(0);
            }, 500);
        }, 1500);
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

            <View style={styles.content}>
                {/* Hero / Logo Section */}
                <Animated.View
                    style={[
                        styles.logoContainer,
                        {
                            transform: [
                                { scale: logoScale },
                                { translateY: contentTranslateY }
                            ]
                        }
                    ]}
                >
                    <View style={[styles.logoCircle, { backgroundColor: colors.primaryLight + '20' }]}>
                        <Ionicons name="flash" size={80} color={colors.primary} />
                    </View>
                    <Text style={[styles.appName, { color: colors.primary }]}>HatodNow!</Text>
                    <Text style={[styles.tagline, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                        Your Bicol Delivery Partner
                    </Text>
                </Animated.View>

                {/* Features Section */}
                <Animated.View style={[styles.featuresContainer, { opacity: featuresOpacity }]}>
                    <FeatureItem
                        icon="restaurant"
                        title="Food"
                        color={colors.primary}
                        bgColor={isDark ? 'rgba(34, 197, 94, 0.15)' : colors.primary + '15'}
                        textColor={isDark ? colors.textDark : colors.text}
                    />
                    <FeatureItem
                        icon="cube"
                        title="Parcel"
                        color={colors.primary}
                        bgColor={isDark ? 'rgba(34, 197, 94, 0.15)' : colors.primary + '15'}
                        textColor={isDark ? colors.textDark : colors.text}
                    />
                    <FeatureItem
                        icon="bicycle"
                        title="Ride"
                        color={colors.primary}
                        bgColor={isDark ? 'rgba(34, 197, 94, 0.15)' : colors.primary + '15'}
                        textColor={isDark ? colors.textDark : colors.text}
                    />
                </Animated.View>

                {/* Action Section */}
                <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: contentTranslateY }] }]}>
                    <Button
                        title={loading ? "Let's Go!" : "Get Started"}
                        onPress={handleGetStarted}
                        variant="primary" // Solid Primary Color
                        size="large"
                        fullWidth
                        style={styles.button}
                        textStyle={styles.buttonText}
                        loading={loading}
                    />
                    <View style={styles.footerContainer}>
                        <Ionicons name="location" size={16} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
                        <Text style={[styles.footerText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                            Serving Sipocot with pride
                        </Text>
                        <Text style={styles.pepper}>🌶️</Text>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
};

const FeatureItem = ({ icon, title, color, bgColor, textColor }: { icon: any, title: string, color: string, bgColor: string, textColor: string }) => (
    <View style={styles.feature}>
        <View style={[styles.featureIcon, { backgroundColor: bgColor }]}>
            <Ionicons name={icon} size={32} color={color} />
        </View>
        <Text style={[styles.featureText, { color: textColor }]}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xxl * 2,
        paddingBottom: SPACING.xxl,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    appName: {
        fontSize: FONT_SIZES.xxxl + 4,
        fontWeight: '800', // Extra Bold
        marginBottom: SPACING.xs,
        letterSpacing: -1,
    },
    tagline: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.medium,
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: SPACING.xs,
    },
    feature: {
        alignItems: 'center',
        gap: SPACING.sm,
    },
    featureIcon: {
        width: 72,
        height: 72,
        borderRadius: 24, // Squircle
        justifyContent: 'center',
        alignItems: 'center',
    },
    featureText: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold,
    },
    buttonContainer: {
        gap: SPACING.md,
    },
    button: {
        borderRadius: BORDER_RADIUS.full, // Pill shape
        height: 56,
        shadowColor: 'transparent', // Flat design
        elevation: 0,
    },
    buttonText: {
        fontSize: FONT_SIZES.lg,
        fontWeight: 'bold',
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.xs,
        marginTop: SPACING.sm,
    },
    footerText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.medium,
    },
    pepper: {
        fontSize: FONT_SIZES.md,
    },
});

export default OnboardingScreen;
