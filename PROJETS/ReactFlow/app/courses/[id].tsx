import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { Headphones } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getCourseById } from '@/data/meditationData';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

export default function CourseDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
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
        <TouchableOpacity
            className="p-6 border-b border-white/10"
            onPress={() => router.push(`/player/${item.id}`)}
        >
            <ThemedText type="title" className="mb-3">
                {item.title}
            </ThemedText>
            <ThemedText className="opacity-70 mb-4">
                {item.duration} min session
            </ThemedText>
            <ThemedView className="flex-row items-center gap-2 px-4 py-3 rounded-xl bg-white/5">
                <Headphones size={20} color="#8B5CF6" />
                <ThemedText className="font-medium">Play Session</ThemedText>
            </ThemedView>
        </TouchableOpacity>
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

