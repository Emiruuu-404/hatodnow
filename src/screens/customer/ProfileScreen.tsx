import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';
import Button from '../../components/Button';

const ProfileScreen = () => {
    const { colors, isDark, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    const menuItems = [
        { icon: 'person-outline', label: 'Edit Profile', onPress: () => { } },
        { icon: 'location-outline', label: 'Saved Addresses', onPress: () => { } },
        { icon: 'card-outline', label: 'Payment Methods', onPress: () => { } },
        { icon: 'notifications-outline', label: 'Notifications', onPress: () => { } },
        { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => { } },
        { icon: 'document-text-outline', label: 'Terms & Conditions', onPress: () => { } },
    ];

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
                    <Text style={[styles.phone, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                        {user?.phone}
                    </Text>
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

                <View style={[styles.section, { backgroundColor: isDark ? colors.surfaceDark : colors.surface, ...SHADOWS.sm }]}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.menuItem,
                                index < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: isDark ? colors.borderDark : colors.border },
                            ]}
                            onPress={item.onPress}
                        >
                            <View style={styles.menuLeft}>
                                <Ionicons name={item.icon as any} size={24} color={isDark ? colors.textDark : colors.text} />
                                <Text style={[styles.menuLabel, { color: isDark ? colors.textDark : colors.text }]}>
                                    {item.label}
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                    ))}
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
    header: {
        paddingTop: 50,
        paddingBottom: SPACING.md,
        paddingHorizontal: SPACING.lg,
    },
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
    email: { fontSize: FONT_SIZES.md, marginBottom: 2 },
    phone: { fontSize: FONT_SIZES.sm },
    section: {
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.md,
        overflow: 'hidden',
    },
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

export default ProfileScreen;
