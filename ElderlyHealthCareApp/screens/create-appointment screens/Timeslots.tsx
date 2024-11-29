import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { useEffect, useState, useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../types';

type TimeslotsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Timeslots'>;

type Props = {
  isAiEnabled: boolean;
  navigation: TimeslotsScreenNavigationProp,
  date: string | undefined;
  setTime: (time: string) => void;
};

const TimeslotsScreen = ({ isAiEnabled, navigation, date, setTime }: Props) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAi, setShowAi] = useState(!isAiEnabled);
  const [hasVisited, setHasVisited] = useState(false); // Track initial visit
  const [selectedTime, setSelectedTime] = useState('');
  const selectedDate = date;

  // Play AI voice on first screen load
  // useEffect(() => {
  //   if (isAiEnabled && !hasVisited) {
  //     playVoice();
  //     setHasVisited(true); // Mark as visited to prevent auto-play on every return
  //   }
  // }, [isAiEnabled, hasVisited]);

  // // Use `useFocusEffect` to handle re-focus events and play voice if revisited
  // useFocusEffect(
  //   useCallback(() => {
  //     if (isAiEnabled && hasVisited) {
  //       playVoice();
  //     }
  //     return () => stopVoice(); // Stop voice when navigating away
  //   }, [isAiEnabled, hasVisited])
  // );

  const playVoice = (text: string = 'Please choose your preferred appointment timeslot. Red timeslots are full.') => {
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

  const handleNavigateToConfirm = (time : { time : string }) => {
    setSelectedTime(time.time);
    setTime(time.time);
    navigation.navigate('Appointment Type');
  };

  const Timeslot = ({ time = "00:00", avail }: { time: string, avail: string }) => {
    if (avail === 'no') {
      return (
        <View style={styles.unavailTimeslot}>
          <Text style={styles.timeslotText}>{time}</Text>
          {/* <Text style={styles.timeslotText}>(full)</Text> */}
        </View> 
      );
    }
    else if (avail === 'yes') {
      return (
        <TouchableOpacity style={styles.availTimeslot} onPress={() => handleNavigateToConfirm({time})}>
          <Text style={styles.timeslotText}>{time}</Text>
        </TouchableOpacity> 
      );
    }
  };

  return (
    <View style={styles.background}>

      {/* Header */}
      <Text style={styles.chosenDateText}>You have chosen {selectedDate}</Text>
      <View>
        <Text style={styles.headerText}>Choose timeslot</Text>
      </View>      
      
      <View style={styles.timeslotContainer}>
        <Timeslot time="08:00am" avail="no"/>
        <Timeslot time="08:30am" avail="no"/>
        <Timeslot time="09:00am" avail="no"/>
        <Timeslot time="09:30am" avail="no"/>
        <Timeslot time="10:00am" avail="no"/>
        <Timeslot time="10:30am" avail="no"/>
        <Timeslot time="11:00am" avail="yes"/>
        <Timeslot time="11:30am" avail="yes"/>
        <Timeslot time="12:00pm" avail="yes"/>
        <Timeslot time="12:30pm" avail="yes"/>
        <Timeslot time="01:00pm" avail="yes"/>
        <Timeslot time="01:30pm" avail="yes"/>
        <Timeslot time="02:00pm" avail="yes"/>
        <Timeslot time="02:30pm" avail="yes"/>
        <Timeslot time="03:00pm" avail="yes"/>
        <Timeslot time="03:30pm" avail="yes"/>
        <Timeslot time="04:00pm" avail="yes"/>
      </View>

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
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseAi}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.aiText}>Please choose your preferred appointment timeslot. Red timeslots are full.</Text>
            <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
              <Text style={styles.controlButtonText}>{isSpeaking ? 'Pause' : 'Play'}</Text>
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
  chosenDateText: {
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    textDecorationLine: 'underline',
    paddingTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#333',
    paddingVertical: 20,
  },

  timeslotContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
    maxHeight: 500,
  },
  availTimeslot: {
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: 150,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  unavailTimeslot: {
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: 150,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  timeslotText: {
    alignSelf: 'center',
    fontSize: 18,
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
    width: '80%',
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
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  aiText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginRight: 10,
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

export default TimeslotsScreen;
