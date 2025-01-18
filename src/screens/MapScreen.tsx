import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView, {
  MapPressEvent,
  Marker,
  Polygon,
  Region,
} from 'react-native-maps';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch } from 'react-redux';
import { colors } from '../constants/colors';
import { deviceWidth, safeWidth } from '../constants/layout';
import { saveMap } from '../store/store';
import { theme } from '../theme';
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


import { RouteProp } from '@react-navigation/native';

interface MapScreenProps {
  route: RouteProp<RootStackParamList, 'Map'>;
}

export default function MapScreen({ route }: MapScreenProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [region, setRegion] = useState<Region>({
    ...INITIAL_REGION,
    ...route?.params,
  });


  const [fence, setFence] = useState<Coordinate[]>([]);
  const dropDownColors = Object.entries(colors).map(([_index, value]) => ({
    title: value,
  }));
  const [color, setcolor] = useState(dropDownColors[0]);

  const dispatch = useDispatch();

  const handleMapPress = (event: MapPressEvent) => {
    const {coordinate} = event.nativeEvent;
    setFence(prevFence => [...prevFence, coordinate]);
  };

  const handleSave = () => {
    if (fence.length === 0) {
      return;
    }
    dispatch(saveMap({name: `Fence ${Date.now()}`, coordinates: fence}));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={handleMapPress}>
        {fence.length > 0 && (
          <Polygon coordinates={fence} fillColor={color?.title} />
        )}
        {fence.map((point, index) => (
          <Marker key={index} coordinate={point} />
        ))}
      </MapView>

          <Pressable style={styles.btn} onPress={handleSave}>
                  <Text style={styles.btnText}>Save This Map</Text>
                </Pressable>
        <SelectDropdown
          data={dropDownColors}
          onSelect={selectedItem => {
            setcolor(selectedItem);
          }}
          renderButton={selectedItem => {
            return (
              <View style={styles.btn}>
                <Text style={styles.btnText}>
                  {(selectedItem && selectedItem.title) ||
                    'Choose Fill Color'}
                </Text>
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.pickerItems,
                  ...(isSelected && {backgroundColor: '#D2D9DF'}),
                }}>
                <Text>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1,paddingBottom:10},
  map: {flex: 1},
  pickerItems: {
    padding: theme.spacing[8],
    width:deviceWidth,
    top:0,
  },
  dropdown: {
    backgroundColor: colors.primary,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btn: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[6],
    borderRadius: theme.spacing[4],
    backgroundColor: colors.primary,
    ...theme.shadows.light,
    marginTop: theme.spacing[4],
    width:safeWidth,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
