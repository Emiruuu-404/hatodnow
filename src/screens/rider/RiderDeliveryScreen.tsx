import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MapViewWrapper, MarkerWrapper } from '../../components/MapViewWrapper';
import { useTheme } from '../../contexts/ThemeContext';
import { RiderStackParamList } from '../../navigation/RiderTabNavigator';
import { getOrderById, updateOrderStatus, Order } from '../../services/orderService';
import Button from '../../components/Button';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';

type RiderDeliveryRouteProp = RouteProp<RiderStackParamList, 'Delivery'>;

const RiderDeliveryScreen = () => {
    const route = useRoute<RiderDeliveryRouteProp>();
    const navigation = useNavigation();
    const { colors, isDark } = useTheme();
    const { orderId } = route.params;
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        loadOrder();
    }, [orderId]);

    const loadOrder = async () => {
        const data = await getOrderById(orderId);
        setOrder(data || null);
    };

    const handleUpdateStatus = async (newStatus: any) => {
        if (!order) return;
        await updateOrderStatus(order.id, newStatus);
        loadOrder();

        if (newStatus === 'DELIVERED') {
            Alert.alert('Success', 'Order delivered successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        }
    };

    if (!order) {
        return (
            <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            <View style={[styles.header, { backgroundColor: isDark ? colors.surfaceDark : colors.surface }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={isDark ? colors.textDark : colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
                    Delivery
                </Text>
            </View>

            <View style={styles.mapContainer}>
                <MapViewWrapper
                    style={styles.map}
                    initialRegion={{
                        latitude: 13.6218,
                        longitude: 123.1948,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    <MarkerWrapper coordinate={{ latitude: 13.6218, longitude: 123.1948 }} title="Pickup" />
                    <MarkerWrapper coordinate={{ latitude: 13.6298, longitude: 123.1898 }} title="Dropoff" />
                </MapViewWrapper>
            </View>

            <View style={[styles.content, { backgroundColor: isDark ? colors.surfaceDark : colors.surface, ...SHADOWS.lg }]}>
                <View style={styles.infoSection}>
                    <Text style={[styles.restaurantName, { color: isDark ? colors.textDark : colors.text }]}>
                        {order.restaurantName}
                    </Text>
                    <Text style={[styles.orderId, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                        Order {order.id}
                    </Text>
                </View>

                <View style={styles.addressSection}>
                    <View style={styles.addressRow}>
                        <Ionicons name="location" size={20} color={colors.primary} />
                        <View style={styles.addressText}>
                            <Text style={[styles.addressLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                Delivery Address
                            </Text>
                            <Text style={[styles.address, { color: isDark ? colors.textDark : colors.text }]}>
                                {order.deliveryAddress}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.actionsSection}>
                    {order.status === 'PICKED_UP' && (
                        <Button
                            title="Mark as On the Way"
                            onPress={() => handleUpdateStatus('ON_THE_WAY')}
                            variant="primary"
                            size="large"
                            fullWidth
                            gradient
                        />
                    )}
                    {order.status === 'ON_THE_WAY' && (
                        <Button
                            title="Mark as Delivered"
                            onPress={() => handleUpdateStatus('DELIVERED')}
                            variant="primary"
                            size="large"
                            fullWidth
                            gradient
                        />
                    )}
                </View>

                <View style={styles.earningsSection}>
                    <Text style={[styles.earningsLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                        Delivery Fee
                    </Text>
                    <Text style={[styles.earningsValue, { color: colors.success }]}>
                        ₱{order.deliveryFee.toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: SPACING.md,
        paddingHorizontal: SPACING.lg,
        gap: SPACING.md,
    },
    headerTitle: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold },
    mapContainer: { flex: 1 },
    map: { flex: 1 },
    content: {
        borderTopLeftRadius: BORDER_RADIUS.xl,
        borderTopRightRadius: BORDER_RADIUS.xl,
        padding: SPACING.xl,
    },
    infoSection: { marginBottom: SPACING.lg },
    restaurantName: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold, marginBottom: 4 },
    orderId: { fontSize: FONT_SIZES.sm },
    addressSection: { marginBottom: SPACING.lg },
    addressRow: { flexDirection: 'row', gap: SPACING.md },
    addressText: { flex: 1 },
    addressLabel: { fontSize: FONT_SIZES.sm, marginBottom: 4 },
    address: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.medium },
    actionsSection: { marginBottom: SPACING.lg },
    earningsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    earningsLabel: { fontSize: FONT_SIZES.md },
    earningsValue: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.bold },
});

export default RiderDeliveryScreen;
