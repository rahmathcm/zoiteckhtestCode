import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screen/Home';
import { createStackNavigator } from '@react-navigation/stack';

function App() {
  const Stack = createStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
