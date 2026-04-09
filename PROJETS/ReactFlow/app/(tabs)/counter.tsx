import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CounterScreen() {
    const [count, setCount] = useState(0);
    const [maxLimit, setMaxLimit] = useState('10');

    const parsedMax = parseInt(maxLimit) || 10;
    const maxNumber = isNaN(parsedMax) ? 10 : parsedMax;

    const increment = () => {
        if (count < maxNumber) setCount(count + 1);
    };

    const decrement = () => {
        if (count > 0) setCount(count - 1);
    };

    const reset = () => setCount(0);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ThemedView style={styles.counterCard}>
                <ThemedText type="title" style={styles.countText}>{count}</ThemedText>
                <ThemedText style={styles.limitText}>Limite max: {maxNumber}</ThemedText>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity style={styles.button} onPress={decrement} activeOpacity={0.7}>
                        <ThemedText style={styles.buttonText}>-</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={increment} activeOpacity={0.7}>
                        <ThemedText style={styles.buttonText}>+</ThemedText>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.resetButton} onPress={reset} activeOpacity={0.7}>
                    <ThemedText style={styles.resetText}>Reset</ThemedText>
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <ThemedText style={styles.inputLabel}>Nouvelle limite max:</ThemedText>
                    <TextInput
                        style={styles.input}
                        value={maxLimit}
                        onChangeText={setMaxLimit}
                        keyboardType="numeric"
                        placeholder="ex: 50"
                    />
                </View>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
    },
    counterCard: {
        width: '100%',
        padding: 40,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    countText: {
        fontSize: 80,
        marginBottom: 20,
    },
    limitText: {
        fontSize: 18,
        marginBottom: 30,
        opacity: 0.8,
    },
    buttonsRow: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 30,
    },
    button: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(10, 126, 164, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    resetButton: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 59, 48, 0.9)',
        marginBottom: 30,
    },
    resetText: {
        fontSize: 18,
        fontWeight: '600',
    },
    inputContainer: {
        alignItems: 'center',
        gap: 10,
    },
    inputLabel: {
        fontSize: 16,
    },
    input: {
        borderWidth: 2,
        borderColor: '#ccc',
        padding: 15,
        borderRadius: 12,
        width: 150,
        textAlign: 'center',
        fontSize: 18,
    },
});

