import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { getOrdersByRestaurant, Order } from '../../services/orderService';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS, COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - (SPACING.lg * 2) - SPACING.md) / 2;

const VendorDashboardScreen = () => {
    const { colors, isDark } = useTheme();
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        // Mock data loading fallback if service returns empty
        const data = await getOrdersByRestaurant('1');
        setOrders(data);
    };

    const stats = [
        { label: 'Today Orders', value: '12', icon: 'receipt', color: colors.primary, bg: colors.primary + '15' },
        { label: 'Revenue', value: '₱2,450', icon: 'cash', color: colors.success, bg: colors.success + '15' },
        { label: 'Pending', value: '3', icon: 'time', color: colors.warning, bg: colors.warning + '15' },
        { label: 'Completed', value: '9', icon: 'checkmark-circle', color: colors.info, bg: colors.info + '15' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            {/* Header Section */}
            <View style={[styles.header, { backgroundColor: isDark ? colors.surfaceDark : colors.surface, borderBottomColor: isDark ? colors.borderDark : colors.border }]}>
                <View style={styles.headerProfileContainer}>
                    <View style={[styles.profileButton, { backgroundColor: colors.primary + '20' }]}>
                        <Ionicons name="storefront" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={[styles.headerSubtitle, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                            Welcome back,
                        </Text>
                        <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
                            {user?.name || 'Vendor Admin'} 👋
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons name="notifications-outline" size={24} color={isDark ? colors.textDark : colors.text} />
                    <View style={[styles.badge, { backgroundColor: colors.error }]} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <View
                            key={index}
                            style={[
                                styles.statCard,
                                {
                                    backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                                    width: CARD_WIDTH,
                                    borderColor: isDark ? colors.borderDark : colors.border,
                                    ...SHADOWS.sm,
                                },
                            ]}
                        >
                            <View style={[styles.statIcon, { backgroundColor: stat.bg }]}>
                                <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                            </View>
                            <View>
                                <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                                    {stat.value}
                                </Text>
                                <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                    {stat.label}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Quick Actions */}
                <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
                    Quick Actions
                </Text>
                <View style={styles.actionGrid}>
                    <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.primary }]}>
                        <Ionicons name="add-circle-outline" size={28} color="#fff" />
                        <Text style={styles.actionText}>Add Item</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.secondary }]}>
                        <Ionicons name="restaurant-outline" size={28} color="#fff" />
                        <Text style={styles.actionText}>Edit Menu</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Orders */}
                <View style={[styles.section, { backgroundColor: isDark ? colors.surfaceDark : colors.surface, ...SHADOWS.sm }]}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { marginBottom: 0, color: isDark ? colors.textDark : colors.text }]}>
                            Recent Orders
                        </Text>
                        <TouchableOpacity>
                            <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {orders.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={{ color: isDark ? colors.textSecondaryDark : colors.textSecondary }}>No recent orders</Text>
                        </View>
                    ) : (
                        orders.slice(0, 5).map((order, i) => (
                            <View
                                key={order.id}
                                style={[
                                    styles.orderItem,
                                    {
                                        borderBottomWidth: i === orders.length - 1 ? 0 : 1,
                                        borderBottomColor: isDark ? colors.borderDark : colors.border
                                    },
                                ]}
                            >
                                <View style={styles.orderInfo}>
                                    <View style={[styles.orderIcon, { backgroundColor: colors.primary + '15' }]}>
                                        <Ionicons name="receipt-outline" size={20} color={colors.primary} />
                                    </View>
                                    <View>
                                        <Text style={[styles.orderId, { color: isDark ? colors.textDark : colors.text }]}>
                                            Order #{order.id}
                                        </Text>
                                        <Text style={[styles.orderTime, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • 2 items
                                        </Text>
                                    </View>
                                </View>
                                <View style={[
                                    styles.statusBadge,
                                    {
                                        backgroundColor:
                                            order.status === 'COMPLETED' ? colors.success + '15' :
                                                order.status === 'PENDING' ? colors.warning + '15' :
                                                    colors.info + '15'
                                    }
                                ]}>
                                    <Text style={[
                                        styles.statusText,
                                        {
                                            color:
                                                order.status === 'COMPLETED' ? colors.success :
                                                    order.status === 'PENDING' ? colors.warning :
                                                        colors.info
                                        }
                                    ]}>
                                        {order.status}
                                    </Text>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        paddingTop: Platform.OS === 'android' ? 30 : 20, // Balanced padding
        paddingBottom: SPACING.md, // Balanced with top
        paddingHorizontal: SPACING.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    headerProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    headerTextContainer: {
        justifyContent: 'center',
    },
    headerTitle: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold },
    headerSubtitle: { fontSize: FONT_SIZES.sm, marginBottom: 2 },
    profileButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationButton: {
        position: 'relative',
        padding: 4,
    },
    badge: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 8,
        height: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#fff',
    },
    scrollContent: { padding: SPACING.lg },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: SPACING.xl,
    },
    statCard: {
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md, // Add margin bottom for spacing when wrapped row
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        minHeight: 80,
    },
    statIcon: {
        width: 48,
        height: 48,
        borderRadius: BORDER_RADIUS.full,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statValue: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold },
    statLabel: { fontSize: FONT_SIZES.xs },

    // Actions
    actionGrid: {
        flexDirection: 'row',
        gap: SPACING.md,
        marginBottom: SPACING.xl,
    },
    actionCard: {
        flex: 1,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.sm,
        ...SHADOWS.sm,
    },
    actionText: {
        color: '#fff',
        fontWeight: FONT_WEIGHTS.semibold,
        fontSize: FONT_SIZES.md,
    },

    // Recent Orders Section
    section: {
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    sectionTitle: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, marginBottom: SPACING.md },
    seeAllText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold },
    emptyState: { padding: SPACING.lg, alignItems: 'center' },

    // Order Item
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.md,
    },
    orderInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    orderIcon: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderId: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold },
    orderTime: { fontSize: FONT_SIZES.xs },
    statusBadge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.full,
    },
    statusText: { fontSize: 10, fontWeight: FONT_WEIGHTS.bold, textTransform: 'uppercase' },
});

export default VendorDashboardScreen;
