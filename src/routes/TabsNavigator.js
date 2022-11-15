import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import HomeSVG from '../assets/images/svg/HomeSVG';
import { Colors } from '../styles';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          // tabBarIcon: ({color}) => {
          //   return <HomeSVG height={20} width={20} color={color} />;
          // },
          unmountOnBlur: true,
          tabBarHideOnKeyboard: true,
        }}
      />

    </Tab.Navigator>
  );
};

export default TabsNavigator;
