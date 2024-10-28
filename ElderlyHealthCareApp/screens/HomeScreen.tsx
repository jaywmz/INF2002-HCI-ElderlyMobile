import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/Theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, AuthProps } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  isAiEnabled: boolean;
} & AuthProps;

const HomeScreen = ({ navigation, registeredUser, setRegisteredUser, isAiEnabled }: Props) => {
  const [showAi, setShowAi] = useState(isAiEnabled);

  useEffect(() => {
    // Update showAi whenever isAiEnabled changes
    setShowAi(isAiEnabled);
  }, [isAiEnabled]);

  const handleLogout = () => {
    setRegisteredUser(null);
    navigation.replace('Login');
  };

  const handleSettings = () => {
    navigation.navigate('Setting'); 
  };

  const handleCloseAi = () => {
    setShowAi(false);
  };

  return (
    <View style={[globalStyles.container, styles.background]}>
      {/* Header with Logout and Settings button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Home</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Message */}
      <Text style={globalStyles.headerText}>Welcome, {registeredUser?.username}!</Text>

      {/* AI Assistance Section */}
      {showAi && (
        <View style={styles.aiContainer}>
          <Image source={require('../assets/AI_nurse.jpg')} style={styles.aiIcon} />
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiText}>Welcome, I am Joy, How can I assist you today?</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseAi}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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

      {/* Swipe Indicator */}
      <View style={styles.swipeIndicatorContainer}>
        <Text style={styles.swipeIndicator}>Swipe right to access "Create Appointment" →</Text>
      </View>
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
  aiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  aiIcon: {
    width: 50,
    height: 80,
    marginRight: 10,
  },
  aiTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  aiText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 15,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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

export default HomeScreen;
