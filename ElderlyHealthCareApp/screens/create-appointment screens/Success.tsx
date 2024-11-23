import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../types';
import { useTimer } from '../../timer';

type CreateApptSuccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Success'>;

type Props = {
  navigation: CreateApptSuccessScreenNavigationProp;
  isAiEnabled: boolean;
};

const CreateApptSuccessScreen = ({ navigation, isAiEnabled }: Props) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAi, setShowAi] = useState(!isAiEnabled);
  const { getElapsedTime } = useTimer();

  useEffect(() => {
    // Calculate the elapsed time and log it to the terminal
    const elapsedTime = getElapsedTime();
    if (elapsedTime !== null) {
      console.log(`Time taken to navigate to CreateApptSuccessScreen: ${elapsedTime.toFixed(2)} ms`);
    }

    // if (isAiEnabled) {
    //   playVoice();
    // }
  // }, [isAiEnabled, getElapsedTime]);
  }, [getElapsedTime]);

  const playVoice = (
    text: string = 'Appointment has been created. Please click the button below to go back to the home screen.'
  ) => {
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

  const handleCloseAi = () => {
    stopVoice();
    setShowAi(false);
  };

  const handleOpenAi = () => {
    playVoice();
    setShowAi(true);
  };

  const handlePauseResume = () => {
    if (isSpeaking) {
      stopVoice();
    } else {
      playVoice();
    }
  };

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={[styles.background]}>
      {/* Thumbs up icon */}
      <View>
        <Image source={require('../../assets/thumbsup-icon.png')} style={styles.image} />
      </View>

      {/* Header with Back button */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Appointment created successfully!</Text>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleNavigateToHome}>
        <Text style={styles.confirmButtonText}>Go Back to Home Screen</Text>
      </TouchableOpacity>

      <View style={styles.helpBtnContainer}>
        <TouchableOpacity style={styles.aiIcon} onPress={handleOpenAi}>
          <Text style={styles.helpButton}>Help</Text>
        </TouchableOpacity>
      </View>

      {/* AI Assistance Section */}
      {showAi && (
        <View style={styles.aiContainer}>
          <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon} />
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiText}>
              Appointment has been created successfully! Click the button in the center to go back to the home screen.
            </Text>
            <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
              <Text style={styles.controlButtonText}>{isSpeaking ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseAi}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fbe4e4',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },

  header: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 30,
  },

  headerText: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: '#333',
  },

  image: {
    width: 200,
    height: 210,
    alignSelf: 'center',
    marginBottom: 15,
  },

  confirmButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 30,
    alignSelf: 'center',
  },

  confirmButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  helpBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  helpButton: {
    position: 'absolute',
    backgroundColor: '#007AFF',
    borderRadius: 15,
    width: 50,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  aiContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },

  aiIcon: {
    width: 50,
    height: 80,
    marginRight: 10,
  },

  aiTextContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
    width: '75%',
  },

  aiText: {
    fontSize: 18,
    color: '#333',
    marginRight: 10,
    textAlign: 'center',
  },

  controlButton: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginTop: 10,
  },

  controlButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  closeButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 15,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    right: 5,
  },

  closeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CreateApptSuccessScreen;
