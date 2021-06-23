import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigationRef';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as LoginProvider } from './src/context/LoginContext';
import { Provider as WHProvider } from './src/context/WHContext';
import { Provider as ItemProvider } from './src/context/ItemContext';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import DBScreen from './src/screens/DBScreen';
import SettingScreen from './src/screens/SettingScreen';
import MainScreen from './src/screens/MainScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './src/component/drawer/DrawerContent';

const Stack = createStackNavigator();
const DrawerFlow = createDrawerNavigator();

function Drawer() {
  return (
    <DrawerFlow.Navigator initialRouteName="Container" drawerContent={props => <DrawerContent {...props} />}>
      <DrawerFlow.Screen name="Main" component={MainScreen} />
    </DrawerFlow.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='DB' component={DBScreen} />
        <Stack.Screen name='Setting' component={SettingScreen} />
        <Stack.Screen name='Drawer' component={Drawer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default props => {
  return (
    <LoginProvider>
      <WHProvider>
        <ItemProvider>
          <App />
        </ItemProvider>
      </WHProvider>
    </LoginProvider>
  )
}