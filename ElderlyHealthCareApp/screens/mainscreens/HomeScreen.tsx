import { useFocusEffect } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { useCallback, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { globalStyles } from '../../styles/Theme';
import { AuthProps } from '../../types';
import { useTimer } from '../../timer'; 

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
  const { startTimer } = useTimer();

  useFocusEffect(
    useCallback(() => {
      // startTimer();
      setCurrentScreenId(screenId);
      setShowNextMessage(false);
      setShowAi(isAiEnabled);
      if (isAiEnabled && currentScreenId === screenId) {
        playVoice('Welcome, I am Joy. How can I assist you today? To turn off AI, please head towards Setting page.');
      }
      return () => stopVoice();
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

  return (
      <TouchableWithoutFeedback onPress={() => setShowNextMessage(true)}>
        <View style={[globalStyles.container, styles.background]}>
          <View>
            <Text style={styles.titleText}>ElderlyWell</Text>
          </View>

          {/* Navigation Buttons with Icons for Services */}
          <TouchableOpacity style={[styles.serviceButton, { marginTop: 20 }]} onPress={() => navigation.navigate('Choose Appointment Location')}>
            <Image source={require('../../assets/calendar.jpg')} style={styles.icon} />
            <Text style={styles.buttonText}>Create Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('Current Appointment')}>
            <Image source={require('../../assets/edit.jpg')} style={styles.icon} />
            <Text style={styles.buttonText}>View/Reschedule Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('Reminder Calendar')}>
            <Image source={require('../../assets/reminder.jpg')} style={styles.icon} />
            <Text style={styles.buttonText}>Medicine Reminders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('CurrentReminder')}>
            <Image source={require('../../assets/reminder.jpg')} style={styles.icon} />
            <Text style={styles.buttonText}>View Current Reminders</Text>
          </TouchableOpacity>

          {/* AI Assistance Section */}
          {isAiEnabled && showAi && (
            <View style={styles.aiContainer}>
              <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon} />
              <View style={styles.aiTextContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setShowAi(false)}>
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <Text style={styles.aiText}>
                  Welcome, I am Joy, How can I assist you today? To turn off AI, please head towards Settings page.
                </Text>
              </View>
            </View>
          )}

        </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: { backgroundColor: '#fbe4e4', flex: 1 },
  aiContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  aiIcon: { width: 50, height: 80, marginRight: 10 },
  aiTextContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  aiText: { fontSize: 16, color: '#333', textAlign: 'center' },
  closeButton: { position: 'absolute', top: 5, right: 5, backgroundColor: '#ff4d4d', borderRadius: 15, width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  closeButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  serviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 25,
    paddingRight: 35,
    paddingBottom: 25,
    paddingLeft: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  icon: { width: 55, height: 55, marginRight: 15 },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  navButton: { alignItems: 'center', flex: 1 },
  navText: { color: '#007AFF', fontWeight: 'bold', fontSize: 16 },
  titleText : { fontSize: 50, fontWeight: 'bold', marginTop: 15, marginBottom: 5},
});

export default HomeScreen;
