import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SecondaryNavigator from "./SecondaryNavigator";
import { useContext, useEffect } from "react";
import { RootContext } from "../store/context/root-context";
import QrCodeScreen from "../screens/QrCodeScreen";
import { FontAwesome5 } from '@expo/vector-icons';
import ControlScreen from "../screens/ControlScreen";
import { Pressable, View } from "native-base";
import LottieView from 'lottie-react-native';
import { Dimensions } from "react-native";


// const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const { themeMode } = useContext(RootContext);

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: themeMode.current.bgHeaderColor,
            },
            headerTitleStyle: {
                fontFamily: 'Archivo-Medium',
                backgroundColor: themeMode.current.bgHeaderColor,
            },
            headerTintColor: themeMode.current.fgHeaderColor,
            headerTitleAlign: 'center',
            presentation: 'modal',
            gestureEnabled: true,
        }}>
            <Stack.Screen name="ExpensesOverview" component={SecondaryNavigator} options={{
                headerShown: false
            }} />
            <Stack.Screen name="qrcode" component={QrCodeScreen} options={{
                title: 'Scan QrCode',
            }} />
            <Stack.Screen name="control" component={ControlScreen} options={{
                title: 'PPT Controller',
                // headerLeft: (props) => {
                //     console.log(props)
                //     return (
                //         <View
                //             borderRadius={'full'}
                //         >
                //             <Pressable
                //                 borderRadius={'full'}
                //                 android_ripple={{
                //                     color: '#f87171',
                //                     borderless: true
                //                 }}
                //                 p={2}
                //                 onPress={() => {
                //                     console.log('hello')
                //                 }}
                //             >
                //                 <FontAwesome5 name="power-off" size={24} color="#dc2626" />
                //             </Pressable>
                //         </View>
                //     )
                // }
            }} />
        </Stack.Navigator>
    );
}

export default RootNavigator;