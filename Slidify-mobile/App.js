import React, { useEffect } from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import BaseTheme, { fonts } from "./theme/BaseTheme";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import RootContextProvider from "./store/context/root-context";
import Root from "./components/RootComponent";
import { LogBox, View } from "react-native";
import Example from "./components/Example";
import { Text } from "react-native";
import AuthContextProvider from "./store/context/auth-context";
import './components/sheets'
import { SheetProvider } from "react-native-actions-sheet";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded])


  if (!fontsLoaded) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{
          color: 'red'
        }}>loading</Text>
      </View>
    );
  }

  return (
    <NativeBaseProvider theme={BaseTheme} >
      {/* <Example /> */}
      <SheetProvider>
        <RootContextProvider>
          <AuthContextProvider>
            <Root />
          </AuthContextProvider>
        </RootContextProvider>
      </SheetProvider>
    </NativeBaseProvider>
  );
}



