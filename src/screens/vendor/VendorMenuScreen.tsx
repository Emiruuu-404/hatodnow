import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { getMenuByRestaurant, MenuItem } from '../../services/menuService';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';
import Button from '../../components/Button';

const VendorMenuScreen = () => {
    const { colors, isDark } = useTheme();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        loadMenu();
    }, []);

    const loadMenu = async () => {
        const data = await getMenuByRestaurant('1');
        setMenuItems(data);
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            <View style={[styles.header, { backgroundColor: isDark ? colors.surfaceDark : colors.surface }]}>
                <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
                    Menu Management
                </Text>
                <TouchableOpacity>
                    <Ionicons name="add-circle" size={32} color={colors.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {menuItems.map((item) => (
                    <View
                        key={item.id}
                        style={[
                            styles.menuCard,
                            { backgroundColor: isDark ? colors.surfaceDark : colors.surface, ...SHADOWS.sm },
                        ]}
                    >
                        <View style={styles.menuInfo}>
                            <Text style={[styles.menuName, { color: isDark ? colors.textDark : colors.text }]}>
                                {item.name}
                            </Text>
                            <Text style={[styles.menuDescription, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                {item.description}
                            </Text>
                            <Text style={[styles.menuPrice, { color: colors.primary }]}>
                                ₱{item.price.toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.menuActions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="create-outline" size={20} color={colors.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="trash-outline" size={20} color={colors.error} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: SPACING.md,
        paddingHorizontal: SPACING.lg,
    },
    headerTitle: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.bold },
    scrollContent: { padding: SPACING.lg },
    menuCard: {
        flexDirection: 'row',
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
    },
    menuInfo: { flex: 1 },
    menuName: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, marginBottom: 4 },
    menuDescription: { fontSize: FONT_SIZES.sm, marginBottom: SPACING.sm },
    menuPrice: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold },
    menuActions: { gap: SPACING.sm },
    actionButton: { padding: SPACING.sm },
});

export default VendorMenuScreen;
