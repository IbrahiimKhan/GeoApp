import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { theme } from '../theme';
import { RootStackParamList } from '../types/navigation';

const HomeScreen = (): ReactElement => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.button}>
        <Pressable style={styles.button} onPress={()=>navigation.navigate('Map')}>
      <Text style={styles.text}>Add New Map</Text>
    </Pressable>
        </View>
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
    backgroundColor:colors.light,
  },
  content: {
    padding: theme.spacing[10],
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[6],
    borderRadius: theme.spacing[4],
    backgroundColor: colors.primary,
    ...theme.shadows.light,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
