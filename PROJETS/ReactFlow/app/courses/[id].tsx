import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CourseCard } from '@/components/ui/course-card';
import { getCourseById } from '@/data/meditationData';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

export default function CourseDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCourseById(id as string).then(setCourse).finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <ActivityIndicator className="flex-1 justify-center" />;
    }

    if (!course) {
        return (
            <ThemedView className="flex-1 justify-center items-center p-8">
                <ThemedText className="text-center">Course not found</ThemedText>
            </ThemedView>
        );
    }

    const renderSession = ({ item }: { item: any }) => (
        <View className="p-4 border-b border-white/10">
            <ThemedText type="title" className="mb-2">
                {item.title}
            </ThemedText>
            <ThemedText className="opacity-70 mb-2">
                {item.duration} min
            </ThemedText>
            <ThemedText className="opacity-60 text-xs">
                Tap to play session
            </ThemedText>
        </View>
    );

    return (
        <ThemedView className="flex-1">
            <ThemedText type="title" className="p-4 text-xl">
                {course.title}
            </ThemedText>
            <FlatList
                data={course.sessions}
                renderItem={renderSession}
                keyExtractor={(item) => item.id}
                className="flex-1"
            />
        </ThemedView>
    );
}

