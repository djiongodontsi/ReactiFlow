import React from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ParallaxScrollView from '@/components/parallax-scroll-view';

export default function ProfileScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#0F0F23' }}
            headerImage={
                <ThemedText className="text-6xl opacity-25" type="title">
                    👤
                </ThemedText>
            }
        >
            <ThemedView className="p-8">
                <ThemedText type="title" className="text-center mb-4">
                    Profile
                </ThemedText>
                <ThemedText className="text-center opacity-70">
                    User settings and meditation stats will appear here.
                </ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    );
}

