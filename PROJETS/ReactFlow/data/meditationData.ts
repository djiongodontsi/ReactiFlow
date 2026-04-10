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
        description: 'Start your day with gentle breathing and mindfulness.',
        level: 'beginner',
        duration: 10,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300',
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
        description: 'Unwind with guided relaxation techniques.',
        level: 'intermediate',
        duration: 20,
        image: 'https://images.unsplash.com/photo-1451402512658-3a9b4f4b7674?w=300',
        sessions: [
            {
                id: '2-1',
                title: 'Progressive Relaxation',
                duration: 10,
                audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            },
        ],
    },
    // Add more...
];

export const getCourses = async (): Promise<Course[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCourses;
};

export const getCourseById = async (id: string): Promise<Course | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCourses.find(c => c.id === id);
};
