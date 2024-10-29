import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../styles/Theme';
import { AuthProps, RootStackParamList } from '../../types';

type ReminderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Reminders'>;

type Props = {
  navigation: ReminderScreenNavigationProp;
  isAiEnabled: boolean;
} & AuthProps;

const ReminderScreen = ({ navigation, setRegisteredUser, isAiEnabled }: Props) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (isAiEnabled) {
      playVoice();
    }
  }, [isAiEnabled]);

  const playVoice = () => {
    Speech.speak('This is the Reminder page. Click on the Pill icon to get started.', {
      onStart: () => setIsSpeaking(true),
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const stopVoice = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  const handleLogout = () => {
    setRegisteredUser(null);
    navigation.replace('Login');
  };

  const handleSettings = () => {
    navigation.navigate('Setting'); 
  };

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  const handlePauseResume = () => {
    if (isSpeaking) {
      stopVoice();
    } else {
      playVoice();
    }
  };

  const handleCloseAi = () => {
    stopVoice();
  };

  return (
    <View style={[globalStyles.container, styles.background]}>
      {/* Header with Logout and Settings button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Reminders</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* AI Assistance Section */}
      {isAiEnabled && (
        <View style={styles.aiContainer}>
          <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon} />
          <View style={styles.aiTextContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseAi}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.aiText}>
              This is the Reminder page. Click on the Pill icon to get started.
            </Text>
            <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
              <Text style={styles.controlButtonText}>{isSpeaking ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Reminder Card */}
      <TouchableOpacity style={styles.card} onPress={() => alert('Reminder Saved!')}>
        <Image
          source={require('../../assets/reminder.jpg')}
          style={styles.icon}
        />
        <Text style={styles.cardTitle}>Medicine Reminder</Text>
        <Text style={styles.cardSubtitle}>UI Card-based</Text>
      </TouchableOpacity>

      {/* Back to Home Button */}
      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 20 }]}
        onPress={handleNavigateToHome}
      >
        <Text style={globalStyles.buttonText}>Back to Home</Text>
      </TouchableOpacity>

      {/* Swipe Indicator */}
      <View style={styles.swipeIndicatorContainer}>
        <Text style={styles.swipeIndicator}>← Swipe left to "View/Edit Appointment"</Text>
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
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
    width: 180, // To make the box more vertical
    alignItems: 'center',
  },
  aiText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
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
  controlButton: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 12,
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
    elevation: 2,
  },
  swipeIndicator: {
    textAlign: 'center',
    color: 'purple',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReminderScreen;
