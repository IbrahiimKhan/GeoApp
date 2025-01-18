import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { MainStack } from './MainStack';
import BootSplash from 'react-native-bootsplash';

const Navigator = () => {
  return (
   <NavigationContainer
   onReady={() => {
    void BootSplash.hide({ fade: true });
  }}
   >
     <MainStack/>
   </NavigationContainer>
  );
};

export default Navigator;
