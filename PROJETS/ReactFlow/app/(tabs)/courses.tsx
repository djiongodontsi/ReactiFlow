import React from 'react';
import { FlatList, View, TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CourseCard } from '@/components/ui/course-card';
import { mockCourses } from '@/data/meditationData';
import { useState } from 'react';

export default function CoursesScreen() {
    const [search, setSearch] = useState('');

    const filteredCourses = mockCourses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <ThemedView className="flex-1">
            <View className="p-4">
                <TextInput
                    className="bg-white/10 rounded-2xl p-4 text-white"
                    placeholder="Search courses..."
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <FlatList
                data={filteredCourses}
                renderItem={({ item }) => <CourseCard course={item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ padding: 16 }}
            />
        </ThemedView>
    );
}

