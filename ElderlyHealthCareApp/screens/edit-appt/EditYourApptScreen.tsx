import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { useEffect, useState, useCallback } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { RootStackParamList } from '../../types';
import { Calendar } from 'react-native-calendars';

type EditYourApptScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Edit Appointment'>;

type Props = {
  navigation: EditYourApptScreenNavigationProp;
  route: { params: { appointment: any; onSave: (newAppointment: any) => void } };
  isAiEnabled: boolean;
};

const EditYourApptScreen: React.FC<Props> = ({ route, navigation, isAiEnabled }) => {
  const { appointment, onSave } = route.params;
  const [selectedDate, setSelectedDate] = useState<string>(appointment.day);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAi, setShowAi] = useState(isAiEnabled);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Use `useFocusEffect` to trigger AI speech each time the screen is focused
  useFocusEffect(
    useCallback(() => {
      if (isAiEnabled) {
        playVoice();
      }
      return () => stopVoice(); // Stop AI speech when navigating away
    }, [isAiEnabled])
  );

  const playVoice = () => {
    Speech.speak('Please select the date and time you would like to reschedule your appointment.', {
      onStart: () => setIsSpeaking(true),
      onDone: () => setIsSpeaking(false),
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

  const handleConfirmDate = () => {
    setIsModalVisible(true);
  };

  const handleConfirmChange = () => {
    if (!selectedTime) {
      Alert.alert("Select Time", "Please choose a time before confirming.");
      return;
    }
    const updatedAppointment = { ...appointment, day: selectedDate, time: selectedTime };
    onSave(updatedAppointment);
    navigation.navigate('Current Appointment');
    setIsModalVisible(false);
  };

  const timeslots = [
    { time: "08:00am", isUnavailable: true },
    { time: "08:30am", isUnavailable: true },
    { time: "09:00am" },
    { time: "09:30am" },
    { time: "10:00am" },
    { time: "10:30am" },
    { time: "11:00am" },
    { time: "11:30am" },
    { time: "12:00pm" },
    { time: "12:30pm" },
    { time: "01:00pm" },
    { time: "01:30pm" },
    { time: "02:00pm", isUnavailable: true },
    { time: "02:30pm", isUnavailable: true },
    { time: "03:00pm" },
    { time: "03:30pm" },
    { time: "04:00pm" },
  ];

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={{ width: 350, alignSelf: 'center', paddingBottom: 25 }}>
      
      {/* AI Assistance Section */}
      {showAi && (
        <View style={styles.aiContainer}>
          <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon} />
          <View style={styles.aiTextContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseAi}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.aiText}>Please select the date and time you would like to reschedule your appointment.</Text>
            <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
              <Text style={styles.controlButtonText}>{isSpeaking ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Text style={styles.header}>Current Appointment</Text>
      <View style={{ backgroundColor: '#e0e0e0', padding: 20, borderRadius: 10, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.appointmentText}>{appointment.location}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={styles.label}>Type: </Text>
          <Text style={styles.appointmentText}>{appointment.type}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={styles.label}>Time: </Text>
          <Text style={styles.appointmentText}>{appointment.time}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.appointmentText}>{`${appointment.day} ${appointment.month} ${appointment.year}`}</Text>
        </View>
      </View>

      <Text style={styles.header}>Choose New Date</Text>

      <Text style={styles.selectedDateText}>You have chosen: {selectedDate}</Text>
      <Calendar
        onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' },
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleConfirmDate}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an Available Time</Text>

            <View style={styles.timeList}>
              {timeslots.map(({ time, isUnavailable }) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.selectedTimeSlot,
                    isUnavailable && styles.unavailableTimeSlot,
                  ]}
                  onPress={() => !isUnavailable && setSelectedTime(time)}
                  disabled={isUnavailable}
                >
                  <Text style={[styles.timeText, isUnavailable && styles.unavailableText]}>
                    {time} {isUnavailable ? "(Full)" : ""}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleConfirmChange}>
                <Text style={styles.modalButtonText}>Confirm Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: { backgroundColor: '#fbe4e4', flex: 1 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 24, marginBottom: 10, fontWeight: 'bold' },
  appointmentText: { fontSize: 24, marginBottom: 10 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  buttonText: { fontSize: 20, fontWeight: 'bold', color: 'white' },
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
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    width: 250,
    alignItems: 'center',
    position: 'relative',
  },
  aiText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
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
  selectedDateText: { fontSize: 28, color: 'black', textAlign: 'center', marginBottom: 20 },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  timeSlot: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  unavailableTimeSlot: { backgroundColor: 'red' },
  selectedTimeSlot: { backgroundColor: 'lightgreen' },
  timeText: { fontSize: 16, color: '#333' },
  unavailableText: { color: 'white' },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditYourApptScreen;
