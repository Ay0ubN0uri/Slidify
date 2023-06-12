import { Heading, Pressable, View, useColorMode, useTheme } from 'native-base';
import React, { useRef } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
} from 'react-native';
import ActionSheet, {
    SheetManager,
    useScrollHandlers,
} from 'react-native-actions-sheet';
import tinycolor from 'tinycolor2';

function SelectSheet({ sheetId, payload }) {
    const actionSheetRef = useRef(null);
    const scrollHandlers = useScrollHandlers('1', actionSheetRef);
    const { colors } = useTheme()
    const { colorMode } = useColorMode();
    const colorss = [...new Set(Object.values(colors).map(color => color["500"]).filter(color => color != undefined))]
    // const colorss = Object.values(colors).map(color => [color['400'], color["500"]]).filter(color => !color.includes(undefined))


    return (
        <ActionSheet
            id={sheetId}
            ref={actionSheetRef}
            // onBeforeShow={() => {
            //     console.log('sheet payload', payload?.sliceCount);
            // }}
            snapPoints={[30, 60, 100]}
            initialSnapIndex={0}
            statusBarTranslucent
            drawUnderStatusBar={true}
            gestureEnabled={true}
            containerStyle={{
                backgroundColor: colorMode == 'dark' ? '#27272a' : 'white'
            }}
            defaultOverlayOpacity={0.3}>
            <View
                style={{
                    paddingHorizontal: 12,
                    maxHeight: '100%',
                }}>
                <Heading textAlign={'center'} m={1}>
                    Select a slide
                </Heading>
                <ScrollView {...scrollHandlers} style={styles.scrollview}>
                    <View style={styles.container} mt={2}>
                        {Array(payload?.sliceCount).fill().map((_, index) => index + 1).map(idx => (
                            <View
                                borderRadius={'full'}
                                mb={3}
                                key={idx}
                            >
                                <Pressable
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    onPress={() => {
                                        // console.log(idx)
                                        SheetManager.hide(sheetId, {
                                            payload: idx
                                        });
                                    }}
                                    android_ripple={{
                                        color: tinycolor(colorss[idx % colorss.length]).lighten(20).toString('hex'),
                                        borderless: true
                                    }}
                                    style={[
                                        styles.circle,
                                        {
                                            backgroundColor: colorss[idx % colorss.length],
                                        },
                                    ]}
                                >
                                    <Heading color={'white'}>
                                        {idx}
                                    </Heading>
                                </Pressable>
                            </View>
                        ))}
                    </View>
                    <View height={10} />
                </ScrollView>
            </View>
        </ActionSheet>
    );
}

const styles = StyleSheet.create({
    footer: {
        height: 100,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    placeholder: {
        height: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 15,
        borderRadius: 5,
    },
    circle: {
        width: Dimensions.get('window').width * 0.16,
        height: Dimensions.get('window').width * 0.16,
        borderRadius: 100,
    },
    btnLeft: {
        width: 30,
        height: 30,
        backgroundColor: '#f0f0f0',
        borderRadius: 100,
    },
    input: {
        width: '100%',
        minHeight: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    scrollview: {
        width: '100%',
        // padding: 12,
    },
});

export default SelectSheet;
