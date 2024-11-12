import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../types';

type CreateApptConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Confirm'>;

type Props = {
  navigation: CreateApptConfirmationScreenNavigationProp;
  isAiEnabled: boolean;
  location: string | undefined;
  date: string | undefined;
  time: string | undefined;
  type: string | undefined;
};

const CreateApptConfirmationScreen = ({ navigation, isAiEnabled, location, date, time, type }: Props) => {
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

  const handleNavigateToSuccess = () => {
    navigation.navigate('Success');
  };

  return (
    <View style={[styles.background]}>
      {/* Header with Back button */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Confirm Appointment Details</Text>
      </View>

      {/* Confirmation Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsCard}>
          <Text style={styles.detailsText}>Location:</Text>
          <Text style={styles.detailsText}>{location}</Text>
        </View>
        <View style={styles.detailsCard}>
          <Text style={styles.detailsText}>Date: {date}</Text>
        </View>
        <View style={styles.detailsCard}>
          <Text style={styles.detailsText}>Time: {time}</Text>
        </View>
        <View style={styles.detailsCard}>
            <Text style={styles.detailsText}>Type: {type}</Text>
        </View>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleNavigateToSuccess}>
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
    height: '100%',
  },
  header: {
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },

  detailsContainer: {
    alignSelf: 'center',
    width: '90%',
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
  detailsText: {
    fontSize: 26,
  },
  
  confirmButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    alignSelf: 'center',
    width: '85%'
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
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

export default CreateApptConfirmationScreen;
