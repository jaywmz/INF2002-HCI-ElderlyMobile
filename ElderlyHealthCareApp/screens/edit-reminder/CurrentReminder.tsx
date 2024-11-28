import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Medicine {
  id: string;
  name: string;
  date: string;
  time: string;
  image: any; // Define the type as `any` for imported images with `require`
}

// List of medicines with images
const medicines: Medicine[] = [
  {
    id: '1',
    name: 'Aspirin',
    date: '2024-11-15',
    time: '08:00 AM',
    image: require('../../assets/aspirin.jpg'),
  },
  {
    id: '2',
    name: 'Ibuprofen',
    date: '2024-11-15',
    time: '06:00 PM',
    image: require('../../assets/ibuprofen.jpg'),
  },
];

const CurrentReminder: React.FC = () => {
  const navigation = useNavigation();

  const handleEditPress = (medicine: Medicine) => {
    navigation.navigate('EditReminder', { medicine });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Medicine Reminders</Text>
      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderCard}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.medicine}>{item.name}</Text>
              <Text style={styles.date}>Date: {item.date}</Text>
              <Text style={styles.time}>Time: {item.time}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditPress(item)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fbe4e4',
    overflow: 'hidden',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  reminderCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 15,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 8,
  },
  detailsContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  medicine: {
    fontSize: 32,
    color: '#333',
    marginBottom: 5,
  },
  date: {
    fontSize: 24,
    color: '#555',
    marginBottom: 5,
  },
  time: {
    fontSize: 24,
    color: '#555',
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    width: '90%',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default CurrentReminder;
