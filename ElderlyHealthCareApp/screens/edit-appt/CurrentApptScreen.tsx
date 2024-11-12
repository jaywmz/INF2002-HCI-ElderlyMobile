import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppointmentsPage } from '../../styles/Theme';
import { Appointment, RootStackParamList } from '../../types';

type CurrentApptScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Current Appointment'>;

type Props = {
  navigation: CurrentApptScreenNavigationProp;
  isAiEnabled: boolean;
};

const CurrentApptScreen: React.FC<Props> = ({ navigation, isAiEnabled }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { location: 'Khoo Teck Phuat Hospital', day: '2024-11-12', month: '', year: '', time: '10:30 AM', type: 'Health Check-up' },
    { location: 'Sengkang General Hospital', day: '2024-11-17', month: '', year: '', time: '10:30 AM', type: 'Blood Test' },
    { location: 'Tan Tock Seng Hospital', day: '2024-11-11', month: '', year: '', time: '10:30 AM', type: 'Health Check-up' },
    { location: 'Tan Tock Seng Hospital', day: '2024-11-11', month: '', year: '', time: '10:30 AM', type: 'Health Check-up' }
  ]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAi, setShowAi] = useState(isAiEnabled);
  const [hasVisited, setHasVisited] = useState(false);

  // Play AI voice only on the first load
  useEffect(() => {
    if (isAiEnabled && !hasVisited) {
      playVoice();
      setHasVisited(true);
    }
    setShowAi(isAiEnabled);
  }, [isAiEnabled, hasVisited]);

  // Use `useFocusEffect` to trigger voice when revisiting
  useFocusEffect(
    useCallback(() => {
      if (isAiEnabled && hasVisited) {
        playVoice();
      }
      return () => stopVoice(); // Stop voice when navigating away
    }, [isAiEnabled, hasVisited])
  );

  const playVoice = () => {
    Speech.speak('This is the current appointment that you have.', {
      onStart: () => setIsSpeaking(true),
      onDone: () => setIsSpeaking(false),
    });
  };

  const stopVoice = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  const updateAppointment = (index: number, newAppointment: Appointment) => {
    const newAppointments = [...appointments];
    newAppointments[index] = newAppointment;
    setAppointments(newAppointments);
  };

  const handleDelete = (index: number) => {
    Alert.alert(
      'Delete Appointment',
      'Are you sure you want to delete this appointment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            const newAppointments = [...appointments];
            newAppointments.splice(index, 1);
            setAppointments(newAppointments);
          },
        },
      ]
    );
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

  return (
    <View style={{ flex: 1 }}> 
      <ScrollView contentContainerStyle={[AppointmentsPage.container, styles.background]} style={{ flex: 1 }}>
      {/* AI Assistance Section */}
      {showAi && (
        <View style={styles.aiContainer}>
          <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon} />
          <View style={styles.aiTextContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseAi}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.aiText}>This is the current appointment that you have.</Text>
            <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
              <Text style={styles.controlButtonText}>{isSpeaking ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
  
      {/* AppointmentsPage List */}
      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <View key={index} style={styles.appointmentContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Hospital:</Text>
              <Text style={styles.appointmentText}>{appointment.location}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.appointmentText}>
                {`${appointment.day} ${appointment.month} ${appointment.year}`}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Time:</Text>
              <Text style={styles.appointmentText}>{appointment.time}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Type:</Text>
              <Text style={styles.appointmentText}>{appointment.type}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('Edit Appointment', {
                    appointment,
                    onSave: (newAppointment: Appointment) => updateAppointment(index, newAppointment),
                  })
                }
              >
                <Text style={styles.buttonText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleDelete(index)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.deletedText}>No current appointments available.</Text>
      )}
      </ScrollView>

    </View>

  );  
};

const styles = StyleSheet.create({
  background: { backgroundColor: '#fbe4e4', padding: 20 },
  appointmentContainer: { backgroundColor: '#fff', width: 350, padding: 20, borderRadius: 10, marginBottom: 30},
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { fontSize: 25, fontWeight: 'bold' },
  appointmentText: { fontSize: 22 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  button: { backgroundColor: '#e0e0e0', padding: 15, borderRadius: 10 },
  buttonText: { fontSize: 20, fontWeight: 'bold' },
  deletedText: { fontSize: 24, fontStyle: 'italic', textAlign: 'center' },

  // AI Box Styles
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
    width: 300,
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
});

export default CurrentApptScreen;
