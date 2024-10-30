import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { globalStyles } from '../../styles/Theme';
import { Appointment, RootStackParamList } from '../../types';

type EditYourApptScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Edit Appointment'>;

type Props = {
  navigation: EditYourApptScreenNavigationProp;
  route: { params: { appointment: Appointment; onSave: (newAppointment: Appointment) => void } };
  isAiEnabled: boolean;
};

// Dropdown data
const locations = ['Woodlands Clinic', 'Khoo Teck Phuat Hospital', 'Sengkang Hospital'];
const times = ['10:00 AM', '10:30 AM', '11:00 AM (Unavailable)', '11:30 AM (Unavailable)', '12:00 PM'];
const types = ['Health Check-up', 'Blood Test', 'Surgery', 'Report Sick'];
const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
const months = ['January', 'February', 'March', 'April'];
const years = Array.from({ length: 7 }, (_, i) => `${2024 + i}`);

const EditYourApptScreen: React.FC<Props> = ({ route, navigation, isAiEnabled }) => {
  const { appointment, onSave } = route.params;
  const [location, setLocation] = useState(appointment.location);
  const [day, setDay] = useState(appointment.day);
  const [month, setMonth] = useState(appointment.month);
  const [year, setYear] = useState(appointment.year);
  const [time, setTime] = useState(appointment.time);
  const [type, setType] = useState(appointment.type);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAi, setShowAi] = useState(isAiEnabled);

  useEffect(() => {
    if (isAiEnabled) {
      playVoice();
    }
    setShowAi(isAiEnabled);
  }, [isAiEnabled]);

  const playVoice = () => {
    Speech.speak('This is the edit section for your current appointment.', {
      onStart: () => setIsSpeaking(true),
      onDone: () => setIsSpeaking(false),
    });
  };

  const stopVoice = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  const handleConfirm = () => {
    if (time.includes('Unavailable')) {
      Alert.alert('Error', 'You cannot select an unavailable time.');
      return;
    }
    const selectedDate = new Date(`${month} ${day}, ${year}`);
    if (selectedDate <= new Date()) {
      Alert.alert('Error', 'Please select a future date.');
      return;
    }
    Alert.alert('Confirm Changes', 'Are you sure you want to make changes?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          const updatedAppointment: Appointment = { location, day, month, year, time, type };
          onSave(updatedAppointment);
          navigation.goBack();
        },
      },
    ]);
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
    <ScrollView contentContainerStyle={[globalStyles.container, styles.background]}>
      {/* AI Assistance Section */}
      {showAi && (
        <View style={styles.aiContainer}>
          <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon} />
          <View style={styles.aiTextContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseAi}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.aiText}>This is the edit section for your current appointment.</Text>
            <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
              <Text style={styles.controlButtonText}>{isSpeaking ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Text style={styles.title}>Edit Appointment</Text>

      {/* Hospital Dropdown */}
      <Text style={styles.label}>Hospital:</Text>
      <ModalDropdown
        options={locations}
        defaultValue={location}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdownOptions}
        onSelect={(index: string, value: string) => setLocation(value)}
      />

      {/* Date Dropdowns */}
      <Text style={styles.label}>Date:</Text>
      <View style={styles.dateContainer}>
        <ModalDropdown
          options={days}
          defaultValue={day}
          style={styles.dateDropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownOptions}
          onSelect={(index: string, value: string) => setDay(value)}
        />
        <ModalDropdown
          options={months}
          defaultValue={month}
          style={styles.dateDropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownOptions}
          onSelect={(index: string, value: string) => setMonth(value)}
        />
        <ModalDropdown
          options={years}
          defaultValue={year}
          style={styles.dateDropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownOptions}
          onSelect={(index: string, value: string) => setYear(value)}
        />
      </View>

      {/* Time Dropdown */}
      <Text style={styles.label}>Time:</Text>
      <ModalDropdown
        options={times}
        defaultValue={time}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdownOptions}
        onSelect={(index: string, value: string) => setTime(value)}
      />

      {/* Type Dropdown */}
      <Text style={styles.label}>Type:</Text>
      <ModalDropdown
        options={types}
        defaultValue={type}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdownOptions}
        onSelect={(index: string, value: string) => setType(value)}
      />

      {/* Confirm Button */}
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fbe4e4',
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  dropdown: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 18,
  },
  dropdownOptions: {
    width: '85%',
    marginLeft: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateDropdown: {
    width: '30%',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
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
});

export default EditYourApptScreen;
