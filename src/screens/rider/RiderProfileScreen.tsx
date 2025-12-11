import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';
import Button from '../../components/Button';

const RiderProfileScreen = () => {
    const { colors, isDark, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            <View style={[styles.header, { backgroundColor: isDark ? colors.surfaceDark : colors.surface }]}>
                <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
                    Profile
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.profileCard, { backgroundColor: isDark ? colors.surfaceDark : colors.surface, ...SHADOWS.md }]}>
                    <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                        <Text style={styles.avatarText}>{user?.name.charAt(0).toUpperCase()}</Text>
                    </View>
                    <Text style={[styles.name, { color: isDark ? colors.textDark : colors.text }]}>
                        {user?.name}
                    </Text>
                    <Text style={[styles.email, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                        {user?.email}
                    </Text>
                    <View style={[styles.ratingBadge, { backgroundColor: colors.warning + '20' }]}>
                        <Ionicons name="star" size={16} color={colors.warning} />
                        <Text style={[styles.rating, { color: colors.warning }]}>4.8</Text>
                    </View>
                </View>

                <View style={[styles.section, { backgroundColor: isDark ? colors.surfaceDark : colors.surface, ...SHADOWS.sm }]}>
                    <View style={styles.menuItem}>
                        <View style={styles.menuLeft}>
                            <Ionicons name="moon-outline" size={24} color={isDark ? colors.textDark : colors.text} />
                            <Text style={[styles.menuLabel, { color: isDark ? colors.textDark : colors.text }]}>
                                Dark Mode
                            </Text>
                        </View>
                        <Switch value={isDark} onValueChange={toggleTheme} />
                    </View>
                </View>

                <Button
                    title="Logout"
                    onPress={logout}
                    variant="outline"
                    size="large"
                    fullWidth
                    icon={<Ionicons name="log-out-outline" size={20} color={colors.primary} />}
                    style={styles.logoutButton}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingTop: 50, paddingBottom: SPACING.md, paddingHorizontal: SPACING.lg },
    headerTitle: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.bold },
    scrollContent: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
    profileCard: {
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.xl,
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    avatarText: { fontSize: 32, fontWeight: FONT_WEIGHTS.bold, color: '#ffffff' },
    name: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold, marginBottom: 4 },
    email: { fontSize: FONT_SIZES.md, marginBottom: SPACING.sm },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
        gap: 4,
    },
    rating: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold },
    section: { borderRadius: BORDER_RADIUS.lg, marginBottom: SPACING.md, overflow: 'hidden' },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.lg,
    },
    menuLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
    menuLabel: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.medium },
    logoutButton: { marginTop: SPACING.lg },
});

export default RiderProfileScreen;
