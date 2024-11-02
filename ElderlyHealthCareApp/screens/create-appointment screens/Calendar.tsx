import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { useEffect, useState, useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { RootStackParamList } from '../../types';

type CalendarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Calendar'>;

type Props = {
  navigation: CalendarScreenNavigationProp;
  isAiEnabled: boolean;
  setDate: (date : string) => void;
};

const CalendarScreen = ({ navigation, isAiEnabled, setDate }: Props) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAi, setShowAi] = useState(isAiEnabled);
  const [hasVisited, setHasVisited] = useState(false); // Track if the screen has been visited

  // Play AI voice on initial load if not previously visited
  useEffect(() => {
    if (isAiEnabled && !hasVisited) {
      playVoice();
      setHasVisited(true); // Mark as visited after first play
    }
  }, [isAiEnabled, hasVisited]);

  // Handle screen focus and re-focus events
  useFocusEffect(
    useCallback(() => {
      if (isAiEnabled && hasVisited) {
        playVoice();
      }
      return () => stopVoice(); // Stop voice when navigating away
    }, [isAiEnabled, hasVisited])
  );

  const playVoice = (text: string = 'Please choose your preferred appointment date from the calendar below.') => {
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

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setDate(day.dateString);
    navigation.navigate("Timeslots");
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

  // const handleConfirm = () => {
  //   if (selectedDate === 'None') {
  //     return;
  //   }
  //   else {
  //     setDate({ selectedDate });
  //     navigation.navigate("Timeslots");
  //   }
  // };

  return (
    <View style={styles.background}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Choose date</Text>
      </View>

      {/* AI Assistance Section */}
      {showAi && (
        <View style={styles.aiContainer}>
          <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon} />
          <View style={styles.aiTextContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseAi}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.aiText}>Please choose your preferred appointment date from the calendar below.</Text>
            <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
              <Text style={styles.controlButtonText}>{isSpeaking ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Calendar and Selected Date */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fbe4e4',
    height: '100%',
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
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  confirmContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  confirmBtn: {
    padding: 30,
    width: '85%',
    borderRadius: 18,
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  confirmBtnText: {
    fontSize: 28,
    alignSelf: 'center',
  },

  aiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
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
    maxWidth: 260,
    position: 'relative',
    alignItems: 'center',
  },
  aiText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
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

export default CalendarScreen;

