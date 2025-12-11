import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    TextInput,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { CustomerStackParamList } from '../../navigation/CustomerTabNavigator';
import { getRestaurantById, Restaurant } from '../../services/restaurantService';
import { getMenuByRestaurant, MenuItem } from '../../services/menuService';
import MenuItemCard from '../../components/MenuItemCard';
import Button from '../../components/Button';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';

type RestaurantDetailNavigationProp = StackNavigationProp<CustomerStackParamList, 'RestaurantDetail'>;
type RestaurantDetailRouteProp = RouteProp<CustomerStackParamList, 'RestaurantDetail'>;

const RestaurantDetailScreen = () => {
    const navigation = useNavigation<RestaurantDetailNavigationProp>();
    const route = useRoute<RestaurantDetailRouteProp>();
    const { colors, isDark } = useTheme();
    const { addItem, totalItems } = useCart();

    const { restaurantId } = route.params;

    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<string>('');
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadRestaurantData();
    }, [restaurantId]);

    const loadRestaurantData = async () => {
        setLoading(true);
        try {
            const [restaurantData, menuData] = await Promise.all([
                getRestaurantById(restaurantId),
                getMenuByRestaurant(restaurantId),
            ]);
            setRestaurant(restaurantData || null);
            setMenuItems(menuData);
        } catch (error) {
            console.error('Failed to load restaurant data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleItemPress = (item: MenuItem) => {
        setSelectedItem(item);
        setSelectedVariant(item.variants?.[0]?.name || '');
        setSpecialInstructions('');
        setShowModal(true);
    };

    const handleAddToCart = () => {
        if (!selectedItem || !restaurant) return;

        const variant = selectedItem.variants?.find(v => v.name === selectedVariant);
        const price = variant?.price || selectedItem.price;

        addItem({
            id: selectedItem.id,
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            name: selectedItem.name,
            price,
            variant: selectedVariant,
            specialInstructions,
            image: selectedItem.image,
        });

        setShowModal(false);
        setSelectedItem(null);
    };

    if (loading || !restaurant) {
        return (
            <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
                <Text style={[styles.loadingText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                    Loading...
                </Text>
            </View>
        );
    }

    const categories = [...new Set(menuItems.map(item => item.category))];

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Restaurant Header */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: restaurant.image }} style={styles.image} resizeMode="cover" />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.imageGradient}
                    />
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    {/* Restaurant Info */}
                    <View style={styles.infoSection}>
                        <Text style={[styles.restaurantName, { color: isDark ? colors.textDark : colors.text }]}>
                            {restaurant.name}
                        </Text>
                        <Text style={[styles.description, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                            {restaurant.description}
                        </Text>

                        <View style={styles.metaContainer}>
                            <View style={styles.metaItem}>
                                <Ionicons name="star" size={16} color={colors.warning} />
                                <Text style={[styles.metaText, { color: isDark ? colors.textDark : colors.text }]}>
                                    {restaurant.rating}
                                </Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                                <Text style={[styles.metaText, { color: isDark ? colors.textDark : colors.text }]}>
                                    {restaurant.deliveryTime}
                                </Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
                                <Text style={[styles.metaText, { color: isDark ? colors.textDark : colors.text }]}>
                                    ₱{restaurant.deliveryFee} delivery
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Menu Items by Category */}
                    {categories.map((category) => (
                        <View key={category} style={styles.categorySection}>
                            <Text style={[styles.categoryTitle, { color: isDark ? colors.textDark : colors.text }]}>
                                {category}
                            </Text>
                            {menuItems
                                .filter(item => item.category === category)
                                .map(item => (
                                    <MenuItemCard
                                        key={item.id}
                                        item={item}
                                        onPress={() => handleItemPress(item)}
                                    />
                                ))}
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Cart Button */}
            {totalItems > 0 && (
                <TouchableOpacity
                    style={[styles.cartFloatingButton, { backgroundColor: colors.primary, ...SHADOWS.lg }]}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <Ionicons name="cart" size={24} color="#ffffff" />
                    <Text style={styles.cartFloatingText}>
                        View Cart ({totalItems})
                    </Text>
                </TouchableOpacity>
            )}

            {/* Add to Cart Modal */}
            <Modal
                visible={showModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: isDark ? colors.surfaceDark : colors.surface }]}>
                        {selectedItem && (
                            <>
                                <Image source={{ uri: selectedItem.image }} style={styles.modalImage} resizeMode="cover" />
                                <Text style={[styles.modalTitle, { color: isDark ? colors.textDark : colors.text }]}>
                                    {selectedItem.name}
                                </Text>
                                <Text style={[styles.modalDescription, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                    {selectedItem.description}
                                </Text>

                                {selectedItem.variants && selectedItem.variants.length > 0 && (
                                    <View style={styles.variantsSection}>
                                        <Text style={[styles.sectionLabel, { color: isDark ? colors.textDark : colors.text }]}>
                                            Select Variant
                                        </Text>
                                        {selectedItem.variants.map((variant) => (
                                            <TouchableOpacity
                                                key={variant.name}
                                                style={[
                                                    styles.variantButton,
                                                    {
                                                        backgroundColor: selectedVariant === variant.name
                                                            ? colors.primary
                                                            : isDark
                                                                ? colors.backgroundDark
                                                                : colors.background,
                                                        borderColor: selectedVariant === variant.name ? colors.primary : colors.border,
                                                    },
                                                ]}
                                                onPress={() => setSelectedVariant(variant.name)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.variantText,
                                                        {
                                                            color: selectedVariant === variant.name
                                                                ? '#ffffff'
                                                                : isDark
                                                                    ? colors.textDark
                                                                    : colors.text,
                                                        },
                                                    ]}
                                                >
                                                    {variant.name}
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.variantPrice,
                                                        {
                                                            color: selectedVariant === variant.name
                                                                ? '#ffffff'
                                                                : colors.primary,
                                                        },
                                                    ]}
                                                >
                                                    ₱{variant.price}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}

                                <View style={styles.instructionsSection}>
                                    <Text style={[styles.sectionLabel, { color: isDark ? colors.textDark : colors.text }]}>
                                        Special Instructions (Optional)
                                    </Text>
                                    <TextInput
                                        style={[
                                            styles.instructionsInput,
                                            {
                                                backgroundColor: isDark ? colors.backgroundDark : colors.background,
                                                color: isDark ? colors.textDark : colors.text,
                                                borderColor: isDark ? colors.borderDark : colors.border,
                                            },
                                        ]}
                                        placeholder="e.g., No onions, extra spicy"
                                        placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
                                        value={specialInstructions}
                                        onChangeText={setSpecialInstructions}
                                        multiline
                                    />
                                </View>

                                <View style={styles.modalActions}>
                                    <Button
                                        title="Cancel"
                                        onPress={() => setShowModal(false)}
                                        variant="outline"
                                        style={styles.modalButton}
                                    />
                                    <Button
                                        title="Add to Cart"
                                        onPress={handleAddToCart}
                                        variant="primary"
                                        gradient
                                        style={styles.modalButton}
                                    />
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
        height: 250,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: SPACING.lg,
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: SPACING.lg,
    },
    infoSection: {
        marginBottom: SPACING.xl,
    },
    restaurantName: {
        fontSize: FONT_SIZES.xxxl,
        fontWeight: FONT_WEIGHTS.bold,
        marginBottom: SPACING.xs,
    },
    description: {
        fontSize: FONT_SIZES.md,
        lineHeight: 22,
        marginBottom: SPACING.md,
    },
    metaContainer: {
        flexDirection: 'row',
        gap: SPACING.lg,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.medium,
    },
    categorySection: {
        marginBottom: SPACING.xl,
    },
    categoryTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
        marginBottom: SPACING.md,
    },
    loadingText: {
        fontSize: FONT_SIZES.md,
        textAlign: 'center',
        marginTop: SPACING.xxl,
    },
    cartFloatingButton: {
        position: 'absolute',
        bottom: SPACING.xl,
        left: SPACING.lg,
        right: SPACING.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.full,
        gap: SPACING.sm,
    },
    cartFloatingText: {
        color: '#ffffff',
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.bold,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: BORDER_RADIUS.xl,
        borderTopRightRadius: BORDER_RADIUS.xl,
        padding: SPACING.xl,
        maxHeight: '80%',
    },
    modalImage: {
        width: '100%',
        height: 200,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.md,
    },
    modalTitle: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: FONT_WEIGHTS.bold,
        marginBottom: SPACING.xs,
    },
    modalDescription: {
        fontSize: FONT_SIZES.md,
        lineHeight: 22,
        marginBottom: SPACING.lg,
    },
    variantsSection: {
        marginBottom: SPACING.lg,
    },
    sectionLabel: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold,
        marginBottom: SPACING.sm,
    },
    variantButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 2,
        marginBottom: SPACING.sm,
    },
    variantText: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.medium,
    },
    variantPrice: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.bold,
    },
    instructionsSection: {
        marginBottom: SPACING.lg,
    },
    instructionsInput: {
        borderWidth: 1,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        fontSize: FONT_SIZES.md,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    modalActions: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
    modalButton: {
        flex: 1,
    },
});

export default RestaurantDetailScreen;
