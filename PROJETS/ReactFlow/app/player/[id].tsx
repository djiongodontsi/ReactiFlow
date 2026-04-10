import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StatusBar, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useThemeColor } from '@/hooks/use-theme-color';
import { AudioPlayerControls } from '@/components/ui/audio-player-controls';
import { ThemedText } from '@/components/themed-text';
import { getCourseById } from '@/data/meditationData';
import { View } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

export default function AudioPlayerScreen() {
    const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
    const router = useRouter();
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const gradientStart = useThemeColor({}, 'gradientStart');
    const gradientEnd = useThemeColor({}, 'gradientEnd');

    useEffect(() => {
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, [sound]);

    useEffect(() => {
        if (!sessionId) return;

        // Mock session audio URL based on sessionId
        const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

        playSound(audioUrl);
    }, []);

    async function playSound(uri: string) {
        const { sound } = await Audio.Sound.createAsync(
            { uri },
            { shouldPlay: true }
        );
        setSound(sound);
        setIsPlaying(true);

        await sound.playAsync();

        sound.setOnPlaybackStatusUpdate(status => {
            if (status.isLoaded) {
                setProgress(status.positionMillis! / status.playableDurationMillis!);
                setDuration(status.playableDurationMillis || 0);
                setCurrentTime(formatTime(status.positionMillis || 0));
                setIsPlaying(status.isPlaying || false);
            }
        });
    }

    async function onPlayPause() {
        if (!sound) return;
        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
    }

    async function onSliderValueChange(value: number) {
        if (sound && duration > 0) {
            await sound.setPositionAsync(value * duration);
        }
    }

    const formatTime = (millis: number) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <LinearGradient
                colors={[gradientStart, gradientEnd]}
                className="flex-1"
            >
                <TouchableOpacity
                    className="p-4"
                    onPress={() => router.back()}
                >
                    <Text className="text-white text-lg">← Back</Text>
                </TouchableOpacity>

                <View className="flex-1 justify-center">
                    <AudioPlayerControls
                        isPlaying={isPlaying}
                        onPlayPause={onPlayPause}
                        onSkipBack={() => { }}
                        onSkipForward={() => { }}
                        progress={progress}
                        duration={duration}
                        currentTime={currentTime}
                        onSliderValueChange={onSliderValueChange}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

