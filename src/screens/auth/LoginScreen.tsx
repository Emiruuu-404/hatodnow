import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../../components/Button';
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/theme';
import { USER_ROLES } from '../../constants';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
    const navigation = useNavigation<LoginNavigationProp>();
    const { login } = useAuth();
    const { colors, isDark } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState<keyof typeof USER_ROLES>('CUSTOMER');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await login(email, password, selectedRole);
        } catch (error) {
            Alert.alert('Error', 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const roles = [
        { key: 'CUSTOMER' as const, label: 'Customer', icon: 'person' as const },
        { key: 'VENDOR' as const, label: 'Vendor', icon: 'storefront' as const },
        { key: 'RIDER' as const, label: 'Rider', icon: 'bicycle' as const },
    ];

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={[styles.logoCircle, { backgroundColor: colors.primary + '20' }]}>
                        <Ionicons name="flash" size={40} color={colors.primary} />
                    </View>
                    <Text style={[styles.title, { color: isDark ? colors.textDark : colors.text }]}>
                        Welcome Back
                    </Text>
                    <Text style={[styles.subtitle, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                        Sign in to continue
                    </Text>
                </View>

                <View style={styles.form}>
                    <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>
                        Login as
                    </Text>
                    <View style={styles.roleContainer}>
                        {roles.map((role) => (
                            <TouchableOpacity
                                key={role.key}
                                style={[
                                    styles.roleButton,
                                    {
                                        backgroundColor: selectedRole === role.key
                                            ? colors.primary + '15' // Light background for selected
                                            : isDark
                                                ? colors.surfaceDark
                                                : colors.surface,
                                        borderColor: selectedRole === role.key ? colors.primary : colors.border,
                                    },
                                ]}
                                onPress={() => setSelectedRole(role.key)}
                            >
                                <Ionicons
                                    name={role.icon}
                                    size={24}
                                    color={selectedRole === role.key ? colors.primary : colors.textSecondary}
                                />
                                <Text
                                    style={[
                                        styles.roleText,
                                        {
                                            color: selectedRole === role.key
                                                ? colors.primary
                                                : isDark
                                                    ? colors.textDark
                                                    : colors.text,
                                        },
                                    ]}
                                >
                                    {role.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>
                            Email
                        </Text>
                        <View
                            style={[
                                styles.inputWrapper,
                                {
                                    backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                                    borderColor: isDark ? colors.borderDark : colors.border,
                                },
                            ]}
                        >
                            <Ionicons
                                name="mail-outline"
                                size={20}
                                color={isDark ? colors.textSecondaryDark : colors.textSecondary}
                            />
                            <TextInput
                                style={[styles.input, { color: isDark ? colors.textDark : colors.text }]}
                                placeholder="Enter your email"
                                placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>
                            Password
                        </Text>
                        <View
                            style={[
                                styles.inputWrapper,
                                {
                                    backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                                    borderColor: isDark ? colors.borderDark : colors.border,
                                },
                            ]}
                        >
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={isDark ? colors.textSecondaryDark : colors.textSecondary}
                            />
                            <TextInput
                                style={[styles.input, { color: isDark ? colors.textDark : colors.text }]}
                                placeholder="Enter your password"
                                placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={20}
                                    color={isDark ? colors.textSecondaryDark : colors.textSecondary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Button
                        title="Sign In"
                        onPress={handleLogin}
                        variant="primary"
                        size="large"
                        fullWidth
                        loading={loading}
                        // removed gradient prop
                        style={styles.loginButton}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={[styles.linkText, { color: colors.primary }]}>
                            Don't have an account? <Text style={styles.linkBold}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.xxl,
    },
    header: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    logoText: {
        fontSize: 40,
        fontWeight: FONT_WEIGHTS.bold,
        color: '#ffffff',
    },
    title: {
        fontSize: FONT_SIZES.xxxl,
        fontWeight: FONT_WEIGHTS.bold,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: FONT_SIZES.md,
    },
    form: {
        flex: 1,
    },
    label: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold,
        marginBottom: SPACING.sm,
    },
    roleContainer: {
        flexDirection: 'row',
        gap: SPACING.sm,
        marginBottom: SPACING.lg,
    },
    roleButton: {
        flex: 1,
        alignItems: 'center',
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 2,
        gap: SPACING.xs,
    },
    roleText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.semibold,
    },
    inputContainer: {
        marginBottom: SPACING.lg,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: BORDER_RADIUS.md,
        paddingHorizontal: SPACING.md,
        gap: SPACING.sm,
    },
    input: {
        flex: 1,
        paddingVertical: SPACING.md,
        fontSize: FONT_SIZES.md,
    },
    loginButton: {
        marginTop: SPACING.md,
        marginBottom: SPACING.lg,
    },
    linkText: {
        fontSize: FONT_SIZES.md,
        textAlign: 'center',
    },
    linkBold: {
        fontWeight: FONT_WEIGHTS.bold,
    },
});

export default LoginScreen;
