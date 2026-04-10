import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { CourseCard } from '@/components/ui/course-card';
import { getCourses } from '@/data/meditationData';
import { ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses().then(setCourses).finally(() => setLoading(false));
  }, []);

  const gradientStart = useThemeColor({}, 'gradientStart');
  const gradientEnd = useThemeColor({}, 'gradientEnd');

  if (loading) {
    return (
      <LinearGradient colors={[gradientStart, gradientEnd]} className="flex-1">
        <ActivityIndicator className="flex-1 justify-center" size="large" color="#8B5CF6" />
      </LinearGradient>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f8fafc', dark: gradientStart }}
      parallaxHeaderHeight={250}
      renderFixedHeader={() => (
        <LinearGradient
          colors={[gradientStart, gradientEnd]}
          className="h-64 items-center justify-center px-8"
        >
          <ThemedText type="title" className="text-4xl font-bold text-center mb-4">
            Meditation
          </ThemedText>
          <ThemedText className="text-xl opacity-90 text-center px-8">
            Find peace in every breath. Browse courses and start your journey.
          </ThemedText>
        </LinearGradient>
      )}
    >
      <ThemedView className="p-4">
        <ThemedText type="subtitle" className="mb-4">
          Featured Courses
        </ThemedText>
        <FlatList
          data={courses.slice(0, 4)}
          renderItem={({ item }) => <CourseCard course={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingHorizontal: 8 }}
          keyExtractor={(item) => item.id}
        />
        <ThemedText type="subtitle" className="mt-8 mb-4">
          All Courses
        </ThemedText>
        <FlatList
          data={courses}
          renderItem={({ item }) => <CourseCard course={item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

