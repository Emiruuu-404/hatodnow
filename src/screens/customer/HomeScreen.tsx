import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { CustomerStackParamList } from '../../navigation/CustomerTabNavigator';
import { getFeaturedRestaurants, Restaurant } from '../../services/restaurantService';
import RestaurantCard from '../../components/RestaurantCard';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';
import { SERVICES, TOWNS } from '../../constants';

type HomeNavigationProp = StackNavigationProp<CustomerStackParamList, 'HomeTab'>;

const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const navigation = useNavigation<HomeNavigationProp>();
    const { user } = useAuth();
    const { colors, isDark } = useTheme();
    const { totalItems } = useCart();

    const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFeaturedRestaurants();
    }, []);

    const loadFeaturedRestaurants = async () => {
        try {
            const restaurants = await getFeaturedRestaurants();
            setFeaturedRestaurants(restaurants);
        } catch (error) {
            console.error('Failed to load featured restaurants:', error);
        } finally {
            setLoading(false);
        }
    };

    const services = [
        {
            id: SERVICES.FOOD_DELIVERY,
            title: 'Food Delivery',
            icon: 'restaurant' as const,
            color: '#ef4444',
            gradient: ['#ef4444', '#dc2626'],
        },
        {
            id: SERVICES.PARCEL_DELIVERY,
            title: 'Parcel',
            icon: 'cube' as const,
            color: '#3b82f6',
            gradient: ['#3b82f6', '#2563eb'],
        },
        {
            id: SERVICES.RIDE_BOOKING,
            title: 'Ride',
            icon: 'bicycle' as const,
            color: '#10b981',
            gradient: ['#10b981', '#059669'],
        },
    ];

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            {/* Compact Header */}
            <View style={[styles.header, { backgroundColor: isDark ? colors.surfaceDark : colors.surface, borderBottomColor: isDark ? colors.borderDark : colors.border }]}>
                <View style={styles.headerProfileContainer}>
                    <View style={[styles.profileButton, { backgroundColor: colors.primary + '20' }]}>
                        <Ionicons name="person" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={[styles.greeting, { color: isDark ? colors.textDark : colors.text }]}>
                            Hello, {user?.name || 'User'}! 👋
                        </Text>
                        <Text style={[styles.location, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                            <Ionicons name="location-sharp" size={12} color={colors.primary} /> Sipocot, Cam. Sur
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <Ionicons name="cart-outline" size={24} color={isDark ? colors.textDark : colors.text} />
                    {totalItems > 0 && (
                        <View style={[styles.cartBadge, { backgroundColor: colors.primary }]}>
                            <Text style={styles.cartBadgeText}>{totalItems}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Services */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
                        Our Services
                    </Text>
                    <View style={styles.servicesGrid}>
                        {services.map((service) => (
                            <TouchableOpacity
                                key={service.id}
                                onPress={() =>
                                    navigation.navigate('RestaurantList', { service: service.id })
                                }
                            >
                                <LinearGradient
                                    colors={service.gradient}
                                    style={[styles.serviceCard, SHADOWS.md]}
                                >
                                    <View style={styles.serviceIcon}>
                                        <Ionicons name={service.icon} size={32} color="#ffffff" />
                                    </View>
                                    <Text style={styles.serviceTitle}>{service.title}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Quick Access Towns */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
                        Browse by Town
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.townsScroll}
                    >
                        {TOWNS.slice(0, 5).map((town) => (
                            <TouchableOpacity
                                key={town}
                                style={[
                                    styles.townCard,
                                    {
                                        backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                                        ...SHADOWS.sm,
                                    },
                                ]}
                                onPress={() =>
                                    navigation.navigate('RestaurantList', {
                                        service: SERVICES.FOOD_DELIVERY,
                                        town,
                                    })
                                }
                            >
                                <Ionicons
                                    name="location"
                                    size={20}
                                    color={colors.primary}
                                />
                                <Text
                                    style={[
                                        styles.townText,
                                        { color: isDark ? colors.textDark : colors.text },
                                    ]}
                                >
                                    {town}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Featured Restaurants */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
                            Featured Restaurants
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('RestaurantList', {
                                    service: SERVICES.FOOD_DELIVERY,
                                })
                            }
                        >
                            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {loading ? (
                        <Text style={[styles.loadingText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                            Loading restaurants...
                        </Text>
                    ) : (
                        featuredRestaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.id}
                                restaurant={restaurant}
                                onPress={() =>
                                    navigation.navigate('RestaurantDetail', {
                                        restaurantId: restaurant.id,
                                    })
                                }
                            />
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: Platform.OS === 'android' ? 30 : 20, // Balanced padding
        paddingBottom: SPACING.md, // Balanced with top (visually)
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
    profileButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greeting: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.bold,
        marginBottom: 2,
    },
    location: {
        fontSize: FONT_SIZES.sm,
    },
    cartButton: {
        position: 'relative',
        padding: 4,
    },
    cartBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderRadius: BORDER_RADIUS.full,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
    },
    cartBadgeText: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: FONT_WEIGHTS.bold,
    },
    scrollContent: {
        paddingBottom: SPACING.xl,
    },
    section: {
        marginTop: SPACING.xl,
        paddingHorizontal: SPACING.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
        marginBottom: SPACING.md,
    },
    seeAll: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold,
    },
    servicesGrid: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
    serviceCard: {
        width: (width - SPACING.lg * 2 - SPACING.md * 2) / 3,
        aspectRatio: 1,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    serviceIcon: {
        marginBottom: SPACING.sm,
    },
    serviceTitle: {
        color: '#ffffff',
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.semibold,
        textAlign: 'center',
    },
    townsScroll: {
        gap: SPACING.sm,
    },
    townCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.full,
        gap: SPACING.xs,
    },
    townText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.semibold,
    },
    loadingText: {
        fontSize: FONT_SIZES.md,
        textAlign: 'center',
        marginTop: SPACING.xl,
    },
});

export default HomeScreen;
