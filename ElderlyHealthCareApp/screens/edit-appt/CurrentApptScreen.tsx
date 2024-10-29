// CurrentApptScreen.tsx

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert 
} from 'react-native';
import { globalStyles } from '../../styles/Theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Appointment } from '../../types';

type CurrentApptScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Current Appointment'
>;

type Props = {
  navigation: CurrentApptScreenNavigationProp;
};

const CurrentApptScreen: React.FC<Props> = ({ navigation }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { location: 'Woodlands Clinic', day: '1', month: 'December', year: '2024', time: '10:30 AM', type: 'Health Check-up' },
    { location: 'Woodlands Clinic', day: '7', month: 'December', year: '2024', time: '10:30 AM', type: 'Blood Test' },
  ]);

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
            newAppointments.splice(index, 1); // Remove the selected appointment
            setAppointments(newAppointments);
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={[globalStyles.container, styles.background]}>
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
                <Text style={styles.buttonText}>Edit</Text>
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
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fbe4e4',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appointmentContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  appointmentText: {
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deletedText: {
    fontSize: 18,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default CurrentApptScreen;
