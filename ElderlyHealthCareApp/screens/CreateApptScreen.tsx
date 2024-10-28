import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, AuthProps } from '../types';
import { globalStyles } from '../styles/Theme';

type CreateApptScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Create Appointment'>;

type Props = {
  navigation: CreateApptScreenNavigationProp;
} & AuthProps;

const CreateApptScreen = ({ navigation, setRegisteredUser }: Props) => {
  const handleLogout = () => {
    setRegisteredUser(null); // Clear registered user state
    navigation.replace('Login'); // Navigate back to the Login screen
  };

  const handleSettings = () => {
    navigation.navigate('Setting'); 
  };

  const handleNavigateToLocations = () => {
    // Navigate to the actual service screen (replace 'Home' with correct screen if necessary)
    navigation.navigate('Locations');
  };

  return (
    <View style={[globalStyles.container, styles.background]}>
      {/* Header with Logout button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Create Appt</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Main Appointment Card with TouchableOpacity */}
      <TouchableOpacity style={styles.card} onPress={handleNavigateToLocations}>
        <Image
          source={require('../assets/calendar.jpg')}
          style={styles.icon}
        />
        <Text style={styles.cardTitle}>Create Appointment</Text>
        <Text style={styles.cardSubtitle}>UI Card-based</Text>
      </TouchableOpacity>

      {/* Back to Home Button */}
      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 20 }]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={globalStyles.buttonText}>Back to Home</Text>
      </TouchableOpacity>

      {/* Swipe Indicators */}
      <View style={styles.swipeIndicatorContainer}>
        <Text style={styles.swipeIndicator}>← Swipe left to go to "Home"</Text>
        <Text style={styles.swipeIndicator}>Swipe right to "View/Edit Appointment" →</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fbe4e4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
  logoutButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e0e0e0',
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
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 50,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#555',
  },
  swipeIndicatorContainer: {
    marginTop: 50,
    alignSelf: 'center',
    backgroundColor: '#fce4ec', // Light pink background for swipe indicator
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2, // For Android shadow
  },
  swipeIndicator: {
    textAlign: 'center',
    color: 'purple',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateApptScreen;
