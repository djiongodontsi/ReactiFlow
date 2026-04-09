import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProfileScreen() {
    const handleFollow = () => {
        console.log('Suivre');
    };

    const handleMessage = () => {
        console.log('Message');
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#c7cec9', dark: '#2a5968' }}
            headerImage={
                <Image
                    source={require('@/assets/images/sombrero-de-graduado-azul-adulto-216215-2.webp')}
                    style={StyleSheet.absoluteFill}
                />
            }>
            <ThemedView style={styles.card}>
                <Image
                    source={{
                        uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
                    }}
                    style={styles.profileImage}
                />
                <ThemedText type="title" style={styles.name}>Jean Dupont</ThemedText>
                <ThemedText style={styles.bio}>Développeur React Native passionné par les apps mobiles. Cameroun 🇨🇲</ThemedText>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleFollow} activeOpacity={0.7}>
                        <IconSymbol name="person.badge.plus" size={20} />
                        <ThemedText style={styles.buttonText}>Suivre</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.messageButton]} onPress={handleMessage} activeOpacity={0.7}>
                        <IconSymbol name="message" size={20} />
                        <ThemedText style={styles.buttonText}>Message</ThemedText>
                    </TouchableOpacity>
                </View>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        borderWidth: 4,
        borderColor: '#0a7ea4',
    },
    name: {
        marginBottom: 8,
        textAlign: 'center',
    },
    bio: {
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
        lineHeight: 22,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        backgroundColor: 'rgba(10, 126, 164, 0.9)',
    },
    messageButton: {
        backgroundColor: 'rgba(59, 130, 246, 0.9)',
    },
    buttonText: {
        marginLeft: 8,
        fontWeight: '600',
    },
});

