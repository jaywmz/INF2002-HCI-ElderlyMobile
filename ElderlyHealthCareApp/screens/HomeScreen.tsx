import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/Theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, AuthProps } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
} & AuthProps;

const HomeScreen = ({ navigation, registeredUser, setRegisteredUser }: Props) => {
  const handleLogout = () => {
    setRegisteredUser(null);
    navigation.replace('Login');
  };

  return (
    <View style={[globalStyles.container, styles.background]}>
      {/* Header with Logout and Settings button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Home</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Message */}
      <Text style={globalStyles.headerText}>Welcome, {registeredUser?.username}!</Text>

      {/* Navigation Buttons with Icons for Services */}
      <TouchableOpacity
        style={[styles.serviceButton, { marginTop: 20 }]}
        onPress={() => navigation.navigate('Create Appointment')}
      >
        <Image source={require('../assets/calendar.jpg')} style={styles.icon} />
        <Text style={styles.buttonText}>Create Appointment</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.serviceButton}
        onPress={() => navigation.navigate('View/Edit Appointment')}
      >
        <Image source={require('../assets/edit.jpg')} style={styles.icon} />
        <Text style={styles.buttonText}>View/Edit Appointment</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.serviceButton}
        onPress={() => navigation.navigate('Reminders')}
      >
        <Image source={require('../assets/reminder.jpg')} style={styles.icon} />
        <Text style={styles.buttonText}>Reminders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fbe4e4', // Background color for Home Screen
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomeScreen;
