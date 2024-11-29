import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

const thumbsUpImage = require('../../assets/thumbsup-icon.png');

const MedicineUpdateSuccess: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('Current Appointment'); // Ensure this matches the name used in your navigation setup for the reminders list
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image source={thumbsUpImage} style={{ width: 100, height: 100 }} />
      </View>
      <Text style={styles.successMessage}>Appointment Rescheduled Successfully!</Text>
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Back to Reminders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fbe4e4',
  },
  successMessage: {
    fontSize: 32,
    color: '#4CAF50',
    margin: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MedicineUpdateSuccess;
