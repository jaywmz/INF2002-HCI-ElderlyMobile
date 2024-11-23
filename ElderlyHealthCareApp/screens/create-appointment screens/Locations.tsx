import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image } from 'expo-image';
import * as Speech from 'expo-speech';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParamList } from '../../types';

const PlaceholderImage = require('../../assets/background-image.png');

type LocationsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Locations'>;

type Props = {
  navigation: LocationsScreenNavigationProp;
  isAiEnabled: boolean;
  setLocation: (location : string) => void;
};

const LocationsScreen = ({ navigation, isAiEnabled, setLocation }: Props) => {
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

  const playVoice = (text: string = 'Please click on your preferred location for your appointment.') => {
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

  const handleNavigateToCalendar = (location : { locName : string }) => {
    setLocation(location.locName);
    navigation.navigate('Calendar');
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

  const LocationCard = ({ locName, address }: { locName:string; address:string }) => {
    return (
      <View style={[styles.elevation, styles.card]}>
        <Pressable onPress={() => {handleNavigateToCalendar({locName})}} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
          <Image source={PlaceholderImage} style={styles.image} />
          <Text style={styles.locationText}>{locName}</Text>
          <Text style={styles.addressText}>{address}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.background}>
      {/* Location Cards */}
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <LocationCard locName='Sengkang General Hospital' address='110 Sengkang E Wy, Singapore 544886' />
          <LocationCard locName='Farrer Park Hospital' address='1 Farrer Park Station Rd, #02-01 Connexion, Singapore 217562'/>
          <LocationCard locName='Khoo Teck Puat Hospital' address='90 Yishun Central, Singapore 768828'/>
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
          <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon}/>
          <View style={styles.aiTextContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseAi}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.aiText}>Please click on your preferred location for your appointment.</Text>
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
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },

  scrollContainer: {
    paddingTop: 25,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
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
    width: 350,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 25,
  },
  elevation: {
    elevation: 4,
    shadowColor: '#171717',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 18,
  },
  locationText: {
    paddingTop: 15,
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  addressText: {
    paddingTop: 10,
    fontSize: 25,
    textAlign: 'center',
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
