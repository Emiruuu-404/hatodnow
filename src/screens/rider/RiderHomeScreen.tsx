import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { RiderStackParamList } from '../../navigation/RiderTabNavigator';
import { getAvailableOrders, assignRiderToOrder, Order } from '../../services/orderService';
import Button from '../../components/Button';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';

type RiderHomeNavigationProp = StackNavigationProp<RiderStackParamList, 'RiderHomeTab'>;

const RiderHomeScreen = () => {
    const navigation = useNavigation<RiderHomeNavigationProp>();
    const { colors, isDark } = useTheme();
    const { user } = useAuth();
    const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        loadAvailableOrders();
    }, []);

    const loadAvailableOrders = async () => {
        const data = await getAvailableOrders();
        setAvailableOrders(data);
    };

    const handleAcceptOrder = async (order: Order) => {
        if (!user) return;
        await assignRiderToOrder(order.id, user.id, user.name);
        navigation.navigate('Delivery', { orderId: order.id });
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            {/* Compact Header */}
            <View style={[styles.header, { backgroundColor: isDark ? colors.surfaceDark : colors.surface, borderBottomColor: isDark ? colors.borderDark : colors.border }]}>
                <View style={styles.headerProfileContainer}>
                    <View style={[styles.profileButton, { backgroundColor: colors.primary + '20' }]}>
                        <Ionicons name="bicycle" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
                            Available Orders
                        </Text>
                        <Text style={[styles.headerSubtitle, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                            {availableOrders.length} orders nearby
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[
                        styles.statusButton,
                        { backgroundColor: isOnline ? colors.success + '20' : colors.error + '20' },
                    ]}
                    onPress={() => setIsOnline(!isOnline)}
                >
                    <View style={[styles.statusDot, { backgroundColor: isOnline ? colors.success : colors.error }]} />
                    <Text style={[styles.statusText, { color: isOnline ? colors.success : colors.error }]}>
                        {isOnline ? 'Online' : 'Offline'}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {!isOnline ? (
                    <View style={styles.offlineContainer}>
                        <Ionicons name="moon-outline" size={64} color={colors.textSecondary} />
                        <Text style={[styles.offlineText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                            You're offline. Go online to receive orders.
                        </Text>
                    </View>
                ) : availableOrders.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="bicycle-outline" size={64} color={colors.textSecondary} />
                        <Text style={[styles.emptyText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                            No available orders right now
                        </Text>
                    </View>
                ) : (
                    availableOrders.map((order) => (
                        <View
                            key={order.id}
                            style={[
                                styles.orderCard,
                                { backgroundColor: isDark ? colors.surfaceDark : colors.surface, ...SHADOWS.md },
                            ]}
                        >
                            <View style={styles.orderHeader}>
                                <View>
                                    <Text style={[styles.restaurantName, { color: isDark ? colors.textDark : colors.text }]}>
                                        {order.restaurantName}
                                    </Text>
                                    <Text style={[styles.orderId, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                        Order {order.id}
                                    </Text>
                                </View>
                                <View style={[styles.earningsBadge, { backgroundColor: colors.success + '20' }]}>
                                    <Text style={[styles.earningsText, { color: colors.success }]}>
                                        ₱{order.deliveryFee.toFixed(0)}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.orderDetails}>
                                <View style={styles.detailRow}>
                                    <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
                                    <Text style={[styles.detailText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                        {order.deliveryAddress}
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Ionicons name="navigate-outline" size={16} color={colors.textSecondary} />
                                    <Text style={[styles.detailText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                        2.5 km away
                                    </Text>
                                </View>
                            </View>

                            <Button
                                title="Accept Order"
                                onPress={() => handleAcceptOrder(order)}
                                variant="primary"
                                size="medium"
                                fullWidth
                                gradient
                            />
                        </View>
                    ))
                )}
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
        paddingTop: Platform.OS === 'android' ? 30 : 20, // Balanced padding
        paddingBottom: SPACING.md, // Balanced with top
        paddingHorizontal: SPACING.lg,
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
    profileButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold },
    headerSubtitle: { fontSize: FONT_SIZES.sm, marginTop: 2 },
    statusButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.full,
        gap: 4,
    },
    statusText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    scrollContent: { padding: SPACING.lg },
    orderCard: { borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.md,
    },
    restaurantName: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, marginBottom: 2 },
    orderId: { fontSize: FONT_SIZES.sm },
    earningsBadge: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
    },
    earningsText: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold },
    orderDetails: { marginBottom: SPACING.md, gap: SPACING.xs },
    detailRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
    detailText: { fontSize: FONT_SIZES.sm, flex: 1 },
    offlineContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SPACING.xxl * 2,
    },
    offlineText: { fontSize: FONT_SIZES.lg, marginTop: SPACING.md, textAlign: 'center' },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SPACING.xxl * 2,
    },
    emptyText: { fontSize: FONT_SIZES.lg, marginTop: SPACING.md },
});

export default RiderHomeScreen;
