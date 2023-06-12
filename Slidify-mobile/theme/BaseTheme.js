import { extendTheme } from "native-base";

const BaseTheme = extendTheme({
    components: {
        Button: {
            // Can simply pass default props to change default behaviour of components.
            baseStyle: {
                rounded: 'md',
                color: '#ccdd'
            },
            defaultProps: {
                // _text:{
                //     color:'#000'
                // },
                // color: '#ccdd',
                // colorScheme: '#ccdd',
                // bg: "#dcc10f"
            },
        },
        Heading: {
            baseStyle: ({ colorMode }) => {
                return {
                    _light: {
                        color: 'warmGray.900'
                    },
                    _dark: {
                        color: 'warmGray.100'
                    }
                };
            }
            // baseStyle: ({ colorMode }) => {
            //     console.log(colorMode);
            //     return {
            //         color: colorMode === 'dark' ? 'red.300' : 'blue.300',
            //     };
            // }
        },
        Select: {
            baseStyle: ({ colorMode }) => {
                return {
                    _light: {
                        color: 'warmGray.900'
                    },
                    _dark: {
                        color: 'warmGray.100'
                    }
                };
            }
        }
    },
    Pressable: {
        cursor: 'pointer',
    },
    fontConfig: {
        Archivo: {
            100: {
                normal: 'Archivo-Thin',
                italic: 'Archivo-ThinItalic'
            },
            200: {
                normal: 'Archivo-ExtraLight',
                italic: 'Archivo-ExtraLightItalic'
            },
            300: {
                normal: 'Archivo-Light',
                italic: 'Archivo-LightItalic'
            },
            400: {
                normal: 'Archivo-Regular',
                italic: 'Archivo-Italic'
            },
            500: {
                normal: 'Archivo-Medium',
                italic: 'Archivo-MediumItalic'
            },
            600: {
                normal: 'Archivo-SemiBold',
                italic: 'Archivo-SemiBoldItalic'
            },
            700: {
                normal: 'Archivo-Bold',
                italic: 'Archivo-BoldItalic'
            },
            800: {
                normal: 'Archivo-ExtraBold',
                italic: 'Archivo-ExtraBoldItalic'
            },
            900: {
                normal: 'Archivo-Black',
                italic: 'Archivo-BlackItalic'
            },
        }
    },
    fonts: {
        heading: "Archivo",
        body: "Archivo",
        mono: "Archivo",
    },
    colors: {
        // primary: {
        //     50: '#fffbdd',
        //     100: '#fcf3b2',
        //     200: '#faeb84',
        //     300: '#f8e354',
        //     400: '#f6db26',
        //     500: '#dcc10f',
        //     600: '#ab9607',
        //     700: '#7a6b02',
        //     800: '#494000',
        //     900: '#1a1500',
        // }
    },
    config: {
        useSystemColorMode: false,
        initialColorMode: 'dark',
    }
});

export default BaseTheme;



export const fonts = {
    'Archivo-Thin': require('../assets/fonts/Archivo-Thin.ttf'),
    'Archivo-ThinItalic': require('../assets/fonts/Archivo-ThinItalic.ttf'),
    'Archivo-ExtraLight': require('../assets/fonts/Archivo-ExtraLight.ttf'),
    'Archivo-ExtraLightItalic': require('../assets/fonts/Archivo-ExtraLightItalic.ttf'),
    'Archivo-Light': require('../assets/fonts/Archivo-Light.ttf'),
    'Archivo-LightItalic': require('../assets/fonts/Archivo-LightItalic.ttf'),
    'Archivo-Regular': require('../assets/fonts/Archivo-Regular.ttf'),
    'Archivo-Italic': require('../assets/fonts/Archivo-Italic.ttf'),
    'Archivo-Medium': require('../assets/fonts/Archivo-Medium.ttf'),
    'Archivo-MediumItalic': require('../assets/fonts/Archivo-MediumItalic.ttf'),
    'Archivo-SemiBold': require('../assets/fonts/Archivo-SemiBold.ttf'),
    'Archivo-SemiBoldItalic': require('../assets/fonts/Archivo-SemiBoldItalic.ttf'),
    'Archivo-Bold': require('../assets/fonts/Archivo-Bold.ttf'),
    'Archivo-BoldItalic': require('../assets/fonts/Archivo-BoldItalic.ttf'),
    'Archivo-ExtraBold': require('../assets/fonts/Archivo-ExtraBold.ttf'),
    'Archivo-ExtraBoldItalic': require('../assets/fonts/Archivo-ExtraBoldItalic.ttf'),
    'Archivo-Black': require('../assets/fonts/Archivo-Black.ttf'),
    'Archivo-BlackItalic': require('../assets/fonts/Archivo-BlackItalic.ttf'),
}


export const ThemeMode = {
    dark: {
        bgColor: ''
    },
    light: {
        bgColor: ''
    }
}