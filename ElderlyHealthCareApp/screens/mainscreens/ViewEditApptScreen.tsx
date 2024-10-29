import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../styles/Theme';
import { AuthProps, RootStackParamList } from '../../types';

type ViewEditApptScreenNavigationProp = StackNavigationProp<RootStackParamList, 'View/Edit Appointment'>;

type Props = {
  navigation: ViewEditApptScreenNavigationProp;
  isAiEnabled: boolean;
} & AuthProps;

const ViewEditApptScreen = ({ navigation, setRegisteredUser, isAiEnabled }: Props) => {
  const [showAi, setShowAi] = useState(isAiEnabled);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (isAiEnabled) {
      playVoice();
    }
  }, [isAiEnabled]);

  const playVoice = () => {
    Speech.speak('This is the View or Edit Appointment Page. Click on the Pencil icon to get started.', {
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

  const handleLogout = () => {
    setRegisteredUser(null);
    navigation.replace('Login');
  };

  const handleSettings = () => {
    navigation.navigate('Setting');
  };

  const handleNavigateToEdit = () => {
    navigation.navigate('Current Appointment'); // Navigate to CurrentApptScreen
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
    <View style={[globalStyles.container, styles.background]}>
      {/* Header with Logout button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>View/Edit Appt</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
          <Text style={styles.settingsText}>Settings</Text>
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
            <Text style={styles.aiText}>
              This is the View or Edit Appointment Page. Click on the Pencil icon to get started.
            </Text>
            <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
              <Text style={styles.controlButtonText}>{isSpeaking ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Main Appointment Card */}
      <TouchableOpacity style={styles.card} onPress={handleNavigateToEdit}>
        <Text style={styles.cardTitle}>View/Edit Appointment</Text>
        <Text style={styles.cardSubtitle}>UI Card-based</Text>
      </TouchableOpacity>

      {/* Back to Home Button */}
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
  aiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  aiIcon: { width: 50, height: 80, marginRight: 10 },
  aiTextContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    width: 180,
    alignItems: 'center',
    position: 'relative',
  },
  aiText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
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
  closeButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  controlButton: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  controlButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 50,
  },
  icon: { width: 60, height: 60, marginBottom: 15 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 16, color: '#555' },
  swipeIndicatorContainer: {
    marginTop: 50,
    alignSelf: 'center',
    backgroundColor: '#fce4ec',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
  },
  swipeIndicator: { textAlign: 'center', color: 'purple', fontSize: 16, fontWeight: 'bold' },
});

export default ViewEditApptScreen;

