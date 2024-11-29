import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image } from 'expo-image';
import * as Speech from 'expo-speech';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParamList } from '../../types';

const PlaceholderImage = require('../../assets/Doctor-image.png');

type ApptTypeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Appointment Type'>;

type Props = {
  navigation: ApptTypeScreenNavigationProp;
  isAiEnabled: boolean;
  time: string | undefined;
  setType: (location : string) => void;
};

const LocationsScreen = ({ navigation, isAiEnabled, time, setType }: Props) => {
  const [showAi, setShowAi] = useState(!isAiEnabled);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasVisited, setHasVisited] = useState(false); // Track if the screen has been visited before

  // Play AI voice on initial load if not previously visited
  // useEffect(() => {
  //   if (isAiEnabled && !hasVisited) {
  //     playVoice();
  //     setHasVisited(true); // Mark as visited after playing the first time
  //   }
  // }, [isAiEnabled, hasVisited]);

  // useFocusEffect(
  //   useCallback(() => {
  //     // Play AI voice every time the screen regains focus (after initial load)
  //     if (isAiEnabled && hasVisited) {
  //       playVoice();
  //     }
  //     // Stop voice when navigating away
  //     return () => stopVoice();
  //   }, [isAiEnabled, hasVisited])
  // );

  const playVoice = (text: string = 'Please select the type of appointment.') => {
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

  const handleNavigateToConfirm = (type : { typeName : string }) => {
    setType(type.typeName);
    navigation.navigate('Confirm');
  };

  const handlePauseResume = () => {
    if (isSpeaking) {
      stopVoice();
    } else {
      playVoice();
    }
  };

  const handleCloseAi = () => {
    stopVoice();
    setShowAi(false);
  };

  const handleOpenAi = () => {
    playVoice();
    setShowAi(true);
  };

  const ApptTypeCard = ({ typeName, desc }: { typeName:string; desc:string }) => {
    return (
      <View style={[styles.elevation, styles.card]}>
        <Pressable onPress={() => {handleNavigateToConfirm({typeName})}} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
          <Image source={PlaceholderImage} style={styles.image} />
          <Text style={styles.typeText}>{typeName}</Text>
          <Text style={styles.descText}>{desc}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.background}>
      {/* Header */}
      <Text style={styles.chosenTimeText}>You have chosen {time}</Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>Choose Appointment Type</Text>
      </View>

      {/* Appointment Type Cards */}
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <ApptTypeCard typeName='Health Check-up' desc='Routine health check-up by a doctor' />
          <ApptTypeCard typeName='Blood test' desc='To get your blood tested by the lab'/>
          <ApptTypeCard typeName='Surgery' desc='For non-critical surgeries'/>
          <ApptTypeCard typeName="Doctor's Consultation" desc='For normal illness or injuries'/>
        </ScrollView>
      </View>

      <View style={styles.helpBtnContainer}>
        <TouchableOpacity style={styles.aiIcon} onPress={handleOpenAi}>
          <Text style={styles.helpButton}>Help</Text>
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
            <Text style={styles.aiText}>Please select the type of appointment.</Text>
            <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
              <Text style={styles.controlButtonText}>{isSpeaking ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 10,
  },
  chosenTimeText: {
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    textDecorationLine: 'underline',
    paddingTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },

  scrollContainer: {
    marginTop: 10,
    width: '100%',
    height: '70%',
    marginBottom: 10,
  },
  scrollView: {
    width: '100%',
    height: 'auto',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 'auto',
  },
  card: {
    width: '85%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    alignItems: 'stretch',
    marginBottom: 10,
  },
  elevation: {
    elevation: 4,
    shadowColor: '#171717',
  },
  image: {
    alignSelf: 'center',
    width: '85%',
    height: 150,
    borderRadius: 18,
  },
  typeText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  descText: {
    marginTop: 10,
    fontSize: 24,
    textAlign: 'center'
  },

  helpBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  helpButton: {
    position: 'absolute',
    backgroundColor: '#007AFF',
    borderRadius: 15,
    width: 50,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 16,
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
    position: 'relative',
    alignItems: 'center',
  },
  aiText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
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
});

export default LocationsScreen;
