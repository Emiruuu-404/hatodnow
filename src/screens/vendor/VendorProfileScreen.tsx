import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';
import Button from '../../components/Button';

const VendorProfileScreen = () => {
    const { colors, isDark, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            <View style={[styles.header, { backgroundColor: isDark ? colors.surfaceDark : colors.surface }]}>
                <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
                    Settings
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.section, { backgroundColor: isDark ? colors.surfaceDark : colors.surface, ...SHADOWS.sm }]}>
                    <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
                        Store Information
                    </Text>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={[styles.menuLabel, { color: isDark ? colors.textDark : colors.text }]}>
                            Edit Store Details
                        </Text>
                        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.section, { backgroundColor: isDark ? colors.surfaceDark : colors.surface, ...SHADOWS.sm }]}>
                    <View style={styles.menuItem}>
                        <Text style={[styles.menuLabel, { color: isDark ? colors.textDark : colors.text }]}>
                            Dark Mode
                        </Text>
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
    scrollContent: { padding: SPACING.lg },
    section: { borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md },
    sectionTitle: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, marginBottom: SPACING.md },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
    },
    menuLabel: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.medium },
    logoutButton: { marginTop: SPACING.lg },
});

export default VendorProfileScreen;
