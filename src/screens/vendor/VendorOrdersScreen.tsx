import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { getOrdersByRestaurant, updateOrderStatus, Order } from '../../services/orderService';
import Button from '../../components/Button';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';
import { ORDER_STATUS } from '../../constants';

const VendorOrdersScreen = () => {
    const { colors, isDark } = useTheme();
    const [orders, setOrders] = useState<Order[]>([]);
    const [filter, setFilter] = useState<'all' | 'pending' | 'preparing'>('all');

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        const data = await getOrdersByRestaurant('1');
        setOrders(data);
    };

    const handleUpdateStatus = async (orderId: string, newStatus: keyof typeof ORDER_STATUS) => {
        await updateOrderStatus(orderId, newStatus);
        loadOrders();
    };

    const getFilteredOrders = () => {
        switch (filter) {
            case 'pending':
                return orders.filter(o => o.status === 'PENDING');
            case 'preparing':
                return orders.filter(o => o.status === 'PREPARING');
            default:
                return orders;
        }
    };

    const filteredOrders = getFilteredOrders();

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            <View style={[styles.header, { backgroundColor: isDark ? colors.surfaceDark : colors.surface }]}>
                <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
                    Orders
                </Text>
            </View>

            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {[
                        { key: 'all' as const, label: 'All' },
                        { key: 'pending' as const, label: 'Pending' },
                        { key: 'preparing' as const, label: 'Preparing' },
                    ].map((item) => (
                        <TouchableOpacity
                            key={item.key}
                            style={[
                                styles.filterButton,
                                {
                                    backgroundColor: filter === item.key ? colors.primary : isDark ? colors.surfaceDark : colors.surface,
                                    borderColor: filter === item.key ? colors.primary : colors.border,
                                },
                            ]}
                            onPress={() => setFilter(item.key)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    { color: filter === item.key ? '#ffffff' : isDark ? colors.textDark : colors.text },
                                ]}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {filteredOrders.map((order) => (
                    <View
                        key={order.id}
                        style={[
                            styles.orderCard,
                            { backgroundColor: isDark ? colors.surfaceDark : colors.surface, ...SHADOWS.sm },
                        ]}
                    >
                        <View style={styles.orderHeader}>
                            <Text style={[styles.orderId, { color: isDark ? colors.textDark : colors.text }]}>
                                {order.id}
                            </Text>
                            <Text style={[styles.orderTime, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                {new Date(order.createdAt).toLocaleTimeString()}
                            </Text>
                        </View>

                        <View style={styles.orderItems}>
                            {order.items.map((item, index) => (
                                <Text key={index} style={[styles.itemText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                    {item.quantity}x {item.name}
                                </Text>
                            ))}
                        </View>

                        <View style={styles.orderFooter}>
                            <Text style={[styles.totalText, { color: colors.primary }]}>
                                ₱{order.total.toFixed(2)}
                            </Text>
                            {order.status === 'PENDING' && (
                                <Button
                                    title="Accept"
                                    onPress={() => handleUpdateStatus(order.id, 'CONFIRMED')}
                                    variant="primary"
                                    size="small"
                                />
                            )}
                            {order.status === 'CONFIRMED' && (
                                <Button
                                    title="Start Preparing"
                                    onPress={() => handleUpdateStatus(order.id, 'PREPARING')}
                                    variant="primary"
                                    size="small"
                                />
                            )}
                            {order.status === 'PREPARING' && (
                                <Button
                                    title="Mark Ready"
                                    onPress={() => handleUpdateStatus(order.id, 'READY')}
                                    variant="primary"
                                    size="small"
                                />
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingTop: 50, paddingBottom: SPACING.md, paddingHorizontal: SPACING.lg },
    headerTitle: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.bold },
    filterContainer: { paddingVertical: SPACING.md },
    filterScroll: { paddingHorizontal: SPACING.lg, gap: SPACING.sm },
    filterButton: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 1,
    },
    filterText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold },
    scrollContent: { padding: SPACING.lg },
    orderCard: { borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.sm },
    orderId: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold },
    orderTime: { fontSize: FONT_SIZES.sm },
    orderItems: { marginBottom: SPACING.md },
    itemText: { fontSize: FONT_SIZES.sm, marginBottom: 2 },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    totalText: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold },
});

export default VendorOrdersScreen;
