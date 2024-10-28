import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { globalStyles } from '../../styles/Theme';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { Image } from 'expo-image';

const PlaceholderImage = require('../../assets/background-image.png');

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

  const LocationCard = () => {
    return (
      <View style={[styles.elevation, styles.card]}>
        <Pressable 
          onPress={handleNavigateToCalendar}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1, // Change opacity when pressed
            },
          ]}
        >
          <Image source={PlaceholderImage} style={styles.image} />
          <Text style={styles.locationText}>Location 1</Text>
          <Text style={styles.locationText}>Address</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.background}>
      {/* Header with Logout button */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Choose location</Text>
      </View>
      <View style={{ height: 650, overflow: 'hidden' }}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <LocationCard></LocationCard>
          <LocationCard></LocationCard>
          <LocationCard></LocationCard>
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
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
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
  }
});

export default LocationsScreen;