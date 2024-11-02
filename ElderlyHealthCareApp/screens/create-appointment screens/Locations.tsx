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
};

const LocationsScreen = ({ navigation, isAiEnabled }: Props) => {
  const [showAi, setShowAi] = useState(isAiEnabled);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasVisited, setHasVisited] = useState(false); // Track if the screen has been visited before

  // Play AI voice on initial load if not previously visited
  useEffect(() => {
    if (isAiEnabled && !hasVisited) {
      playVoice();
      setHasVisited(true); // Mark as visited after playing the first time
    }
  }, [isAiEnabled, hasVisited]);

  useFocusEffect(
    useCallback(() => {
      // Play AI voice every time the screen regains focus (after initial load)
      if (isAiEnabled && hasVisited) {
        playVoice();
      }
      // Stop voice when navigating away
      return () => stopVoice();
    }, [isAiEnabled, hasVisited])
  );

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

  const handleNavigateToCalendar = () => {
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

  const LocationCard = () => {
    return (
      <View style={[styles.elevation, styles.card]}>
        <Pressable onPress={handleNavigateToCalendar} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
          <Image source={PlaceholderImage} style={styles.image} />
          <Text style={styles.locationText}>Location</Text>
          <Text style={styles.locationText}>Address</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.background}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Choose location</Text>
      </View>

      {/* AI Assistance Section */}
      {showAi && (
        <View style={styles.aiContainer}>
          <Image source={require('../../assets/AI_nurse.jpg')} style={styles.aiIcon} />
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

      {/* Location Cards */}
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <LocationCard />
          <LocationCard />
          <LocationCard />
        </ScrollView>
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
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    height: '90%',
    overflow: 'hidden',
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
    width: 320,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    marginBottom: 20,
    alignItems: 'center',
  },
  elevation: {
    elevation: 4,
    shadowColor: '#171717',
  },
  image: {
    width: 280,
    height: 200,
    borderRadius: 18,
  },
  locationText: {
    paddingTop: 10,
    fontSize: 20,
  },
  aiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  aiIcon: {
    width: 50,
    height: 80,
    marginRight: 10,
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
