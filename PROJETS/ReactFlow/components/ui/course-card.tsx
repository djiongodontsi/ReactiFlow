import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Headphones, Clock } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { Course } from '@/data/meditationData';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CourseCardProps {
    course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    const router = useRouter();
    const cardColor = useThemeColor({}, 'card');

    return (
        <TouchableOpacity
            className="p-4 rounded-2xl mb-4"
            style={{ backgroundColor: cardColor }}
            onPress={() => router.push(`/courses/${course.id}`)}
        >
            <LinearGradient
                colors={['transparent', 'rgba(139, 92, 246, 0.1)']}
                className="rounded-xl p-2 mb-3"
            >
                <Image
                    source={{ uri: course.image }}
                    className="w-full h-40 rounded-xl"
                    resizeMode="cover"
                />
            </LinearGradient>
            <ThemedText className="font-bold text-lg mb-2" type="title">
                {course.title}
            </ThemedText>
            <ThemedText className="text-base opacity-80 mb-3" type="default">
                {course.description}
            </ThemedText>
            <View className="flex-row items-center gap-3">
                <View className="flex-row items-center gap-1">
                    <Headphones size={16} color="#8B5CF6" />
                    <ThemedText className="text-sm" type="default">
                        {course.level}
                    </ThemedText>
                </View>
                <View className="flex-row items-center gap-1">
                    <Clock size={16} color="#8B5CF6" />
                    <ThemedText className="text-sm" type="default">
                        {course.duration} min
                    </ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    );
}

