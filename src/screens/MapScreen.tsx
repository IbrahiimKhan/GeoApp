import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Polygon, Marker, Region, MapPressEvent } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { saveMap } from '../store/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

interface Coordinate {
  latitude: number;
  longitude: number;
}

const INITIAL_REGION: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [fence, setFence] = useState<Coordinate[]>([]);

  const dispatch = useDispatch();

  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setFence((prevFence) => [...prevFence, coordinate]);
  };

  const handleSave = () => {
    if (fence.length === 0) {
      return;
    }
    dispatch(saveMap({ name: `Fence ${Date.now()}`, coordinates: fence }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={handleMapPress}
      >
        {fence.length > 0 && (
          <Polygon coordinates={fence} fillColor="rgba(0, 150, 136, 0.5)" />
        )}
        {fence.map((point, index) => (
          <Marker key={index} coordinate={point} />
        ))}
      </MapView>
      <Button title="Save GeoFence" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
