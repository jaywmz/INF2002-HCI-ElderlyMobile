import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert 
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { globalStyles } from '../styles/Theme';

// Data for Dropdowns
const locations = ['Woodlands Clinic', 'Khoo Teck Phuat Hospital', 'Sengkang Hospital'];
const times = [
  '10:00 AM', '10:30 AM',
  '11:00 AM (Unavailable)', '11:30 AM (Unavailable)',
  '12:00 PM', '1:00 PM',
  '2:00 PM (Unavailable)', '2:30 PM (Unavailable)',
  '3:00 PM', '3:30 PM', '4:00 PM'
];
const types = ['Health Check-up', 'Blood Test', 'Surgery', 'Report Sick'];
const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const years = Array.from({ length: 7 }, (_, i) => `${2024 + i}`);

const EditYourApptScreen = ({ route, navigation }) => {
  const { appointment, onSave } = route.params;

  const [location, setLocation] = useState(appointment.location);
  const [day, setDay] = useState(appointment.day);
  const [month, setMonth] = useState(appointment.month);
  const [year, setYear] = useState(appointment.year);
  const [time, setTime] = useState(appointment.time);
  const [type, setType] = useState(appointment.type);

  const handleConfirm = () => {
    if (time.includes('Unavailable')) {
      Alert.alert('Error', 'You cannot select an unavailable time.');
      return;
    }

    const selectedDate = new Date(`${month} ${day}, ${year}`);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Alert.alert('Error', 'Please select a future date.');
      return;
    }

    Alert.alert(
      'Confirm Changes',
      'Are you sure you want to make changes to your current appointment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            const updatedAppointment = { 
              location, 
              day, 
              month, 
              year, 
              time, 
              type 
            };
            onSave(updatedAppointment);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={[globalStyles.container, styles.background]}>
      <Text style={styles.title}>Edit Appointment</Text>

      {/* Hospital Dropdown */}
      <Text style={styles.label}>Hospital:</Text>
      <ModalDropdown
        options={locations}
        defaultValue={location}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdownOptions}
        onSelect={(index, value) => setLocation(value)}
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
          onSelect={(index, value) => setDay(value)}
        />
        <ModalDropdown
          options={months}
          defaultValue={month}
          style={styles.dateDropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownOptions}
          onSelect={(index, value) => setMonth(value)}
        />
        <ModalDropdown
          options={years}
          defaultValue={year}
          style={styles.dateDropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownOptions}
          onSelect={(index, value) => setYear(value)}
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
        onSelect={(index, value) => setTime(value)}
      />

      {/* Type Dropdown */}
      <Text style={styles.label}>Type:</Text>
      <ModalDropdown
        options={types}
        defaultValue={type}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdownOptions}
        onSelect={(index, value) => setType(value)}
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
});

export default EditYourApptScreen;
