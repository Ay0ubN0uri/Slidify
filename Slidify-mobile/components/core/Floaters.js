import { Pressable, View, useColorMode } from "native-base";
import { useRef } from "react";
import LottieView from 'lottie-react-native';
import { Dimensions } from "react-native";
import { useNavigationState } from "@react-navigation/native";

// https://magna25.github.io/lottie-editor/

const Floaters = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const animation = useRef(null);
    const state = useNavigationState(state => state);

    let navigationMode = 'tab';
    if (state && (state.routeNames[state.index] === 'qrcode' || state.routeNames[state.index] === 'control')) {
        navigationMode = 'stack';
    }

    return (
        <>
            <View
                // bottom={16}
                right={5}
                bottom={navigationMode == 'tab' ? 16 : 4}
                position={'absolute'}
                borderRadius={'full'}
            >
                <Pressable
                    android_ripple={{
                        color: '#93c5fd',
                        borderless: true
                    }}
                    onPress={() => {
                        if (colorMode == 'dark') {
                            animation.current.play();
                        }
                        else {
                            animation.current.reset();
                        }
                        toggleColorMode();
                    }}
                >
                    <LottieView
                        ref={animation}
                        style={{
                            width: Dimensions.get('window').width * 0.07,
                            height: Dimensions.get('window').height * 0.07,
                        }}
                        source={require('../../assets/c.json')}
                        loop={false}
                    />
                </Pressable>
            </View>
        </>
    )
}

export default Floaters;
