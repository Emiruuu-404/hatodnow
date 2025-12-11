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
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../../constants/theme';
import { USER_ROLES } from '../../constants';

type RegisterNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
    const navigation = useNavigation<RegisterNavigationProp>();
    const { register } = useAuth();
    const { colors, isDark } = useTheme();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState<keyof typeof USER_ROLES>('CUSTOMER');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !phone || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await register(name, email, phone, password, selectedRole);
        } catch (error) {
            Alert.alert('Error', 'Registration failed. Please try again.');
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
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={isDark ? colors.textDark : colors.text} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={[styles.title, { color: isDark ? colors.textDark : colors.text }]}>
                        Create Account
                    </Text>
                    <Text style={[styles.subtitle, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                        Join HatodNow! today
                    </Text>
                </View>

                <View style={styles.form}>
                    <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>
                        Register as
                    </Text>
                    <View style={styles.roleContainer}>
                        {roles.map((role) => (
                            <TouchableOpacity
                                key={role.key}
                                style={[
                                    styles.roleButton,
                                    {
                                        backgroundColor: selectedRole === role.key
                                            ? colors.primary
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
                                    size={20}
                                    color={selectedRole === role.key ? '#ffffff' : colors.textSecondary}
                                />
                                <Text
                                    style={[
                                        styles.roleText,
                                        {
                                            color: selectedRole === role.key
                                                ? '#ffffff'
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
                            Full Name
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
                                name="person-outline"
                                size={20}
                                color={isDark ? colors.textSecondaryDark : colors.textSecondary}
                            />
                            <TextInput
                                style={[styles.input, { color: isDark ? colors.textDark : colors.text }]}
                                placeholder="Enter your full name"
                                placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
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
                            Phone Number
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
                                name="call-outline"
                                size={20}
                                color={isDark ? colors.textSecondaryDark : colors.textSecondary}
                            />
                            <TextInput
                                style={[styles.input, { color: isDark ? colors.textDark : colors.text }]}
                                placeholder="+63 912 345 6789"
                                placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
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
                                placeholder="Create a password"
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

                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>
                            Confirm Password
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
                                placeholder="Confirm your password"
                                placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showPassword}
                            />
                        </View>
                    </View>

                    <Button
                        title="Create Account"
                        onPress={handleRegister}
                        variant="primary"
                        size="large"
                        fullWidth
                        loading={loading}
                        gradient
                        style={styles.registerButton}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={[styles.linkText, { color: colors.primary }]}>
                            Already have an account? <Text style={styles.linkBold}>Sign In</Text>
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
        paddingTop: SPACING.xxl,
        paddingBottom: SPACING.xl,
    },
    backButton: {
        marginBottom: SPACING.lg,
    },
    header: {
        marginBottom: SPACING.xl,
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
        padding: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 2,
        gap: 4,
    },
    roleText: {
        fontSize: FONT_SIZES.xs,
        fontWeight: FONT_WEIGHTS.semibold,
    },
    inputContainer: {
        marginBottom: SPACING.md,
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
    registerButton: {
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

export default RegisterScreen;
