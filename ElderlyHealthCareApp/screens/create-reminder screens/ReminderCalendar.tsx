import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { RootStackParamList } from '../../types';

type CalendarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReminderCalendar'>;

type Props = {
  navigation: CalendarScreenNavigationProp;
  isAiEnabled: boolean;
  locationProp: string | undefined;
  setDate: (date: string) => void;
};

const ReminderCalendarScreen = ({ navigation, isAiEnabled, setDate, locationProp }: Props) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAi, setShowAi] = useState(false); // AI assistant initially hidden

  const playVoice = (text: string = 'Please choose your medication date from the calendar below.') => {
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

  const toggleAiAssistant = () => {
    if (!showAi) {
      setShowAi(true); // Show AI assistant
      playVoice();
    } else {
      stopVoice(); // Stop speech when closing the AI
      setShowAi(false); // Hide AI assistant
    }
  };

  const handlePauseResume = () => {
    if (isSpeaking) {
      stopVoice(); // Pause the speech
    } else {
      playVoice(); // Resume the speech
    }
  };
  

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setDate(day.dateString);
    navigation.navigate('ReminderTimeslots');
  };

  return (
    <View style={styles.background}>
      <View>
        {/* Header */}
        <Text style={styles.headerText}>Choose Timeslot</Text>
      </View>

      {/* AI Assistant Section */}
      {showAi && (
        <View style={styles.aiContainer}>
          <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon} />
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiText}>Please choose your medication date from the calendar below.</Text>
            <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
              <Text style={styles.controlButtonText}>{isSpeaking ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={toggleAiAssistant}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Text style={styles.selectedDateText}>
          Selected Date: {selectedDate || 'None'}
        </Text>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
          }}
          theme={{
            todayTextColor: 'red',
            arrowColor: 'blue',
          }}
        />
      </View>

      {/* Help Button */}
      <TouchableOpacity style={styles.helpButton} onPress={toggleAiAssistant}>
        <Text style={styles.helpButtonText}>Help</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fbe4e4',
    height: '100%',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#333',
    paddingVertical: 20,
  },
  calendarContainer: {
    padding: 10,
    width: '90%',
    height: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: '#fff',
    borderRadius: 18,
  },
  selectedDateText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  aiContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    marginTop: 10,
  },
  aiIcon: {
    width: 50,
    height: 80,
    marginBottom: 10,
    alignSelf: 'center',
  },
  aiTextContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  aiText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  controlButton: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    alignSelf: 'center',
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
  helpButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    padding: 15,
    elevation: 5,
  },
  helpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReminderCalendarScreen;