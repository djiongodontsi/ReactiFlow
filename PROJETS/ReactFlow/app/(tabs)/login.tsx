import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const validateEmail = (value: string): string | null => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value) ? null : 'Email invalide';
    };

    const validatePassword = (value: string): string | null => {
        return value.length >= 6 ? null : 'Mot de passe trop court (min 6)';
    };

    const handleSubmit = () => {
        const emailError = validateEmail(email) ?? undefined;
        const passwordError = validatePassword(password) ?? undefined;

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        setErrors({});
        Alert.alert('Succès', 'Connexion réussie !');
        // TODO: Navigation login
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ThemedView style={styles.formCard}>
                <ThemedText type="title" style={styles.title}>Connexion</ThemedText>

                <View style={styles.inputGroup}>
                    <ThemedText style={styles.label}>Email</ThemedText>
                    <TextInput
                        style={[styles.input, errors.email && styles.inputError]}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder="votre@email.com"
                    />
                    {errors.email && <ThemedText style={styles.errorText}>{errors.email}</ThemedText>}
                </View>

                <View style={styles.inputGroup}>
                    <ThemedText style={styles.label}>Mot de passe</ThemedText>
                    <TextInput
                        style={[styles.input, errors.password && styles.inputError]}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholder="********"
                    />
                    {errors.password && <ThemedText style={styles.errorText}>{errors.password}</ThemedText>}
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.7}>
                    <ThemedText style={styles.submitText}>Se connecter</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
    },
    formCard: {
        padding: 40,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    title: {
        textAlign: 'center',
        marginBottom: 40,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        borderWidth: 2,
        borderColor: '#ccc',
        padding: 15,
        borderRadius: 12,
        fontSize: 16,
    },
    inputError: {
        borderColor: '#ff3b30',
    },
    errorText: {
        color: '#ff3b30',
        fontSize: 14,
        marginTop: 4,
    },
    submitButton: {
        backgroundColor: 'rgba(10, 126, 164, 0.9)',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    submitText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

