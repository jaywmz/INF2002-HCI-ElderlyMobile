import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { globalStyles } from '../../styles/Theme';

type LocationsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Locations'>;

type Props = {
  navigation: LocationsScreenNavigationProp;
};

const LocationsScreen = ({ navigation }: Props) => {
  const handleBack = () => {
    navigation.goBack();
  }

  const handleNavigateToCalendar = () => {
    // Navigate to the actual service screen (replace 'Home' with correct screen if necessary)
    navigation.navigate('Calendar');
    // alert("timeslots");
  };

  return (
    <View style={[globalStyles.container, styles.background]}>
      {/* Header with Logout button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleBack}>
          <Text style={styles.logoutText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Choose Location</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleNavigateToCalendar}>
            <Text style={styles.logoutText}>Location 1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fbe4e4',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
  logoutButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  logoutText: {
    color: '#333',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  settingsText: {
    color: '#333',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 50,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#555',
  },
  swipeIndicatorContainer: {
    marginTop: 50,
    alignSelf: 'center',
    backgroundColor: '#fce4ec', // Light pink background for swipe indicator
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2, // For Android shadow
  },
  swipeIndicator: {
    textAlign: 'center',
    color: 'purple',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LocationsScreen;