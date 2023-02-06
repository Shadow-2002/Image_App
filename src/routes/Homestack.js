import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../features/Home/';

export default function Homestack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{ animation: 'slide_from_right',headerShown: false }} initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}
