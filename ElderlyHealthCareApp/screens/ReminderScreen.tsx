import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/Theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, AuthProps } from '../types';

type ReminderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Reminders'>;

type Props = {
  navigation: ReminderScreenNavigationProp;
} & AuthProps;

const ReminderScreen = ({ navigation, setRegisteredUser }: Props) => {
  const handleLogout = () => {
    setRegisteredUser(null); // Clear registered user state
    navigation.replace('Login'); // Navigate back to the Login screen
  };

  return (
    <View style={[globalStyles.container, styles.background]}>
      {/* Header with Logout button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Reminders</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Reminder Screen Content */}
      <Text style={globalStyles.headerText}>Set Your Medicine Reminders Here</Text>
      
      {/* Save Reminder button */}
      <TouchableOpacity style={globalStyles.button} onPress={() => alert('Reminder Saved!')}>
        <Text style={globalStyles.buttonText}>Save Reminder</Text>
      </TouchableOpacity>

      {/* Back to Home button */}
      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 10 }]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={globalStyles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fbe4e4', // Background color for Reminder Screen
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  logoutButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e0e0e0', // Grey background for button
    borderRadius: 5,
  },
  logoutText: {
    color: '#333',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  settingsText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default ReminderScreen;
