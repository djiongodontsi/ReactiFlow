import { useState, useMemo } from 'react';
import { FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

import { CONTACTS } from '@/data/contactsData';


export default function ContactsScreen() {
    const [search, setSearch] = useState('');

    const filteredContacts = useMemo(() =>
        CONTACTS.filter(contact =>
            contact.name.toLowerCase().includes(search.toLowerCase()) ||
            contact.phone.includes(search)
        ), [search]
    );

    const renderContact = ({ item }: { item: typeof CONTACTS[0] }) => (
        <TouchableOpacity style={styles.contactItem} activeOpacity={0.7}>
            <IconSymbol name="person.circle" size={50} color="#687076" />
            <View style={styles.contactInfo}>
                <ThemedText type="defaultSemiBold" style={styles.contactName}>{item.name}</ThemedText>
                <ThemedText style={styles.contactPhone}>{item.phone}</ThemedText>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
                placeholder="Rechercher un contact..."
                autoCapitalize="none"
            />
            <FlatList
                data={filteredContacts}
                renderItem={renderContact}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchInput: {
        borderWidth: 2,
        borderColor: '#ccc',
        padding: 15,
        borderRadius: 12,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    list: {
        paddingBottom: 20,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        marginBottom: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    contactInfo: {
        marginLeft: 16,
        flex: 1,
    },
    contactName: {
        fontSize: 18,
        marginBottom: 4,
    },
    contactPhone: {
        fontSize: 16,
        opacity: 0.8,
    },
});

