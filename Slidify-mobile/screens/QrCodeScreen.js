import { useContext, useEffect, useState } from 'react';
import Layout from '../components/core/Layout'
import { Button, Center, Heading, Pressable, View, useColorMode, useToast } from 'native-base'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Dimensions, StyleSheet } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import { MaterialIcons } from '@expo/vector-icons';
import LoadingSpinner from '../components/core/LoadingSpinner';
import { useNavigation } from '@react-navigation/native';
import { ToastAlert } from '../components/core/ToastAlert';
import { AuthContext } from '../store/context/auth-context';


const finderWidth = 280;
const finderHeight = 230;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

const QrCodeScreen = () => {
    const { setData } = useContext(AuthContext);
    const navigation = useNavigation();
    const toast = useToast()
    const [scanned, setScanned] = useState(false);
    const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
    const { colorMode } = useColorMode();
    // const [hasPermission, setHasPermission] = useState(true);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        // getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = (scanningResult) => {
        if (!scanned) {
            const { type, data, bounds: { origin } = {} } = scanningResult;
            const { x, y } = origin;
            if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
                setScanned(true);
                if (isValidData(data)) {
                    qrCodeData = JSON.parse(data)
                    setData({
                        token: qrCodeData.token,
                        url: qrCodeData.url,
                        isConnected: true
                    })
                    // navigation.navigate('home', JSON.parse(data));
                    navigation.navigate('control')
                }
                else {
                    const v = {
                        title: 'Invalid QrCode!!',
                        variant: "left-accent",
                        description: 'Please scan the qrcode of slidify desktop app',
                        isClosable: true,
                        status: 'error'
                    }
                    toast.show({
                        render: ({
                            id
                        }) => {
                            const onClose = () => { toast.close(id) }
                            return <ToastAlert id={id} {...v} onClose={onClose} />;
                        }
                    });
                }
            }
        }
    };

    const isValidData = (data) => {
        try {
            qrCodeData = JSON.parse(data)
            console.log(data)
            if (typeof qrCodeData === 'object' && qrCodeData !== null &&
                qrCodeData.hasOwnProperty('url') && qrCodeData.hasOwnProperty('token')) {
                if (!isValidURL(qrCodeData.url)) {
                    console.log('Invalid URL');
                    return false;
                }
                if (!isValidToken(qrCodeData.token)) {
                    console.log('Invalid Token');
                    return false;
                }
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            return false
        }
    }

    const isValidToken = (token) => {
        const tokenRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{1,10}$/;
        return tokenRegex.test(token);
    };
    const isValidURL = (url) => {
        const urlRegex = /^(http|https):\/\/([\w.-]+)(?::(\d+))?\/?([\w\/_.-]*)*$/;
        return urlRegex.test(url);
    };

    return (
        <Layout pt={0} >
            <Center flex={1} >
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    type={type}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    style={[StyleSheet.absoluteFillObject, styles.container]}>
                    <View
                        left={5}
                        bottom={4}
                        position={'absolute'}
                        borderRadius={'full'}
                    >
                        <Pressable
                            android_ripple={{
                                color: '#93c5fd',
                                borderless: true
                            }}
                            p={3}
                            onPress={() => {
                                setType(
                                    type === BarCodeScanner.Constants.Type.back
                                        ? BarCodeScanner.Constants.Type.front
                                        : BarCodeScanner.Constants.Type.back
                                );
                            }}>
                            <MaterialIcons name="flip-camera-android" size={Dimensions.get('window').width * 0.07} color={'white'} />
                        </Pressable>
                    </View>
                    <BarcodeMask backgroundColor='transparent' edgeColor="#3b82f6" showAnimatedLine={true} />
                </BarCodeScanner>
                {scanned &&
                    <Button
                        position={'absolute'}
                        bottom={6}
                        onPress={() => setScanned(false)}>
                        Scan Again
                    </Button>}
            </Center>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default QrCodeScreen