import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CourseCard = ({ title }: { title: string }) => {
    return (
        <View style={styles.card}>
            <Text>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginVertical: 10,
    },
});