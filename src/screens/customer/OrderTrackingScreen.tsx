import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MapViewWrapper, MarkerWrapper } from '../../components/MapViewWrapper';
import { useTheme } from '../../contexts/ThemeContext';
import { CustomerStackParamList } from '../../navigation/CustomerTabNavigator';
import { getOrderById, Order, updateOrderStatus } from '../../services/orderService';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';

type OrderTrackingRouteProp = RouteProp<CustomerStackParamList, 'OrderTracking'>;

const OrderTrackingScreen = () => {
    const route = useRoute<OrderTrackingRouteProp>();
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

    if (!order) {
        return (
            <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const statusSteps = [
        { key: 'PENDING', label: 'Order Placed', icon: 'checkmark-circle' },
        { key: 'CONFIRMED', label: 'Confirmed', icon: 'checkmark-circle' },
        { key: 'PREPARING', label: 'Preparing', icon: 'restaurant' },
        { key: 'READY', label: 'Ready', icon: 'cube' },
        { key: 'PICKED_UP', label: 'Picked Up', icon: 'bicycle' },
        { key: 'ON_THE_WAY', label: 'On the Way', icon: 'navigate' },
        { key: 'DELIVERED', label: 'Delivered', icon: 'home' },
    ];

    const currentStepIndex = statusSteps.findIndex(s => s.key === order.status);

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            <View style={[styles.header, { backgroundColor: isDark ? colors.surfaceDark : colors.surface }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={isDark ? colors.textDark : colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
                    Track Order
                </Text>
            </View>

            <ScrollView>
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
                        <MarkerWrapper coordinate={{ latitude: 13.6218, longitude: 123.1948 }} title="Your Location" />
                        <MarkerWrapper coordinate={{ latitude: 13.6298, longitude: 123.1898 }} title={order.restaurantName} />
                    </MapViewWrapper>
                </View>

                <View style={[styles.content, { backgroundColor: isDark ? colors.surfaceDark : colors.surface }]}>
                    <Text style={[styles.orderId, { color: isDark ? colors.textDark : colors.text }]}>
                        Order {order.id}
                    </Text>

                    {statusSteps.map((step, index) => (
                        <View key={step.key} style={styles.stepContainer}>
                            <View style={styles.stepLeft}>
                                <View
                                    style={[
                                        styles.stepIcon,
                                        {
                                            backgroundColor: index <= currentStepIndex ? colors.primary : colors.border,
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name={step.icon as any}
                                        size={20}
                                        color={index <= currentStepIndex ? '#ffffff' : colors.textSecondary}
                                    />
                                </View>
                                {index < statusSteps.length - 1 && (
                                    <View
                                        style={[
                                            styles.stepLine,
                                            {
                                                backgroundColor: index < currentStepIndex ? colors.primary : colors.border,
                                            },
                                        ]}
                                    />
                                )}
                            </View>
                            <Text
                                style={[
                                    styles.stepLabel,
                                    {
                                        color: index <= currentStepIndex
                                            ? isDark
                                                ? colors.textDark
                                                : colors.text
                                            : colors.textSecondary,
                                        fontWeight: index === currentStepIndex ? FONT_WEIGHTS.bold : FONT_WEIGHTS.regular,
                                    },
                                ]}
                            >
                                {step.label}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
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
    mapContainer: { height: 300 },
    map: { flex: 1 },
    content: { padding: SPACING.lg },
    orderId: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold, marginBottom: SPACING.lg },
    stepContainer: { flexDirection: 'row', marginBottom: SPACING.md },
    stepLeft: { alignItems: 'center', marginRight: SPACING.md },
    stepIcon: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.full,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepLine: { width: 2, flex: 1, marginVertical: 4 },
    stepLabel: { fontSize: FONT_SIZES.md, paddingTop: 8 },
});

export default OrderTrackingScreen;
