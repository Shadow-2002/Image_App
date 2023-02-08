import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/routes/AppNavigation';
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export default function App() {

  const [loggedIn, setloggedIn] = useState(false);
  return (
    <UserContext.Provider value={{ loggedIn, setloggedIn }}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </UserContext.Provider>
  );
}