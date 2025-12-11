import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { Restaurant } from '../services/restaurantService';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SHADOWS, SPACING } from '../constants/theme';

interface RestaurantCardProps {
    restaurant: Restaurant;
    onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - SPACING.lg * 2;

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onPress }) => {
    const { colors, isDark } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                    ...SHADOWS.md,
                },
            ]}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <Image source={{ uri: restaurant.image }} style={styles.image} resizeMode="cover" />

            {restaurant.featured && (
                <View style={[styles.badge, { backgroundColor: colors.secondary }]}>
                    <Ionicons name="star" size={12} color="#ffffff" />
                    <Text style={styles.badgeText}>Featured</Text>
                </View>
            )}

            {!restaurant.isOpen && (
                <View style={styles.closedOverlay}>
                    <Text style={styles.closedText}>CLOSED</Text>
                </View>
            )}

            <View style={styles.content}>
                <Text
                    style={[
                        styles.name,
                        { color: isDark ? colors.textDark : colors.text },
                    ]}
                    numberOfLines={1}
                >
                    {restaurant.name}
                </Text>

                <Text
                    style={[
                        styles.description,
                        { color: isDark ? colors.textSecondaryDark : colors.textSecondary },
                    ]}
                    numberOfLines={2}
                >
                    {restaurant.description}
                </Text>

                <View style={styles.footer}>
                    <View style={styles.infoRow}>
                        <Ionicons
                            name="star"
                            size={16}
                            color={colors.warning}
                        />
                        <Text style={[styles.infoText, { color: isDark ? colors.textDark : colors.text }]}>
                            {restaurant.rating}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons
                            name="time-outline"
                            size={16}
                            color={isDark ? colors.textSecondaryDark : colors.textSecondary}
                        />
                        <Text
                            style={[
                                styles.infoText,
                                { color: isDark ? colors.textSecondaryDark : colors.textSecondary },
                            ]}
                        >
                            {restaurant.deliveryTime}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons
                            name="location-outline"
                            size={16}
                            color={isDark ? colors.textSecondaryDark : colors.textSecondary}
                        />
                        <Text
                            style={[
                                styles.infoText,
                                { color: isDark ? colors.textSecondaryDark : colors.textSecondary },
                            ]}
                        >
                            ₱{restaurant.deliveryFee}
                        </Text>
                    </View>
                </View>

                <View style={styles.cuisineContainer}>
                    {restaurant.cuisine.slice(0, 2).map((cuisine, index) => (
                        <View
                            key={index}
                            style={[
                                styles.cuisineTag,
                                { backgroundColor: isDark ? colors.backgroundDark : colors.background },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.cuisineText,
                                    { color: isDark ? colors.textSecondaryDark : colors.textSecondary },
                                ]}
                            >
                                {cuisine}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.md,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 180,
    },
    badge: {
        position: 'absolute',
        top: SPACING.md,
        right: SPACING.md,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
        gap: 4,
    },
    badgeText: {
        color: '#ffffff',
        fontSize: FONT_SIZES.xs,
        fontWeight: FONT_WEIGHTS.semibold,
    },
    closedOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closedText: {
        color: '#ffffff',
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
    },
    content: {
        padding: SPACING.md,
    },
    name: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.bold,
        marginBottom: SPACING.xs,
    },
    description: {
        fontSize: FONT_SIZES.sm,
        marginBottom: SPACING.sm,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
        gap: SPACING.md,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    infoText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.medium,
    },
    cuisineContainer: {
        flexDirection: 'row',
        gap: SPACING.xs,
    },
    cuisineTag: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.sm,
    },
    cuisineText: {
        fontSize: FONT_SIZES.xs,
        fontWeight: FONT_WEIGHTS.medium,
    },
});

export default RestaurantCard;
