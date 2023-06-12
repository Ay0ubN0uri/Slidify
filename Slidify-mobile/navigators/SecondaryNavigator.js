import { useColorMode, useColorModeValue } from "native-base";
import { useContext, useEffect } from "react";
import { RootContext } from "../store/context/root-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import About from "../screens/About";
import { Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

const SecondaryNavigator = () => {
    const { themeMode } = useContext(RootContext);
    const { colorMode } = useColorMode();


    // const bgColor = useColorModeValue('coolGray.50', 'red');
    // console.log(themeMode);
    return (
        <Tab.Navigator screenOptions={({ navigation }) => ({
            headerStyle: {
                backgroundColor: themeMode.current.bgHeaderColor,
            },
            headerShown: false,
            headerTintColor: themeMode.current.fgHeaderColor,
            tabBarStyle: {
                backgroundColor: themeMode.current.bgHeaderColor,
                elevation: 10,
                borderTopWidth: colorMode == 'dark' ? 0 : 1,
            },
            tabBarActiveTintColor: themeMode.current.fgHeaderColor,
            tabBarInactiveTintColor: themeMode.current.fgInactiveColor,
            tabBarAllowFontScaling: true,
        })}>
            <Tab.Screen name="home" component={HomeScreen} options={{
                title: 'Home',
                tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} />
            }} />
            <Tab.Screen name="about" component={About} options={{
                title: 'About',
                tabBarIcon: ({ color, size }) => <Entypo name="info" size={size} color={color} />
            }} />
        </Tab.Navigator>
    )
}

export default SecondaryNavigator;