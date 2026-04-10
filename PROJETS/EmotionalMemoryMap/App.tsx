import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Pressable,
    Modal,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';

type Emotion = 'Love' | 'Loss' | 'Growth' | 'Joy';

type MemoryPin = {
    id: string;
    x: number;
    y: number;
    title: string;
    story: string;
    emotion: Emotion;
    imageUri: string;
};

const emotions: Emotion[] = ['Love', 'Loss', 'Growth', 'Joy'];
const worldMap = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1024px-World_map_-_low_resolution.svg.png',
};

function emotionColor(emotion: Emotion) {
    switch (emotion) {
        case 'Love':
            return '#f87171';
        case 'Loss':
            return '#64748b';
        case 'Growth':
            return '#34d399';
        case 'Joy':
            return '#facc15';
    }
}

export default function App() {
    const [pins, setPins] = useState<MemoryPin[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCoord, setSelectedCoord] = useState<{ x: number; y: number } | null>(null);
    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [emotion, setEmotion] = useState<Emotion>('Love');
    const [imageUri, setImageUri] = useState('');

    const handleMapPress = (event: any) => {
        const { locationX, locationY } = event.nativeEvent;
        setSelectedCoord({ x: locationX, y: locationY });
        setModalVisible(true);
    };

    const resetForm = () => {
        setTitle('');
        setStory('');
        setEmotion('Love');
        setImageUri('');
        setSelectedCoord(null);
    };

    const saveMemory = () => {
        if (!selectedCoord || !title.trim() || !story.trim()) {
            return;
        }

        const newPin: MemoryPin = {
            id: `${Date.now()}`,
            x: selectedCoord.x,
            y: selectedCoord.y,
            title: title.trim(),
            story: story.trim(),
            emotion,
            imageUri: imageUri.trim(),
        };

        setPins([newPin, ...pins]);
        setModalVisible(false);
        resetForm();
    };

    const renderPin = (pin: MemoryPin) => (
        <View
            key={pin.id}
            style={[
                styles.pin,
                {
                    left: pin.x - 10,
                    top: pin.y - 10,
                    backgroundColor: emotionColor(pin.emotion),
                },
            ]}
        />
    );

    const renderMemory = ({ item }: { item: MemoryPin }) => (
        <View style={styles.memoryCard}>
            <View style={styles.memoryHeader}>
                <Text style={styles.memoryEmotion}>{item.emotion}</Text>
                <Text style={styles.memoryTitle}>{item.title}</Text>
            </View>
            {item.imageUri ? (
                <ImageBackground source={{ uri: item.imageUri }} style={styles.memoryImage} imageStyle={styles.memoryImageInner}>
                    <View style={styles.memoryImageOverlay} />
                </ImageBackground>
            ) : null}
            <Text style={styles.memoryStory}>{item.story}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.brand}>Emotional Memory Map</Text>
                <Text style={styles.subtitle}>
                    Pin memories on an interactive world map and explore stories of love, loss, growth, and joy from everywhere.
                </Text>

                <Text style={styles.sectionTitle}>Tap anywhere to share a memory</Text>
                <Pressable onPress={handleMapPress} style={styles.mapWrapper}>
                    <ImageBackground source={worldMap} resizeMode="cover" style={styles.map}>
                        {pins.map(renderPin)}
                    </ImageBackground>
                </Pressable>

                <Text style={styles.sectionTitle}>Global stories</Text>
                {pins.length === 0 ? (
                    <Text style={styles.emptyText}>Your first story will appear here once you pin it.</Text>
                ) : (
                    <FlatList
                        data={pins}
                        keyExtractor={(item) => item.id}
                        renderItem={renderMemory}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.memoryList}
                    />
                )}
            </ScrollView>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Share a story</Text>
                        <Text style={styles.modalHint}>Choose an emotion, add a title, story text, and optional photo URL.</Text>
                        <View style={styles.fieldRow}>
                            {emotions.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[styles.emotionButton, emotion === option && styles.emotionButtonActive]}
                                    onPress={() => setEmotion(option)}
                                >
                                    <Text style={[styles.emotionButtonText, emotion === option && styles.emotionButtonTextActive]}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TextInput
                            placeholder="Title"
                            placeholderTextColor="#999"
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            placeholder="What happened here?"
                            placeholderTextColor="#999"
                            style={[styles.input, styles.storyInput]}
                            value={story}
                            onChangeText={setStory}
                            multiline
                        />
                        <TextInput
                            placeholder="Photo URL (optional)"
                            placeholderTextColor="#999"
                            style={styles.input}
                            value={imageUri}
                            onChangeText={setImageUri}
                        />
                        <View style={styles.modalActions}>
                            <Button title="Cancel" onPress={() => { setModalVisible(false); resetForm(); }} />
                            <Button title="Save memory" onPress={saveMemory} />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050816',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    brand: {
        fontSize: 30,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        color: '#c7d2fe',
        lineHeight: 22,
        marginBottom: 20,
    },
    sectionTitle: {
        color: '#e2e8f0',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    mapWrapper: {
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#111827',
        borderWidth: 1,
        borderColor: '#334155',
    },
    map: {
        width: '100%',
        aspectRatio: 1.8,
        justifyContent: 'center',
    },
    pin: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    emptyText: {
        color: '#94a3b8',
        fontSize: 15,
        marginBottom: 20,
    },
    memoryList: {
        paddingBottom: 18,
    },
    memoryCard: {
        width: 280,
        backgroundColor: '#0f172a',
        borderRadius: 22,
        padding: 16,
        marginRight: 16,
    },
    memoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    memoryEmotion: {
        color: '#f8fafc',
        fontWeight: '700',
    },
    memoryTitle: {
        color: '#e2e8f0',
        fontWeight: '800',
    },
    memoryImage: {
        width: '100%',
        height: 130,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 10,
    },
    memoryImageInner: {
        resizeMode: 'cover',
    },
    memoryImageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.14)',
    },
    memoryStory: {
        color: '#cbd5e1',
        lineHeight: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.55)',
    },
    modalContent: {
        backgroundColor: '#0f172a',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        minHeight: 420,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 8,
    },
    modalHint: {
        color: '#94a3b8',
        marginBottom: 16,
        lineHeight: 20,
    },
    fieldRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 14,
    },
    emotionButton: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#334155',
        marginRight: 8,
        marginBottom: 8,
    },
    emotionButtonActive: {
        backgroundColor: '#312e81',
        borderColor: '#6366f1',
    },
    emotionButtonText: {
        color: '#cbd5e1',
        fontWeight: '600',
    },
    emotionButtonTextActive: {
        color: '#eef2ff',
    },
    input: {
        backgroundColor: '#111827',
        color: '#e2e8f0',
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#334155',
    },
    storyInput: {
        minHeight: 96,
        textAlignVertical: 'top',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});
