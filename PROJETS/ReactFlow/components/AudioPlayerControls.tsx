import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export const AudioPlayerControls = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text>Play / Pause</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
    },
    button: {
        padding: 15,
        backgroundColor: '#007AFF',
        borderRadius: 50,
    },
});