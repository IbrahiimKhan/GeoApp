    import { NavigationProp, RouteProp } from '@react-navigation/native';

    export type RootStackParamList = {
        Home: undefined;
        Map: {location:{
            longitude:number,latitude:number
        },fench?:any[],id?:number};
    };

    export type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;
    export type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;
