    import { NavigationProp, RouteProp } from '@react-navigation/native';

    export type RootStackParamList = {
        Home: undefined;
        Map: {longitude:number,latitude:number};
    };

    export type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;
    export type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;
