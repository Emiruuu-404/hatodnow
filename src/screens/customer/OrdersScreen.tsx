import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { CustomerStackParamList } from '../../navigation/CustomerTabNavigator';
import { getOrdersByCustomer, initializeMockOrders, Order } from '../../services/orderService';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';
import { ORDER_STATUS } from '../../constants';

type OrdersNavigationProp = StackNavigationProp<CustomerStackParamList>;

const OrdersScreen = () => {
    const navigation = useNavigation<OrdersNavigationProp>();
    const { colors, isDark } = useTheme();
    const { user } = useAuth();

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    useEffect(() => {
        if (user) {
            initializeMockOrders(user.id);
            loadOrders();
        }
    }, [user]);

    const loadOrders = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const data = await getOrdersByCustomer(user.id);
            setOrders(data);
        } catch (error) {
            console.error('Failed to load orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredOrders = () => {
        switch (filter) {
            case 'active':
                return orders.filter(o => !['DELIVERED', 'CANCELLED'].includes(o.status));
            case 'completed':
                return orders.filter(o => ['DELIVERED', 'CANCELLED'].includes(o.status));
            default:
                return orders;
        }
    };

    const getStatusColor = (status: keyof typeof ORDER_STATUS) => {
        switch (status) {
            case 'DELIVERED':
                return colors.success;
            case 'CANCELLED':
                return colors.error;
            case 'ON_THE_WAY':
                return colors.warning;
            default:
                return colors.primary;
        }
    };

    const getStatusIcon = (status: keyof typeof ORDER_STATUS) => {
        switch (status) {
            case 'DELIVERED':
                return 'checkmark-circle';
            case 'CANCELLED':
                return 'close-circle';
            case 'ON_THE_WAY':
                return 'bicycle';
            default:
                return 'time';
        }
    };

    const filteredOrders = getFilteredOrders();

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: isDark ? colors.surfaceDark : colors.surface }]}>
                <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
                    My Orders
                </Text>
            </View>

            {/* Filters */}
            <View style={styles.filterContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterScroll}
                >
                    {[
                        { key: 'all' as const, label: 'All' },
                        { key: 'active' as const, label: 'Active' },
                        { key: 'completed' as const, label: 'Completed' },
                    ].map((item) => (
                        <TouchableOpacity
                            key={item.key}
                            style={[
                                styles.filterButton,
                                {
                                    backgroundColor: filter === item.key
                                        ? colors.primary
                                        : isDark
                                            ? colors.surfaceDark
                                            : colors.surface,
                                    borderColor: filter === item.key ? colors.primary : colors.border,
                                },
                            ]}
                            onPress={() => setFilter(item.key)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    {
                                        color: filter === item.key
                                            ? '#ffffff'
                                            : isDark
                                                ? colors.textDark
                                                : colors.text,
                                    },
                                ]}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Orders List */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {loading ? (
                    <Text style={[styles.loadingText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                        Loading orders...
                    </Text>
                ) : filteredOrders.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="receipt-outline" size={64} color={colors.textSecondary} />
                        <Text style={[styles.emptyText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                            No orders found
                        </Text>
                    </View>
                ) : (
                    filteredOrders.map((order) => (
                        <TouchableOpacity
                            key={order.id}
                            style={[
                                styles.orderCard,
                                {
                                    backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                                    ...SHADOWS.sm,
                                },
                            ]}
                            onPress={() => {
                                if (order.status !== 'DELIVERED' && order.status !== 'CANCELLED') {
                                    navigation.navigate('OrderTracking', { orderId: order.id });
                                }
                            }}
                        >
                            <View style={styles.orderHeader}>
                                <View>
                                    <Text style={[styles.orderId, { color: isDark ? colors.textDark : colors.text }]}>
                                        {order.id}
                                    </Text>
                                    <Text style={[styles.restaurantName, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                        {order.restaurantName}
                                    </Text>
                                </View>
                                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                                    <Ionicons
                                        name={getStatusIcon(order.status)}
                                        size={16}
                                        color={getStatusColor(order.status)}
                                    />
                                    <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                                        {order.status.replace('_', ' ')}
                                    </Text>
                                </View>
                            </View>

                            <View style={[styles.divider, { backgroundColor: isDark ? colors.borderDark : colors.border }]} />

                            <View style={styles.orderDetails}>
                                <Text style={[styles.itemsText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                </Text>
                                <Text style={[styles.totalText, { color: colors.primary }]}>
                                    ₱{order.total.toFixed(2)}
                                </Text>
                            </View>

                            <Text style={[styles.dateText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                {new Date(order.createdAt).toLocaleString()}
                            </Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 50,
        paddingBottom: SPACING.md,
        paddingHorizontal: SPACING.lg,
    },
    headerTitle: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: FONT_WEIGHTS.bold,
    },
    filterContainer: {
        paddingVertical: SPACING.md,
    },
    filterScroll: {
        paddingHorizontal: SPACING.lg,
        gap: SPACING.sm,
    },
    filterButton: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 1,
    },
    filterText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.semibold,
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    orderCard: {
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.md,
    },
    orderId: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.bold,
        marginBottom: 2,
    },
    restaurantName: {
        fontSize: FONT_SIZES.sm,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
        gap: 4,
    },
    statusText: {
        fontSize: FONT_SIZES.xs,
        fontWeight: FONT_WEIGHTS.semibold,
        textTransform: 'capitalize',
    },
    divider: {
        height: 1,
        marginBottom: SPACING.md,
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    itemsText: {
        fontSize: FONT_SIZES.sm,
    },
    totalText: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.bold,
    },
    dateText: {
        fontSize: FONT_SIZES.xs,
    },
    loadingText: {
        fontSize: FONT_SIZES.md,
        textAlign: 'center',
        marginTop: SPACING.xxl,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SPACING.xxl * 2,
    },
    emptyText: {
        fontSize: FONT_SIZES.lg,
        marginTop: SPACING.md,
    },
});

export default OrdersScreen;
