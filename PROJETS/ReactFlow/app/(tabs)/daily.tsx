import React from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, TrendingUp } from 'lucide-react-native';

export default function DailyScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#f8fafc', dark: '#0F0F23' }}
            parallaxHeaderHeight={280}
            renderFixedHeader={() => (
                <LinearGradient
                    colors={['#0F0F23', '#1E1E3F']}
                    className="h-70 items-center justify-center px-8"
                >
                    <Calendar size={64} color="#A78BFA" />
                    <ThemedText type="title" className="text-3xl font-bold mt-4 mb-2">
                        Daily Practice
                    </ThemedText>
                    <ThemedText className="text-lg opacity-90 text-center px-8">
                        5 day streak ✨
                    </ThemedText>
                </LinearGradient>
            )}
        >
            <ThemedView className="p-6">
                <ThemedView className="flex-row items-center gap-3 mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                    <TrendingUp size={24} color="#EC4899" />
                    <View>
                        <ThemedText className="font-bold text-lg">Total Time</ThemedText>
                        <ThemedText className="opacity-80 text-xl">2h 47m</ThemedText>
                    </View>
                </ThemedView>

                <ThemedView className="space-y-4">
                    <ThemedView className="p-4 rounded-2xl bg-white/5">
                        <ThemedText className="opacity-70 mb-2">Today's Recommendation</ThemedText>
                        <ThemedView className="flex-row items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20">
                            <ThemedText className="font-bold text-lg flex-1">5 Min Breathwork</ThemedText>
                            <TouchableOpacity className="p-3 bg-emerald-500 rounded-xl">
                                <Play size={20} color="white" />
                            </TouchableOpacity>
                        </ThemedView>
                    </ThemedView>

                    <ThemedView className="p-4 rounded-2xl bg-white/5">
                        <ThemedText className="font-bold mb-4">Recent Sessions</ThemedText>
                        <ThemedView className="space-y-3">
                            <ThemedView className="flex-row items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
                                <View>
                                    <ThemedText className="font-semibold mb-1">Morning Calm</ThemedText>
                                    <ThemedText className="opacity-70 text-sm">12 min • Yesterday</ThemedText>
                                </View>
                                <ThemedView className="w-20 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" />
                            </ThemedView>
                            <ThemedView className="flex-row items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10">
                                <View>
                                    <ThemedText className="font-semibold mb-1">Stress Relief</ThemedText>
                                    <ThemedText className="opacity-70 text-sm">7 min • 2 days ago</ThemedText>
                                </View>
                                <ThemedView className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full" />
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ParallaxScrollView>
    );
}

