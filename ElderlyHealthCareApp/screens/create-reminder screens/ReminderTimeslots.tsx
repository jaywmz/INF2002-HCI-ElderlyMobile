import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { useEffect, useState, useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from '../../types';

type ReminderTimeslotsScreen = StackNavigationProp<RootStackParamList, 'ReminderTimeslots'>;

type Props = {
  isAiEnabled: boolean;
  navigation: ReminderTimeslotsScreen,
  date: string | undefined;
  setTime: (time: string) => void;
};

const ReminderTimeslotsScreen = ({ isAiEnabled, navigation, date, setTime }: Props) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAi, setShowAi] = useState(isAiEnabled);
  const [hasVisited, setHasVisited] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const selectedDate = date;

  useEffect(() => {
    if (isAiEnabled && !hasVisited) {
      playVoice();
      setHasVisited(true);
    }
  }, [isAiEnabled, hasVisited]);

  useFocusEffect(
    useCallback(() => {
      if (isAiEnabled && hasVisited) {
        playVoice();
      }
      return () => stopVoice();
    }, [isAiEnabled, hasVisited])
  );

  const playVoice = (text: string = 'Please choose your preferred time to take medicine.') => {
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

  const handleConfirm = () => {
    if (selectedTime) {
      setTime(selectedTime);
      navigation.navigate('ReminderConfirm');
    } else {
      alert("Please select a time before confirming.");
    }
  };

  // Full list of times in 30-minute intervals
  const timeOptions = [
    '12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM', '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM',
    '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM',
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
    '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM',
  ];

  return (
    <View style={styles.background}>

      {/* Header */}
      <Text style={styles.chosenDateText}>Selected date: {selectedDate}</Text>
      <View>
        <Text style={styles.headerText}>Choose Medicine Time</Text>
      </View>

      {/* AI Assistance Section */}
      {showAi && (
        <View style={styles.aiContainer}>
          <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon} />
          <View style={styles.aiTextContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseAi}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.aiText}>Please choose your preferred time to take medicine.</Text>
            <TouchableOpacity style={styles.controlButton} onPress={() => setIsSpeaking(!isSpeaking)}>
              <Text style={styles.controlButtonText}>{isSpeaking ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Single Dropdown Picker for All Times */}
      <Picker
        selectedValue={selectedTime}
        onValueChange={(itemValue) => setSelectedTime(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a time" value="" />
        {timeOptions.map((time) => (
          <Picker.Item key={time} label={time} value={time} />
        ))}
      </Picker>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm Time</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fbe4e4',
    height: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chosenDateText: {
    fontSize: 24,
    alignSelf: 'center',
    paddingTop: 20,
    color: '#333',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#333',
    paddingVertical: 20,
  },
  picker: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 20,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    width: 250,
    position: 'relative',
    alignItems: 'center',
  },
  aiText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
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
    fontSize: 14,
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
});

export default ReminderTimeslotsScreen;
