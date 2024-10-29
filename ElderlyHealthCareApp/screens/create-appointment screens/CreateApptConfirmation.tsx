import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../styles/Theme';
import { RootStackParamList } from '../../types';

type CreateApptConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateApptConfirmation'>;

type Props = {
  navigation: CreateApptConfirmationScreenNavigationProp;
  isAiEnabled: boolean;
};

const CreateApptConfirmationScreen = ({ navigation, isAiEnabled }: Props) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAi, setShowAi] = useState(isAiEnabled);

  useEffect(() => {
    if (isAiEnabled) {
      playVoice('Please check and confirm that all details of the appointment are correct, then click Confirm.');
    }
  }, [isAiEnabled]);

  const playVoice = (text: string = 'Please check and confirm that all details of the appointment are correct, then click Confirm.') => {
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

  const handlePauseResume = () => {
    if (isSpeaking) {
      stopVoice();
    } else {
      playVoice();
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={[globalStyles.container, styles.background]}>
      {/* Header with Back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleBack}>
          <Text style={styles.logoutText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Confirm?</Text>
      </View>

      {/* Confirmation Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.headerText}>Location</Text>
        <Text style={styles.headerText}>Date</Text>
        <Text style={styles.headerText}>Time</Text>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleNavigateToHome}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>

      {/* AI Assistance Section */}
      {showAi && (
        <View style={styles.aiContainer}>
          <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon} />
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiText}>
              Please check and confirm that all details of the appointment are correct, then click Confirm.
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
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    flexDirection: 'row',
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
  detailsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  aiText: {
    fontSize: 16,
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

export default CreateApptConfirmationScreen;
