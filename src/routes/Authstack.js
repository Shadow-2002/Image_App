import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../features/Login';

export default function Authstack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ animation: 'slide_from_right',headerShown: false }} initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
}
