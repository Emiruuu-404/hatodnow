import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';

const RiderEarningsScreen = () => {
    const { colors, isDark } = useTheme();

    const stats = [
        { label: 'Today', value: '₱450', icon: 'today', color: colors.primary },
        { label: 'This Week', value: '₱2,100', icon: 'calendar', color: colors.success },
        { label: 'This Month', value: '₱8,500', icon: 'stats-chart', color: colors.warning },
    ];

    const recentEarnings = [
        { id: 'ORD-001', amount: 25, date: '2 hours ago' },
        { id: 'ORD-002', amount: 30, date: '4 hours ago' },
        { id: 'ORD-003', amount: 25, date: '5 hours ago' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            <View style={[styles.header, { backgroundColor: isDark ? colors.surfaceDark : colors.surface }]}>
                <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
                    Earnings
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.statsContainer}>
                    {stats.map((stat, index) => (
                        <View
                            key={index}
                            style={[
                                styles.statCard,
                                { backgroundColor: isDark ? colors.surfaceDark : colors.surface, ...SHADOWS.md },
                            ]}
                        >
                            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                                <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                            </View>
                            <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                                {stat.value}
                            </Text>
                            <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                {stat.label}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={[styles.section, { backgroundColor: isDark ? colors.surfaceDark : colors.surface, ...SHADOWS.sm }]}>
                    <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
                        Recent Earnings
                    </Text>
                    {recentEarnings.map((earning, index) => (
                        <View
                            key={index}
                            style={[
                                styles.earningItem,
                                index < recentEarnings.length - 1 && {
                                    borderBottomWidth: 1,
                                    borderBottomColor: isDark ? colors.borderDark : colors.border,
                                },
                            ]}
                        >
                            <View>
                                <Text style={[styles.earningId, { color: isDark ? colors.textDark : colors.text }]}>
                                    {earning.id}
                                </Text>
                                <Text style={[styles.earningDate, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                                    {earning.date}
                                </Text>
                            </View>
                            <Text style={[styles.earningAmount, { color: colors.success }]}>
                                +₱{earning.amount}
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
    header: { paddingTop: 50, paddingBottom: SPACING.md, paddingHorizontal: SPACING.lg },
    headerTitle: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.bold },
    scrollContent: { padding: SPACING.lg },
    statsContainer: { marginBottom: SPACING.lg },
    statCard: {
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.xl,
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    statIcon: {
        width: 50,
        height: 50,
        borderRadius: BORDER_RADIUS.full,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    statValue: { fontSize: FONT_SIZES.xxxl, fontWeight: FONT_WEIGHTS.bold, marginBottom: 4 },
    statLabel: { fontSize: FONT_SIZES.md },
    section: { borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg },
    sectionTitle: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, marginBottom: SPACING.md },
    earningItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.md,
    },
    earningId: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold },
    earningDate: { fontSize: FONT_SIZES.sm, marginTop: 2 },
    earningAmount: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold },
});

export default RiderEarningsScreen;
