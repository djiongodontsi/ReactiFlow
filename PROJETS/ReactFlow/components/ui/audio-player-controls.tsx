import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Slider } from '@react-native-community/slider';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface AudioPlayerControlsProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    onSkipBack: () => void;
    onSkipForward: () => void;
    progress: number;
    duration: number;
    currentTime: string;
    onSliderValueChange: (value: number) => void;
}

export function AudioPlayerControls({
    isPlaying,
    onPlayPause,
    onSkipBack,
    onSkipForward,
    progress,
    duration,
    currentTime,
    onSliderValueChange,
}: AudioPlayerControlsProps) {
    const iconColor = useThemeColor({}, 'tint');

    return (
        <View className="flex-1 justify-center px-8">
            <Slider
                style={{ height: 40, width: '100%' }}
                minimumValue={0}
                maximumValue={1}
                value={progress}
                onSlidingComplete={onSliderValueChange}
                minimumTrackTintColor="#8B5CF6"
                maximumTrackTintColor="rgba(255,255,255,0.3)"
                thumbTintColor="#8B5CF6"
            />
            <View className="flex-row justify-between items-center mt-4 mb-12">
                <ThemedText className="text-sm opacity-80">{currentTime}</ThemedText>
                <ThemedText className="text-sm opacity-80">
                    {new Date(duration * 1000).toISOString().substr(14, 5)}
                </ThemedText>
            </View>
            <View className="flex-row items-center justify-center gap-8">
                <TouchableOpacity onPress={onSkipBack} className="p-3 rounded-full bg-white/10">
                    <SkipBack size={28} color={iconColor} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onPlayPause}
                    className="p-4 rounded-full bg-white/20 w-20 h-20 items-center justify-center"
                >
                    {isPlaying ? (
                        <Pause size={32} color="#fff" />
                    ) : (
                        <Play size={32} color="#fff" />
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={onSkipForward} className="p-3 rounded-full bg-white/10">
                    <SkipForward size={28} color={iconColor} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

