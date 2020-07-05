import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from "./components/Home";
import Forecasts from "./components/Forecasts";
import { AppProvider } from './AppContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const forecastsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const forecastsStackScreen = () => {
  return(
      <forecastsStack.Navigator>
        <forecastsStack.Screen name='Hourly Forecasts' component={Forecasts} />
        <forecastsStack.Screen name='Daily Forecasts' component={Forecasts} />
        <forecastsStack.Screen name='Food For The Weather' component={Forecasts}/>
      </forecastsStack.Navigator>
  )
}

export default function ButtonBasics(){
    return (
      <AppProvider>
        <NavigationContainer>
          <Tab.Navigator
           screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Forecasts') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}

          tabBarOptions={{
            activeTintColor: '#10B8ED',
            inactiveTintColor: 'gray',
          }}
          >
            <Tab.Screen
                name="Home"
                component={Home}
            />
            <Tab.Screen
                name="Forecasts"
                component={forecastsStackScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </AppProvider>
    );
}









