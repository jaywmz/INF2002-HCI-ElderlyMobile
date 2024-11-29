import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RegisteredUser, RootStackParamList } from '../../types';
import * as Speech from 'expo-speech';
import { useFocusEffect } from '@react-navigation/native';

type SettingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Setting'>;

type Props = {
  navigation: SettingScreenNavigationProp;
  isAiEnabled: boolean;
  setIsAiEnabled: (enabled: boolean) => void;
};

const SettingScreen: React.FC<Props> = ({ navigation, isAiEnabled, setIsAiEnabled }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasVisit, sethasVisit] = useState(false); // Track the first visit

  // Play AI guidance message on initial load if AI is enabled
  // useEffect(() => {
  //   if (isAiEnabled && !hasVisit) {
  //     playVoice('To turn off AI, press the green slide button.');
  //     sethasVisit(true); // Reset after first visit
  //   }
  // }, [isAiEnabled, hasVisit]);

  // Play AI guidance message each time the screen is focused
  useFocusEffect(
    useCallback(() => {
      playVoice();
      return () => stopVoice();
    }, [isAiEnabled])
  );

  const playVoice = (text: string = 'To turn off AI, press the green slide button.') => {
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

  // Toggle AI with voice feedback
  const toggleSwitch = () => {
    const newAiState = !isAiEnabled;
    setIsAiEnabled(newAiState);
    const message = newAiState
      ? 'AI assistance is now on. To turn it off, press the green slide button.'
      : 'AI assistance is now off.';
    playVoice(message);
  };

  const handlePauseResume = () => {
    if (isSpeaking) {
      stopVoice();
    } else {
      playVoice('To turn off AI, press the green slide button.');
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* AI Assistance Toggle Section */}
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>AI Guidance Assistance</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isAiEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isAiEnabled ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      {/* AI Info Section */}
      {isAiEnabled && (
        <View style={styles.aiContainer}>
          <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon} />
          <View style={styles.aiTextContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={stopVoice}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.aiText}>To turn off AI, press on the green slide button.</Text>
            <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
              <Text style={styles.controlButtonText}>{isSpeaking ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.aiContainer}>
        <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
          <Text style={styles.logOutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fbe4e4',
    alignItems: 'center', // Center content horizontally
  },
  title: {
    fontSize: 36,
    marginTop: 200,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  toggleContainer: {
    alignItems: 'center', // Center toggle content horizontally
    justifyContent: 'center', // Center toggle content vertically
    flexDirection: 'row',
    paddingVertical: 20,
    width: '100%', // Takes up full width for balanced centering
  },
  label: {
    fontSize: 25,
    marginRight: 10,
  },
  aiContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  aiIcon: {
    width: 40,
    height: 60,
    marginBottom: 10,
  },
  aiTextContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    width: 250, // Smaller and centered
    alignItems: 'center',
    position: 'relative',
  },
  aiText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  controlButton: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
  logOutButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  logOutButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default SettingScreen;
