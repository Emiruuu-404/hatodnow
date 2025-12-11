import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { CustomerStackParamList } from '../../navigation/CustomerTabNavigator';
import Button from '../../components/Button';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';

type CartNavigationProp = StackNavigationProp<CustomerStackParamList, 'Cart'>;

const CartScreen = () => {
    const navigation = useNavigation<CartNavigationProp>();
    const { colors, isDark } = useTheme();
    const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
                <View style={[styles.header, { backgroundColor: isDark ? colors.surfaceDark : colors.surface }]}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color={isDark ? colors.textDark : colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
                        Cart
                    </Text>
                </View>

                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={100} color={colors.textSecondary} />
                    <Text style={[styles.emptyTitle, { color: isDark ? colors.textDark : colors.text }]}>
                        Your cart is empty
                    </Text>
                    <Text style={[styles.emptyText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                        Add items from a restaurant to get started
                    </Text>
                    <Button
                        title="Browse Restaurants"
                        onPress={() => navigation.goBack()}
                        variant="primary"
                        gradient
                        style={styles.browseButton}
                    />
                </View>
            </View>
        );
    }

    const restaurantName = items[0]?.restaurantName;
    const subtotal = totalPrice;
    const deliveryFee = 25;
    const total = subtotal + deliveryFee;

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
                <View style={styles.headerContent}>
                    <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
                        Cart
                    </Text>
                    <Text style={[styles.headerSubtitle, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                        {restaurantName}
                    </Text>
                </View>
                <TouchableOpacity onPress={clearCart}>
                    <Text style={[styles.clearText, { color: colors.error }]}>Clear</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Cart Items */}
                <View style={styles.itemsSection}>
                    {items.map((item, index) => (
                        <View
                            key={`${item.id}-${item.variant}-${index}`}
                            style={[
                                styles.cartItem,
                                {
                                    backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                                    ...SHADOWS.sm,
                                },
                            ]}
                        >
                            <Image source={{ uri: item.image }} style={styles.itemImage} />

                            <View style={styles.itemDetails}>
                                <Text style={[styles.itemName, { color: isDark ? colors.textDark : colors.text }]}>
                                    {item.name}
                                </Text>
                                {item.variant && (
                                    <Text style={[styles.itemVariant, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                        {item.variant}
                                    </Text>
                                )}
                                {item.specialInstructions && (
                                    <Text style={[styles.itemInstructions, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                        Note: {item.specialInstructions}
                                    </Text>
                                )}
                                <Text style={[styles.itemPrice, { color: colors.primary }]}>
                                    ₱{item.price.toFixed(2)}
                                </Text>
                            </View>

                            <View style={styles.itemActions}>
                                <TouchableOpacity
                                    style={[styles.quantityButton, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}
                                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    <Ionicons name="remove" size={16} color={isDark ? colors.textDark : colors.text} />
                                </TouchableOpacity>
                                <Text style={[styles.quantity, { color: isDark ? colors.textDark : colors.text }]}>
                                    {item.quantity}
                                </Text>
                                <TouchableOpacity
                                    style={[styles.quantityButton, { backgroundColor: colors.primary }]}
                                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    <Ionicons name="add" size={16} color="#ffffff" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => removeItem(item.id)}
                            >
                                <Ionicons name="trash-outline" size={20} color={colors.error} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* Summary */}
                <View
                    style={[
                        styles.summarySection,
                        {
                            backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                            ...SHADOWS.md,
                        },
                    ]}
                >
                    <Text style={[styles.summaryTitle, { color: isDark ? colors.textDark : colors.text }]}>
                        Order Summary
                    </Text>

                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                            Subtotal ({totalItems} items)
                        </Text>
                        <Text style={[styles.summaryValue, { color: isDark ? colors.textDark : colors.text }]}>
                            ₱{subtotal.toFixed(2)}
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

            {/* Checkout Button */}
            <View style={[styles.footer, { backgroundColor: isDark ? colors.surfaceDark : colors.surface }]}>
                <Button
                    title={`Proceed to Checkout • ₱${total.toFixed(2)}`}
                    onPress={() => navigation.navigate('Checkout')}
                    variant="primary"
                    size="large"
                    fullWidth
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
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
    },
    headerSubtitle: {
        fontSize: FONT_SIZES.sm,
        marginTop: 2,
    },
    clearText: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold,
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    itemsSection: {
        marginBottom: SPACING.lg,
    },
    cartItem: {
        flexDirection: 'row',
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: BORDER_RADIUS.md,
        marginRight: SPACING.md,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold,
        marginBottom: 2,
    },
    itemVariant: {
        fontSize: FONT_SIZES.sm,
        marginBottom: 2,
    },
    itemInstructions: {
        fontSize: FONT_SIZES.xs,
        fontStyle: 'italic',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.bold,
    },
    itemActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        marginRight: SPACING.sm,
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: BORDER_RADIUS.sm,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantity: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold,
        minWidth: 20,
        textAlign: 'center',
    },
    removeButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    summarySection: {
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
    },
    summaryTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.bold,
        marginBottom: SPACING.md,
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
    },
    emptyTitle: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: FONT_WEIGHTS.bold,
        marginTop: SPACING.lg,
        marginBottom: SPACING.xs,
    },
    emptyText: {
        fontSize: FONT_SIZES.md,
        textAlign: 'center',
        marginBottom: SPACING.xl,
    },
    browseButton: {
        minWidth: 200,
    },
});

export default CartScreen;
