import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import the icon library
import { RootStackParamList } from '../../types';

type ReminderConfirmScreen = StackNavigationProp<RootStackParamList, 'ReminderConfirm'>;

type Props = {
  navigation: ReminderConfirmScreen;
  isAiEnabled: boolean;
  date: string | undefined;
  time: string | undefined;
};

const ReminderConfirmScreen = ({ navigation, isAiEnabled, date, time }: Props) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAi, setShowAi] = useState(isAiEnabled);
  const [medicinePhoto, setMedicinePhoto] = useState<string | null>(null);
  const [medicineName, setMedicineName] = useState('');

  useEffect(() => {
    if (isAiEnabled) {
      playVoice('Please check and confirm that all details of the medicine reminder are correct, then click Confirm.');
    }
  }, [isAiEnabled]);

  const playVoice = (text: string = 'Please check and confirm that all details of the medicine reminder are correct, then click Confirm.') => {
    Speech.speak(text, {
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

  const handleNavigateToSuccess = () => {
    navigation.navigate('ReminderSuccess');
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setMedicinePhoto(result.assets[0].uri); // Use result.assets[0].uri to access the URI
      }
    } else {
      alert('Camera permission is required to take a photo.');
    }
  };

  return (
    <View style={styles.background}>
      <Text style={styles.headerText}>Confirmation of Medicine Reminder</Text>

      {/* Medicine Photo and Name Input */}
      <View style={styles.medicineContainer}>
        <TouchableOpacity style={styles.photoBox} onPress={openCamera}>
          {medicinePhoto ? (
            <Image source={{ uri: medicinePhoto }} style={styles.medicinePhoto} />
          ) : (
            <MaterialIcons name="camera-alt" size={48} color="#888" /> // Camera icon instead of text
          )}
        </TouchableOpacity>
        <Text style={styles.medicineLabel}>Medicine Name :</Text>
        <TextInput
          style={styles.medicineInput}
          placeholder="Medication Name"
          value={medicineName}
          onChangeText={setMedicineName}
        />
      </View>

      {/* Date and Time Display */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>Date: {date}</Text>
        <Text style={styles.detailsText}>Time: {time}</Text>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleNavigateToSuccess}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>

      {/* AI Assistance Section */}
      {showAi && (
        <View style={styles.aiContainer}>
          <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon} />
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiText}>
              Please check and confirm that all details of the medicine reminder are correct, then click Confirm.
            </Text>
            <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
              <Text style={styles.controlButtonText}>{isSpeaking ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseAi}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fbe4e4',
    height: '100%',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  medicineContainer: {
    width: '90%',
    backgroundColor: '#e0e0e0',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  photoBox: {
    width: '100%',
    height: 200,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  medicinePhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  photoPlaceholder: {
    fontSize: 18,
    color: '#888',
  },
  medicineLabel: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  medicineInput: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 16,
  },
  detailsContainer: {
    marginTop: 20,
    width: '90%',
    alignItems: 'flex-start',
  },
  detailsText: {
    fontSize: 20,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginTop: 30,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  aiContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  aiIcon: {
    width: 50,
    height: 80,
    marginRight: 10,
  },
  aiTextContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
    width: '75%',
  },
  aiText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  controlButton: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 15,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    right: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ReminderConfirmScreen;
