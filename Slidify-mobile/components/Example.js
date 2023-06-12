import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import { Dimensions } from 'react-native';
import { Button, Center, Pressable, View, useColorMode } from 'native-base';
import Layout from './core/Layout';
import { MaterialIcons } from '@expo/vector-icons';

const finderWidth = 280;
const finderHeight = 230;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

export default function Example() {
    const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
    const [scanned, setScanned] = useState(false);
    const { colorMode } = useColorMode();

    const handleBarCodeScanned = (scanningResult) => {
        console.log(scanningResult)
        if (!scanned) {
            const { type, data, bounds: { origin } = {} } = scanningResult;
            const { x, y } = origin;
            if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
                setScanned(true);
                console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
            }
        }
    };

    return (
        <Layout pt={0} >
            <Center flex={1} >
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    type={type}
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
                            <MaterialIcons name="flip-camera-android" size={Dimensions.get('window').width * 0.07} color={colorMode == 'dark' ? 'white' : 'black'} />
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

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
