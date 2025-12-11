import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { MenuItem } from '../services/menuService';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SHADOWS, SPACING } from '../constants/theme';

interface MenuItemCardProps {
    item: MenuItem;
    onPress: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onPress }) => {
    const { colors, isDark } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                    ...SHADOWS.sm,
                },
            ]}
            onPress={onPress}
            activeOpacity={0.9}
            disabled={!item.available}
        >
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text
                        style={[
                            styles.name,
                            { color: isDark ? colors.textDark : colors.text },
                        ]}
                        numberOfLines={1}
                    >
                        {item.name}
                    </Text>
                    {item.popular && (
                        <View style={[styles.popularBadge, { backgroundColor: colors.warning }]}>
                            <Ionicons name="flame" size={12} color="#ffffff" />
                        </View>
                    )}
                </View>

                <Text
                    style={[
                        styles.description,
                        { color: isDark ? colors.textSecondaryDark : colors.textSecondary },
                    ]}
                    numberOfLines={2}
                >
                    {item.description}
                </Text>

                <View style={styles.footer}>
                    <Text style={[styles.price, { color: colors.primary }]}>
                        ₱{item.price.toFixed(2)}
                    </Text>

                    {!item.available && (
                        <View style={[styles.unavailableBadge, { backgroundColor: colors.error }]}>
                            <Text style={styles.unavailableText}>Unavailable</Text>
                        </View>
                    )}

                    {item.available && (
                        <TouchableOpacity
                            style={[styles.addButton, { backgroundColor: colors.primary }]}
                            onPress={onPress}
                        >
                            <Ionicons name="add" size={20} color="#ffffff" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.md,
        overflow: 'hidden',
    },
    image: {
        width: 100,
        height: 100,
    },
    content: {
        flex: 1,
        padding: SPACING.sm,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.xs,
    },
    name: {
        flex: 1,
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold,
    },
    popularBadge: {
        width: 24,
        height: 24,
        borderRadius: BORDER_RADIUS.full,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SPACING.xs,
    },
    description: {
        fontSize: FONT_SIZES.sm,
        lineHeight: 18,
        marginBottom: SPACING.xs,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.bold,
    },
    addButton: {
        width: 32,
        height: 32,
        borderRadius: BORDER_RADIUS.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unavailableBadge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.sm,
    },
    unavailableText: {
        color: '#ffffff',
        fontSize: FONT_SIZES.xs,
        fontWeight: FONT_WEIGHTS.semibold,
    },
});

export default MenuItemCard;
