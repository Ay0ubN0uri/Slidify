import { Center, Heading, Pressable, VStack, View } from "native-base"
import Layout from "../components/core/Layout"
import { Dimensions } from "react-native"
import LottieView from 'lottie-react-native';
import { useContext, useEffect, useRef, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import CustomError from "../components/core/CustomError";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/context/auth-context";


const HomeScreen = ({ route }) => {
    const navigation = useNavigation();
    const animation = useRef(null);
    const [isClicked, setIsClicked] = useState(false);
    const [error, setError] = useState(false);
    const { data } = useContext(AuthContext);

    useEffect(() => {
        if (data.isConnected) {
            navigation.push('control')
        }
    }, [])


    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        animation.current.reset();
        setIsClicked(false);
        if (status === 'granted') {
            navigation.push('qrcode')
        }
        else {
            setError(true);
        }
    };

    const connectHandler = () => {
        animation.current.play();
        setIsClicked(true)
        setTimeout(getBarCodeScannerPermissions, 2000);
    }


    return (
        <Layout pt={8}>
            <Center flex={1}>
                {
                    !error ?
                        <VStack>
                            <Heading textAlign={'center'} alignSelf={'center'}>
                                PRESS TO CONNECT
                            </Heading>
                            <View
                                borderRadius={'full'}
                                alignSelf={'center'}
                            >
                                <Pressable
                                    android_ripple={{
                                        color: '#93c5fd',
                                        borderless: true
                                    }}
                                    isDisabled={isClicked}
                                    onPress={connectHandler}>
                                    <LottieView
                                        style={{
                                            width: Dimensions.get('window').width * 0.7,
                                            height: Dimensions.get('window').width * 0.7,
                                            alignSelf: 'center'
                                        }}
                                        ref={animation}
                                        source={require('../assets/connect.json')}
                                        loop
                                    />
                                </Pressable>
                            </View>
                            <Heading textAlign={'center'} alignSelf={'center'} size={'md'} flexWrap={'wrap'}>
                                Please make sure you are{'\n'} in the same network
                            </Heading>
                        </VStack>
                        :
                        <CustomError msg={'Camera permission not granted!'} onPress={() => {
                            setError(false);
                        }}
                            buttonLabel="Try again"
                            showButton
                        />
                }
            </Center>
        </Layout>
    )
}

export default HomeScreen
