import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';

interface Medicine {
  id: string;
  name: string;
  date: string;
  time: string;
  image: any; // Define the type as `any` for imported images with `require`
}

const UpdateMedicineScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { medicine } = route.params as { medicine: Medicine };

  const [name, setName] = useState(medicine.name);
  const [selectedDate, setSelectedDate] = useState(medicine.date);
  const [selectedTime, setSelectedTime] = useState(medicine.time);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const timeslots = [
    "12:00am",
    "01:00am",
    "02:00am",
    "03:00am",
    "04:00am",
    "05:00am",
    "06:00am",
    "07:00am",
    "08:00am",
    "09:00am",
    "10:00am",
    "11:00am",
    "12:00pm",
    "01:00pm",
    "02:00pm",
    "03:00pm",
    "04:00pm",
    "05:00pm",
    "06:00pm",
    "07:00pm",
    "08:00pm",
    "09:00pm",
    "10:00pm",
    "11:00pm",
  ];

  const handleUpdate = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert("Incomplete Information", "Please select both a date and time.");
      return;
    }
    // Save the updated data (can integrate with backend/API or state management)
    navigation.navigate('EditSuccess'); // Navigate to success page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update {medicine.name} Reminder</Text>

      {/* Medicine Image */}
      <Image source={medicine.image} style={styles.image} />

      {/* Medicine Name */}
      <Text style={styles.label}>Medicine Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter medicine name"
        placeholderTextColor="#888"
      />

      {/* Date Picker */}
      <Text style={styles.label}>Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setDatePickerVisible(true)}
      >
        <Text style={styles.dateButtonText}>Pick a Date</Text>
      </TouchableOpacity>
      <Text style={styles.selectedText}>Selected Date: {selectedDate}</Text>

      <Modal
        visible={isDatePickerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDatePickerVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose a Date</Text>
            <Calendar
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
                setDatePickerVisible(false);
              }}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: 'blue' },
              }}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setDatePickerVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time Picker */}
      <Text style={styles.label}>Time</Text>
      <TouchableOpacity
        style={styles.timeButton}
        onPress={() => setTimePickerVisible(true)}
      >
        <Text style={styles.timeButtonText}>Pick a Time</Text>
      </TouchableOpacity>
      <Text style={styles.selectedText}>Selected Time: {selectedTime}</Text>

      <Modal
        visible={isTimePickerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setTimePickerVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose a Time</Text>
            <View style={styles.timeList}>
              {timeslots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.selectedTimeSlot,
                  ]}
                  onPress={() => {
                    setSelectedTime(time);
                    setTimePickerVisible(false);
                  }}
                >
                  <Text style={styles.timeText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setTimePickerVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fbe4e4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  image: {
    width: 350,
    height: 200,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 24,
    color: '#555',
    marginBottom: 5,
    marginTop: 15,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    padding: 20,
    fontSize: 18,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  timeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  updateButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  timeSlot: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedTimeSlot: {
    backgroundColor: '#007AFF',
  },
  timeText: {
    color: '#333',
  },
  modalCloseButton: {
    marginTop: 15,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UpdateMedicineScreen;
