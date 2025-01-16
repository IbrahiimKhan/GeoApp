import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Polygon, Marker } from 'react-native-maps';

export default function MapScreen() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [fence, setFence] = useState([]);

  const handleMapPress = (e) => {
    setFence([...fence, e.nativeEvent.coordinate]);
  };

  const handleSave = () => {
    //save the fetch
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={handleMapPress}
      >
        {fence.length > 0 && <Polygon coordinates={fence} fillColor="rgba(0, 150, 136, 0.5)" />}
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
