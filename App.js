
 import React from 'react';
 import {StatusBar} from 'react-native';
 import {NavigationContainer} from '@react-navigation/native';
 import RootSwitchNavigator, {
   navigationRef,
   isReadyRef,
 } from './src/routes/RootSwitchNavigator';
 import {AuthContextProvider} from './src/context/AuthContext';
 import {AppContextProvider} from './src/context/AppContext';
 
 const App = () => {
  
   return (
     <AuthContextProvider>
       <AppContextProvider>
         <StatusBar barStyle="dark-content" />
         <NavigationContainer
           ref={navigationRef}
          //  onReady={() => {
          //    isReadyRef.current = true;
          //  }}
           >
           <RootSwitchNavigator />
         </NavigationContainer>
       </AppContextProvider>
     </AuthContextProvider>
   );
 };
 
 export default App;
 