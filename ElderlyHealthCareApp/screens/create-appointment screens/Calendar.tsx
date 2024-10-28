import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { globalStyles } from '../../styles/Theme';
import { Calendar } from 'react-native-calendars';

type CalendarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Calendar'>;

type Props = {
  navigation: CalendarScreenNavigationProp;
};

const CalendarScreen = ({ navigation }: Props) => {
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day: { dateString: React.SetStateAction<string>; }) => {
    setSelectedDate(day.dateString);
  };

  const handleBack = () => {
    navigation.goBack();
  }

  const handleNavigateToTimeslots = () => {
    // Navigate to the actual service screen (replace 'Home' with correct screen if necessary)
    navigation.navigate('Timeslots');
  };

  return (
    <View style={styles.background}>
      {/* Header with Logout button */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Choose date</Text>
      </View>
      <View style={styles.container}>
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
    alignItems: 'center',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    width: '90%',
    backgroundColor: '#fff',
  },
  selectedDateText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CalendarScreen;
