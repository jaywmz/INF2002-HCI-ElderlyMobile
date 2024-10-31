import { useFocusEffect } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { globalStyles } from '../../styles/Theme';
import { AuthProps } from '../../types';

type Props = {
  navigation: any;
  isAiEnabled: boolean;
  screenId: number; // Unique identifier for this screen
  currentScreenId: number | null; // The currently active screen ID
  setCurrentScreenId: React.Dispatch<React.SetStateAction<number | null>>; // Function to set the active screen ID
} & AuthProps;

const HomeScreen = ({ navigation, registeredUser, setRegisteredUser, isAiEnabled, screenId, currentScreenId, setCurrentScreenId }: Props) => {
  const [showAi, setShowAi] = useState(isAiEnabled);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showNextMessage, setShowNextMessage] = useState(false);

  // Use focus effect to detect when the screen becomes active
  useFocusEffect(
    useCallback(() => {
      // Set the current screen ID to this screen's ID when it becomes active
      setCurrentScreenId(screenId);

      // Reset the message to "Welcome" each time the screen is revisited
      setShowNextMessage(false);

      // Play the AI voice only if this screen is active, AI is enabled, and the screen ID matches
      if (isAiEnabled && currentScreenId === screenId) {
        playVoice('Welcome, I am Joy. How can I assist you today? To turn off AI, please head towards Setting page.');
      }

      return () => {
        stopVoice(); // Stop the voice when leaving the screen
      };
    }, [isAiEnabled, currentScreenId])
  );

  const playVoice = (text: string) => {
    Speech.speak(text, {
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

  const handleCloseAi = () => {
    stopVoice();
    setShowAi(false);
  };

  const handlePauseResume = () => {
    if (isSpeaking) {
      stopVoice();
    } else {
      playVoice('Welcome, I am Joy. How can I assist you today? To turn off AI, please head towards Setting page.');
    }
  };

  const handleBackgroundClick = () => {
    setShowNextMessage(true);
    playVoice('Got it, I will now redirect you to the create appointment page. Please click continue to proceed.');
  };

  const handleContinue = () => {
    playVoice('Redirecting you to create an appointment page.');
    navigation.navigate('Create Appointment');
  };

  const handleredirectSetting = () => {
    playVoice('Redirecting you to Settings page');
    navigation.navigate('Setting');
  };

  const handleCloseMessage = () => {
    setShowNextMessage(false);
    stopVoice();
  };

  const handleReplayRedirectMessage = () => {
    playVoice('Got it, I will now redirect you to the create appointment page. Please click continue to proceed.');
  };

  return (
    <TouchableWithoutFeedback onPress={handleBackgroundClick}>
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

        {/* AI Assistance Section - only renders if isAiEnabled is true */}
        {isAiEnabled && showAi && (
          <View style={styles.aiContainer}>
            <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon} />
            <View style={styles.aiTextContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseAi}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>

              {!showNextMessage ? (
                <>
                  <Text style={styles.aiText}>
                    Welcome, I am Joy, How can I assist you today? To turn off AI, please head towards Settings page.
                  </Text>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
                      <Text style={styles.controlButtonText}>{isSpeaking ? 'Pause' : 'Play'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton} onPress={handleredirectSetting}>
                      <Text style={styles.controlButtonText}>Settings</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.aiText}>
                    Got it, I will now redirect you to the create appointment page. Please click continue to proceed.
                  </Text>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.controlButton} onPress={handleReplayRedirectMessage}>
                      <Text style={styles.controlButtonText}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton} onPress={handleContinue}>
                      <Text style={styles.controlButtonText}>Continue</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        )}

        {/* Navigation Buttons with Icons for Services */}
        <TouchableOpacity
          style={[styles.serviceButton, { marginTop: 20 }]}
          onPress={() => navigation.navigate('Create Appointment')}
        >
          <Image source={require('../../assets/calendar.jpg')} style={styles.icon} />
          <Text style={styles.buttonText}>Create Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('View/Edit Appointment')}>
          <Image source={require('../../assets/edit.jpg')} style={styles.icon} />
          <Text style={styles.buttonText}>View/Edit Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('Reminders')}>
          <Image source={require('../../assets/reminder.jpg')} style={styles.icon} />
          <Text style={styles.buttonText}>Reminders</Text>
        </TouchableOpacity>

        {/* Swipe Indicator */}
        <View style={styles.swipeIndicatorContainer}>
          <Text style={styles.swipeIndicator}>Swipe right to access "Create Appointment" →</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: { backgroundColor: '#fbe4e4' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 20 },
  logoutButton: { paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#e0e0e0', borderRadius: 5 },
  logoutText: { color: '#333', fontWeight: 'bold' },
  settingsButton: { paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#e0e0e0', borderRadius: 5 },
  settingsText: { color: '#333', fontWeight: 'bold' },
  headerText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  aiContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  aiIcon: { width: 50, height: 80, marginRight: 10 },
  aiTextContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  aiText: { fontSize: 16, color: '#333', textAlign: 'center' },
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
  closeButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  buttonRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  controlButton: { backgroundColor: '#007AFF', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 5 },
  controlButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
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
  icon: { width: 40, height: 40, marginRight: 15 },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  swipeIndicatorContainer: {
    marginTop: 50,
    alignSelf: 'center',
    backgroundColor: '#fce4ec',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  swipeIndicator: { textAlign: 'center', color: 'purple', fontSize: 16, fontWeight: 'bold' },
});

export default HomeScreen;
