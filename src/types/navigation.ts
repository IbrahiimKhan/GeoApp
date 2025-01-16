    import { NavigationProp, RouteProp } from '@react-navigation/native';

    export type RootStackParamList = {
        Home: undefined;
        Map: undefined; // Add any parameters if needed
    };

    export type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;
    export type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;