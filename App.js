import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import 'react-native-gesture-handler';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator>
  <Stack.Screen
  name="Movie Hub"
  component={HomeScreen}
  options={{
    headerTitleAlign: 'center', // ✅ center the text
    headerStyle: {
      backgroundColor: '#000',   // header background
    },
    headerTintColor: '#e50914', // ✅ makes back icon (if any) red
    headerTitleStyle: {
      color: '#e50914',          // ✅ makes title red
      fontWeight: 'bold',
      fontSize: 30,
      fontFamily: 'cursive', // ✅ or a custom font if loaded
    },
  }}
/>

</Stack.Navigator>

    </NavigationContainer>
  );
}
