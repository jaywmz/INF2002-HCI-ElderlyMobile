import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, AuthProps } from '../../types';
import { globalStyles } from '../../styles/Theme';

type ViewEditApptScreenNavigationProp = StackNavigationProp<RootStackParamList, 'View/Edit Appointment'>;

type Props = {
  navigation: ViewEditApptScreenNavigationProp;
} & AuthProps;

const ViewEditApptScreen = ({ navigation, setRegisteredUser }: Props) => {
  const handleLogout = () => {
    setRegisteredUser(null);
    navigation.replace('Login');
  };

  const handleNavigateToEdit = () => {
    navigation.navigate('Current Appointment'); // Navigate to CurrentApptScreen
  };

  return (
    <View style={[globalStyles.container, styles.background]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>View/Edit Appt</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.card} onPress={handleNavigateToEdit}>
        <Text style={styles.cardTitle}>View/Edit Appointment</Text>
        <Text style={styles.cardSubtitle}>UI Card-based</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 20 }]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={globalStyles.buttonText}>Back to Home</Text>
      </TouchableOpacity>

      <View style={styles.swipeIndicatorContainer}>
        <Text style={styles.swipeIndicator}>← Swipe left to "Create Appointment"</Text>
        <Text style={styles.swipeIndicator}>Swipe right to "Medicine Reminder" →</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: { backgroundColor: '#fbe4e4' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  logoutButton: { paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#e0e0e0', borderRadius: 5 },
  logoutText: { color: '#333', fontWeight: 'bold' },
  headerText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  settingsButton: { paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#e0e0e0', borderRadius: 5 },
  settingsText: { color: '#333', fontWeight: 'bold' },
  card: { backgroundColor: '#f0f0f0', borderRadius: 15, width: '80%', alignItems: 'center', paddingVertical: 40, marginTop: 50 },
  icon: { width: 60, height: 60, marginBottom: 15 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 16, color: '#555' },
  swipeIndicatorContainer: { marginTop: 50, alignSelf: 'center', backgroundColor: '#fce4ec', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, elevation: 2 },
  swipeIndicator: { textAlign: 'center', color: 'purple', fontSize: 16, fontWeight: 'bold' },
});

export default ViewEditApptScreen;
