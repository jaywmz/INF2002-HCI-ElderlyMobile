import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MedicineUpdateSuccess: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('CurrentReminder'); // Ensure this matches the name used in your navigation setup for the reminders list
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successMessage}>Medicine Reminder Updated Successfully!</Text>
      <Button title="Back to Reminders" onPress={handleGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  successMessage: {
    fontSize: 20,
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MedicineUpdateSuccess;
