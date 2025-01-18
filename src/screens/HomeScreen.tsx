import React, { ReactElement, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { colors } from '../constants/colors';
import { theme } from '../theme';
import { RootStackParamList } from '../types/navigation';
import { safeWidth } from '../constants/layout';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = (): ReactElement => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const savedMaps = useSelector((state: any) => state.geoFence.savedMaps);
  const [userLoation, setUserLoation] = useState<{longitude:number,latitude:number}>({longitude:0,latitude:0});

  const renderMapItem = ({ item }: { item: any }) => (
    <View style={styles.mapItemContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/GeoFence.jpg/800px-GeoFence.jpg',
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.mapItemText}>{item.name || 'Unnamed Map'}</Text>
    </View>
  );




  const   handleEnabledLocation = async() =>{
    if (Platform.OS === 'android') {
      try {
      const enabled =  await promptForEnableLocationIfNeeded();
      console.log(enabled);
      if (enabled) {
       await requestLocationPermission();
      }
      } catch (error: unknown) {
        if (error instanceof Error) {
           console.log('something went wrong');
        }
      }
    }
  };


   const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'This app needs access to your location.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
        } else {
            console.log('Location permission denied');
        }
    } else {
        getCurrentLocation();
    }
  };


   const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
           setUserLoation({latitude,longitude});
        },
        (error) => {
          console.log('Error getting location',error);
        },
    );
  };


  useEffect(() => {
   handleEnabledLocation();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={savedMaps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMapItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No saved maps yet.</Text>}
        />
        <Pressable style={styles.addButton} onPress={() => navigation.navigate('Map',userLoation)}>
          <Text style={styles.addButtonText}>Add New Map</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light,
    paddingBottom:10,
  },
  content: {
    width: '100%',
    paddingHorizontal: theme.spacing[4],
  },
  imageContainer: {
    width: safeWidth,
    height: safeWidth / 2,
    borderRadius: theme.spacing[10],
    overflow: 'hidden',
    marginBottom: theme.spacing[2],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  mapItemContainer: {
    marginBottom: theme.spacing[4],
  },
  mapItemText: {
    fontSize: 16,
    paddingHorizontal: theme.spacing[2],
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: theme.spacing[4],
    fontSize: 16,
    color: colors.dark,
  },
  addButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[6],
    borderRadius: theme.spacing[4],
    backgroundColor: colors.primary,
    ...theme.shadows.light,
    marginTop: theme.spacing[4],
  },
  addButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
