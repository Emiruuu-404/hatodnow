import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { CustomerStackParamList } from '../../navigation/CustomerTabNavigator';
import { createOrder } from '../../services/orderService';
import Button from '../../components/Button';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';
import { PAYMENT_METHODS } from '../../constants';

type CheckoutNavigationProp = StackNavigationProp<CustomerStackParamList, 'Checkout'>;

const CheckoutScreen = () => {
    const navigation = useNavigation<CheckoutNavigationProp>();
    const { colors, isDark } = useTheme();
    const { items, totalPrice, clearCart } = useCart();
    const { user } = useAuth();

    const [deliveryAddress, setDeliveryAddress] = useState('Brgy. Centro, Sipocot, Camarines Sur');
    const [contactNumber, setContactNumber] = useState(user?.phone || '');
    const [paymentMethod, setPaymentMethod] = useState<keyof typeof PAYMENT_METHODS>('CASH');
    const [loading, setLoading] = useState(false);

    const deliveryFee = 25;
    const total = totalPrice + deliveryFee;

    const paymentOptions = [
        { key: 'CASH' as const, label: 'Cash on Delivery', icon: 'cash' as const },
        { key: 'GCASH' as const, label: 'GCash', icon: 'phone-portrait' as const },
        { key: 'PAYMAYA' as const, label: 'PayMaya', icon: 'card' as const },
    ];

    const handlePlaceOrder = async () => {
        if (!deliveryAddress || !contactNumber) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        if (!items.length) {
            Alert.alert('Error', 'Your cart is empty');
            return;
        }

        setLoading(true);
        try {
            const order = await createOrder({
                customerId: user?.id || '',
                restaurantId: items[0].restaurantId,
                restaurantName: items[0].restaurantName,
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    variant: item.variant,
                })),
                subtotal: totalPrice,
                deliveryFee,
                total,
                deliveryAddress,
                paymentMethod: PAYMENT_METHODS[paymentMethod],
            });

            clearCart();
            Alert.alert(
                'Order Placed!',
                `Your order #${order.id} has been placed successfully.`,
                [
                    {
                        text: 'Track Order',
                        onPress: () => navigation.navigate('OrderTracking', { orderId: order.id }),
                    },
                ]
            );
        } catch (error) {
            Alert.alert('Error', 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: isDark ? colors.surfaceDark : colors.surface }]}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={isDark ? colors.textDark : colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
                    Checkout
                </Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Delivery Address */}
                <View
                    style={[
                        styles.section,
                        {
                            backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                            ...SHADOWS.sm,
                        },
                    ]}
                >
                    <View style={styles.sectionHeader}>
                        <Ionicons name="location" size={20} color={colors.primary} />
                        <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
                            Delivery Address
                        </Text>
                    </View>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: isDark ? colors.backgroundDark : colors.background,
                                color: isDark ? colors.textDark : colors.text,
                                borderColor: isDark ? colors.borderDark : colors.border,
                            },
                        ]}
                        placeholder="Enter your delivery address"
                        placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
                        value={deliveryAddress}
                        onChangeText={setDeliveryAddress}
                        multiline
                    />
                </View>

                {/* Contact Number */}
                <View
                    style={[
                        styles.section,
                        {
                            backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                            ...SHADOWS.sm,
                        },
                    ]}
                >
                    <View style={styles.sectionHeader}>
                        <Ionicons name="call" size={20} color={colors.primary} />
                        <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
                            Contact Number
                        </Text>
                    </View>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: isDark ? colors.backgroundDark : colors.background,
                                color: isDark ? colors.textDark : colors.text,
                                borderColor: isDark ? colors.borderDark : colors.border,
                            },
                        ]}
                        placeholder="+63 912 345 6789"
                        placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
                        value={contactNumber}
                        onChangeText={setContactNumber}
                        keyboardType="phone-pad"
                    />
                </View>

                {/* Payment Method */}
                <View
                    style={[
                        styles.section,
                        {
                            backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                            ...SHADOWS.sm,
                        },
                    ]}
                >
                    <View style={styles.sectionHeader}>
                        <Ionicons name="wallet" size={20} color={colors.primary} />
                        <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
                            Payment Method
                        </Text>
                    </View>

                    {paymentOptions.map((option) => (
                        <TouchableOpacity
                            key={option.key}
                            style={[
                                styles.paymentOption,
                                {
                                    backgroundColor: paymentMethod === option.key
                                        ? isDark
                                            ? colors.backgroundDark
                                            : colors.background
                                        : 'transparent',
                                    borderColor: paymentMethod === option.key ? colors.primary : colors.border,
                                },
                            ]}
                            onPress={() => setPaymentMethod(option.key)}
                        >
                            <View style={styles.paymentLeft}>
                                <Ionicons
                                    name={option.icon}
                                    size={24}
                                    color={paymentMethod === option.key ? colors.primary : colors.textSecondary}
                                />
                                <Text
                                    style={[
                                        styles.paymentLabel,
                                        {
                                            color: paymentMethod === option.key
                                                ? isDark
                                                    ? colors.textDark
                                                    : colors.text
                                                : isDark
                                                    ? colors.textSecondaryDark
                                                    : colors.textSecondary,
                                        },
                                    ]}
                                >
                                    {option.label}
                                </Text>
                            </View>
                            {paymentMethod === option.key && (
                                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Order Summary */}
                <View
                    style={[
                        styles.section,
                        {
                            backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                            ...SHADOWS.sm,
                        },
                    ]}
                >
                    <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
                        Order Summary
                    </Text>

                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                            Subtotal ({items.length} items)
                        </Text>
                        <Text style={[styles.summaryValue, { color: isDark ? colors.textDark : colors.text }]}>
                            ₱{totalPrice.toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                            Delivery Fee
                        </Text>
                        <Text style={[styles.summaryValue, { color: isDark ? colors.textDark : colors.text }]}>
                            ₱{deliveryFee.toFixed(2)}
                        </Text>
                    </View>

                    <View style={[styles.divider, { backgroundColor: isDark ? colors.borderDark : colors.border }]} />

                    <View style={styles.summaryRow}>
                        <Text style={[styles.totalLabel, { color: isDark ? colors.textDark : colors.text }]}>
                            Total
                        </Text>
                        <Text style={[styles.totalValue, { color: colors.primary }]}>
                            ₱{total.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Place Order Button */}
            <View style={[styles.footer, { backgroundColor: isDark ? colors.surfaceDark : colors.surface }]}>
                <Button
                    title={`Place Order • ₱${total.toFixed(2)}`}
                    onPress={handlePlaceOrder}
                    variant="primary"
                    size="large"
                    fullWidth
                    loading={loading}
                    gradient
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: SPACING.md,
        paddingHorizontal: SPACING.lg,
    },
    backButton: {
        marginRight: SPACING.md,
    },
    headerTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    section: {
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
        gap: SPACING.sm,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.bold,
    },
    input: {
        borderWidth: 1,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        fontSize: FONT_SIZES.md,
        minHeight: 50,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 2,
        marginBottom: SPACING.sm,
    },
    paymentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    paymentLabel: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.medium,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    summaryLabel: {
        fontSize: FONT_SIZES.md,
    },
    summaryValue: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.medium,
    },
    divider: {
        height: 1,
        marginVertical: SPACING.md,
    },
    totalLabel: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.bold,
    },
    totalValue: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
    },
    footer: {
        padding: SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
    },
});

export default CheckoutScreen;
