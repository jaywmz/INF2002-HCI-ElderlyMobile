import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

interface Medicine {
  id: string;
  name: string;
  date: string;
  time: string;
  image: any; // Define the type as `any` for imported images with `require`
}

const UpdateMedicineScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { medicine } = route.params as { medicine: Medicine };

  // Set initial state based on the selected medicine details
  const [name, setName] = useState(medicine.name);
  const [date, setDate] = useState(medicine.date);
  const [time, setTime] = useState(medicine.time);

  const handleUpdate = () => {
    // Here you would typically save the updates to state or database
    navigation.navigate('EditSuccess'); // Navigate to the success page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update {medicine.name} Reminder</Text>
      
      {/* Display the medicine image */}
      <Image source={medicine.image} style={styles.image} />

      <Text style={styles.label}>Medicine Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Date</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} />

      <Text style={styles.label}>Time</Text>
      <TextInput style={styles.input} value={time} onChangeText={setTime} />

      <Button title="Update Reminder" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fbe4e4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
  },
});

export default UpdateMedicineScreen;
