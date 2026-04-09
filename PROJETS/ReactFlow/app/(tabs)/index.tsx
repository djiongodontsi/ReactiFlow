import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [count, setCount] = useState(0);
  const [articleCounts, setArticleCounts] = useState<Record<number, number>>({});

  const articles = [
    { id: 1, title: 'Article sur le Cameroun' },
    { id: 2, title: 'Article sur la Technologie' },
    { id: 3, title: 'Article sur React Native' },
  ];

  const incrementArticle = (id: number) => {
    setArticleCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#c7cec9', dark: '#2a5968' }}
      headerImage={
        <Image
          source={require('@/assets/images/sombrero-de-graduado-azul-adulto-216215-2.webp')}
          style={StyleSheet.absoluteFill}
        />
      }
    >
      <View style={styles.articlesContainer}>
        {articles.map((article) => (
          <TouchableOpacity
            key={article.id}
            onPress={() => incrementArticle(article.id)}
            activeOpacity={0.7}
            style={styles.articleButton}
          >
            <ThemedText type="title" style={styles.articleTitle}>
              {article.title}
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.articleCount}>
              Compteur: {articleCounts[article.id] || 0}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.camerounSection}>
        <Text style={styles.camerounText}>Cameroun</Text>
        <Image
          source={{
            uri: 'https://imgs.search.brave.com/awB9O3hLj6CqxMEvew1xZxjh6Ui0f9h7sfniXbAjoDk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRpYS5pc3RvY2twaG90by5jb20vaWQvNTgzNzM2MjUwL2ZyL3Bob3RvL2NhbWVyb3VuLSVDMyVBOXBpbmdsJUMzJUE5LXN1ci1sYS1jYXJ0ZS1hdmVjLWRyYXBlYXUuanBnP3M9NjEyXDYxMiZ3PTAmaz0yMCZjPWhYNmVVQVJxS2RrbDJjRnNVeGh0UjZudFRXbnBBMFhTLUV5WHVJTUlSQ3M9',
          }}
          style={styles.camerounImage}
        />
        <TextInput
          style={styles.textInput}
          placeholder="ENTREZ UN COMMENTAIRE SUR LE PAYS"
          multiline
        />
      </View>

      <ThemedView style={styles.counterContainer}>
        <TouchableOpacity onPress={() => setCount(count + 10)} activeOpacity={0.7}>
          <ThemedText type="title" style={styles.counterText}>
            {count}
          </ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.counterLabel}>Tap to count up</ThemedText>
      </ThemedView>

      <View style={styles.stepContainer}>
        <ThemedText type="title">Made with love</ThemedText>
        <HelloWave />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  articlesContainer: {
    gap: 12,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  articleButton: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    alignItems: 'center',
  },
  articleTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  articleCount: {
    fontSize: 24,
  },
  camerounSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  camerounText: {
    backgroundColor: 'red',
    fontFamily: 'Cochin',
    fontSize: 24,
    padding: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  camerounImage: {
    borderWidth: 10,
    borderColor: 'black',
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 15,
  },
  textInput: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 2,
    padding: 15,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  counterContainer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(127, 205, 219, 0.95)',
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  counterLabel: {
    marginTop: 8,
    opacity: 0.8,
  },
});

