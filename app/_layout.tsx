import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState, ComponentProps } from 'react';
import AnimatedSplash from "react-native-animated-splash-screen";
import { useColorScheme } from '@/hooks/useColorScheme';
import Toast from "react-native-toast-message";
import { Ionicons } from '@expo/vector-icons';

import App from './index';
import PrePage from './blocks/prepage/PrePage';
import Chats from './blocks/home/Chats';
import Calls from './blocks/home/Calls';
import Stories from './blocks/home/Stories';
import Font from '@/constants/Font';
import TabHeader from '@/components/TabHeader';
import ShakeAnimation from '@/components/ShakeAnimation';
import ToastConfig from '@/constants/ToastConfig';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const colorScheme = useColorScheme();
  const [baseFont] = useFonts(Font);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (baseFont) {
      SplashScreen.hideAsync();
      setTimeout(() => {
        setIsLoaded(true);
      }, 3000);
    }
  }, [baseFont]);

  if (!baseFont) {
    return null;
  }

  function Tabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,

          tabBarIcon: ({ color, focused, size }) => {
            let iconName: ComponentProps<typeof Ionicons>['name'] = 'home';

            if (route.name === 'Chats') {
              iconName = focused
                ? 'chatbox-ellipses'
                : 'chatbox-ellipses-outline';
            } else if (route.name === 'Calls') {
              iconName = focused
                ? 'call'
                : 'call-outline';
            } else if (route.name === 'Stories') {
              iconName = focused
                ? 'book'
                : 'book-outline';
            }

            return (
              <ShakeAnimation focused={focused}>
                <Ionicons name={iconName} size={size} color={color} />
              </ShakeAnimation>
            );
          },

          tabBarStyle: {
            height: 60,
          },

          tabBarLabelStyle: {
            fontFamily: 'Regular',
            fontSize: 12,
          },

          header: () => <TabHeader />,
        })}
      >
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Calls" component={Calls} />
        <Tab.Screen name="Stories" component={Stories} />
      </Tab.Navigator>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NavigationContainer independent>
        <AnimatedSplash
          translucent={true}
          isLoaded={isLoaded}
          logoImage={require("../src/assets/images/me.png")}
          backgroundColor={"#DDDDDD"}
          logoHeight={150}
          logoWidth={150}
        >
          <Stack.Navigator
            initialRouteName='App'
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="App" component={App} />
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="PrePage" component={PrePage} options={{ headerShown: false }} />
          </Stack.Navigator>
        </AnimatedSplash>
      </NavigationContainer>
      <Toast config={ToastConfig} />
    </ThemeProvider>
  );
}
