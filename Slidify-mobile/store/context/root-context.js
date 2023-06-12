import { StatusBar } from "expo-status-bar";
import { useColorMode, useColorModeValue, useTheme, useToken } from "native-base";
import { createContext } from "react";

export const RootContext = createContext({
    themeMode: {
        current: {
            fgInactiveColor: '',
            bgHeaderColor: '',
            fgHeaderColor: '',
            bgColor: '',
            fgColor: ''
        },
        dark: {
        },
        light: {
        }
    },
});


const RootContextProvider = ({ children }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [lightBg, darkBg] = useToken(
        'colors',
        ['light.50', 'dark.50'],
        'dark.50',
    );
    const [lightFg, darkFg] = useToken(
        'colors',
        ['lightBlue.400', 'white'],
        'white',
    );
    const [lightBgHeader, darkBgHeader] = useToken(
        'colors',
        ['white', 'dark.100'],
        'dark.50',
    );
    const [lightFgHeader, darkFgHeader] = useToken(
        'colors',
        ['blue.600', 'blue.500'],
        'blue.600',
    );
    const theme = useTheme();

    const themeMode = {
        current: {
            bgHeaderColor: useColorModeValue(lightBgHeader, darkBgHeader),
            fgHeaderColor: useColorModeValue(lightFgHeader, darkFgHeader),
            bgColor: useColorModeValue(lightBg, darkBg),
            fgColor: useColorModeValue(lightFg, darkFg),
            fgInactiveColor: colorMode == 'light' ? '#93c5fd' : '#bfdbfe'
        },
        dark: {
            ...theme.colors.darkBlue
        },
        light: {
            ...theme.colors.lightBlue
        }
    }

    const value = {
        themeMode: themeMode
    };
    return (
        <RootContext.Provider value={value}>
            <StatusBar
                style={colorMode === 'dark' ? 'light' : 'dark'}
                backgroundColor={colorMode == 'dark' ? '#27272a' : '#f3f2f2'}
                translucent={true}
            />
            {children}
        </RootContext.Provider>
    )

}

export default RootContextProvider;