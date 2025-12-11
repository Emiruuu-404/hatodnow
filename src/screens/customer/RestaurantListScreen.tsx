import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { CustomerStackParamList } from '../../navigation/CustomerTabNavigator';
import { getRestaurants, getRestaurantsByTown, Restaurant } from '../../services/restaurantService';
import RestaurantCard from '../../components/RestaurantCard';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../../constants/theme';

type RestaurantListNavigationProp = StackNavigationProp<CustomerStackParamList, 'RestaurantList'>;
type RestaurantListRouteProp = RouteProp<CustomerStackParamList, 'RestaurantList'>;

const RestaurantListScreen = () => {
    const navigation = useNavigation<RestaurantListNavigationProp>();
    const route = useRoute<RestaurantListRouteProp>();
    const { colors, isDark } = useTheme();

    const { service, town } = route.params;

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'open' | 'featured'>('all');

    useEffect(() => {
        loadRestaurants();
    }, [town]);

    const loadRestaurants = async () => {
        setLoading(true);
        try {
            const data = town
                ? await getRestaurantsByTown(town)
                : await getRestaurants();
            setRestaurants(data);
        } catch (error) {
            console.error('Failed to load restaurants:', error);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredRestaurants = () => {
        switch (filter) {
            case 'open':
                return restaurants.filter(r => r.isOpen);
            case 'featured':
                return restaurants.filter(r => r.featured);
            default:
                return restaurants;
        }
    };

    const filteredRestaurants = getFilteredRestaurants();

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
                        {town || 'All Restaurants'}
                    </Text>
                    <Text style={[styles.headerSubtitle, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                        {filteredRestaurants.length} restaurants available
                    </Text>
                </View>
            </View>

            {/* Filters */}
            <View style={styles.filterContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterScroll}
                >
                    {[
                        { key: 'all' as const, label: 'All', icon: 'grid' as const },
                        { key: 'open' as const, label: 'Open Now', icon: 'time' as const },
                        { key: 'featured' as const, label: 'Featured', icon: 'star' as const },
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
                            <Ionicons
                                name={item.icon}
                                size={16}
                                color={filter === item.key ? '#ffffff' : isDark ? colors.textDark : colors.text}
                            />
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

            {/* Restaurant List */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {loading ? (
                    <Text style={[styles.loadingText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                        Loading restaurants...
                    </Text>
                ) : filteredRestaurants.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="restaurant-outline" size={64} color={colors.textSecondary} />
                        <Text style={[styles.emptyText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                            No restaurants found
                        </Text>
                    </View>
                ) : (
                    filteredRestaurants.map((restaurant) => (
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
            </ScrollView>
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
    filterContainer: {
        paddingVertical: SPACING.md,
    },
    filterScroll: {
        paddingHorizontal: SPACING.lg,
        gap: SPACING.sm,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 1,
        gap: SPACING.xs,
    },
    filterText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.semibold,
    },
    scrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xl,
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

export default RestaurantListScreen;
