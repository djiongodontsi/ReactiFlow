export interface Course {
    id: string;
    title: string;
    description: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration: number; // minutes
    image: string;
    sessions: Session[];
}

export interface Session {
    id: string;
    title: string;
    duration: number;
    audioUrl: string;
    image?: string;
}

export const mockCourses: Course[] = [
    {
        id: '1',
        title: 'Morning Calm',
        description: 'Start your day with gentle breathing and mindfulness to set a peaceful tone.',
        level: 'beginner',
        duration: 10,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&fm=webp',
        sessions: [
            {
                id: '1-1',
                title: 'Breath Awareness',
                duration: 5,
                audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            },
            {
                id: '1-2',
                title: 'Body Scan',
                duration: 5,
                audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            },
        ],
    },
    {
        id: '2',
        title: 'Deep Relaxation',
        description: 'Unwind with guided progressive muscle relaxation techniques.',
        level: 'intermediate',
        duration: 20,
        image: 'https://images.unsplash.com/photo-1451402512658-3a9b4f4b7674?w=400&fm=webp',
        sessions: [
            {
                id: '2-1',
                title: 'Full Body Relaxation',
                duration: 10,
                audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            },
            {
                id: '2-2',
                title: 'Guided Visualization',
                duration: 10,
                audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
            },
        ],
    },
    {
        id: '3',
        title: 'Stress Relief',
        description: 'Quick techniques to melt away daily stress and tension.',
        level: 'beginner',
        duration: 7,
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&fm=webp',
        sessions: [
            {
                id: '3-1',
                title: '4-7-8 Breathing',
                duration: 4,
                audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
            },
            {
                id: '3-2',
                title: 'Tension Release',
                duration: 3,
                audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
            },
        ],
    },
    {
        id: '4',
        title: 'Sleep Meditation',
        description: 'Drift into deep, restorative sleep with gentle guidance.',
        level: 'intermediate',
        duration: 25,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fm=webp',
        sessions: [
            {
                id: '4-1',
                title: 'Nighttime Wind Down',
                duration: 12,
                audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
            },
            {
                id: '4-2',
                title: 'Deep Sleep Induction',
                duration: 13,
                audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
            },
        ],
    },
    {
        id: '5',
        title: 'Mindfulness Masterclass',
        description: 'Advanced practices for cultivating deep awareness.',
        level: 'advanced',
        duration: 45,
        image: 'https://images.unsplash.com/photo-1588078795345-74a1587b5bf9?w=400&fm=webp',
        sessions: [
            {
                id: '5-1',
                title: 'Open Awareness',
                duration: 22,
                audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
            },
            {
                id: '5-2',
                title: 'Insight Meditation',
                duration: 23,
                audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
            },
        ],
    },
];

export const getCourses = async (): Promise<Course[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockCourses;
};

export const getCourseById = async (id: string): Promise<Course | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCourses.find(c => c.id === id);
};

