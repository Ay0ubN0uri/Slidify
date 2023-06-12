import { AlertDialog, Box, Button, Center, Divider, HStack, Heading, Pressable, Text, VStack, View, useColorMode, useTheme, useToast } from "native-base"
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { fetchInfos, sendCommand } from "../utils/http"
import { AuthContext } from "../store/context/auth-context"
import Layout from "../components/core/Layout"
import LoadingSpinner from "../components/core/LoadingSpinner"
import { Dimensions } from "react-native"
import CustomError from "../components/core/CustomError"
import LottieView from 'lottie-react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ToastAlert } from "../components/core/ToastAlert"
import ActionSheet, { SheetManager } from "react-native-actions-sheet"
import { MaterialCommunityIcons } from '@expo/vector-icons';


const ControlScreen = ({ navigation }) => {
    const animation = useRef(null);
    const { data, logout } = useContext(AuthContext)
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [presentationData, setPresentationData] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef(null);
    const { colorMode } = useColorMode()
    const [isClicked, setIsClicked] = useState(false);
    const [isGotoClicked, setIsGotoClicked] = useState(false);
    const toast = useToast();

    const onClose = () => setIsOpen(false);

    const fetchPPTData = async () => {
        const resp = await fetchInfos(`${data.url}/get_infos`, data.token);
        setIsLoading(false)
        setError(resp.error ?? resp.detail ?? resp.message ?? '');
        setPresentationData(resp.error || resp.detail || resp.message ? null : resp)
        // console.log('data : ', resp)
    }

    useEffect(() => {
        navigation.addListener('beforeRemove', e => {
            e.preventDefault();
        });
        const interval = setInterval(fetchPPTData, 2000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    const closeConnectinHandler = async () => {
        setIsOpen(false);
        await sendCommand(`${data.url}/control`, data.token, {
            command: 'exit'
        });
        logout()
        navigation.navigate('home')
    }

    const startSlideShowHandler = async () => {
        console.log('hello')
        animation.current.play()
        setIsClicked(true);
        const resp = await sendCommand(`${data.url}/control`, data.token, {
            command: 'start',
        });
        animation.current?.reset()
        setIsClicked(false);
        if (resp.error) {
            const v = {
                title: 'Error starting slide show!!',
                variant: "left-accent",
                description: 'Try again or start it from your pc',
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

    const gotoHandler = async () => {
        setIsGotoClicked(true)
        const slide = await SheetManager.show("select-sheet", {
            payload: { sliceCount: presentationData?.count },
        });
        setIsGotoClicked(false);
        const resp = await sendCommand(`${data.url}/control`, data.token, {
            command: 'goto',
            slide_number: slide
        });
        // console.log(resp)
        // console.log('clicked slide : ', slide)
    }

    const nextHandler = async () => {
        // console.log('next slide')
        const resp = await sendCommand(`${data.url}/control`, data.token, {
            command: 'next'
        });
        // console.log(resp)
    }

    const previousHandler = async () => {
        // console.log('prev slide')
        const resp = await sendCommand(`${data.url}/control`, data.token, {
            command: 'previous'
        });
        // console.log(resp)
    }

    const firstHandler = async () => {
        // console.log('first slide')
        const resp = await sendCommand(`${data.url}/control`, data.token, {
            command: 'first'
        });
        // console.log(resp)
    }

    const lastHandler = async () => {
        const resp = await sendCommand(`${data.url}/control`, data.token, {
            command: 'last'
        });
        // console.log(resp)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => {
                return (
                    <View
                        borderRadius={'full'}
                    >
                        <Pressable
                            borderRadius={'full'}
                            android_ripple={{
                                color: '#f87171',
                                borderless: true
                            }}
                            style={{
                                padding: Dimensions.get('window').width * 0.013
                            }}
                            onPress={() => {
                                setIsOpen(true)
                            }}
                        >
                            <FontAwesome5 name="power-off" size={Dimensions.get('window').width * 0.07} color="#dc2626" />
                        </Pressable>
                    </View>
                )
            }
        })
    }, [navigation]);

    if (isLoading) {
        return <LoadingSpinner size={Dimensions.get('screen').width * 0.2} />
    }

    return (
        <>
            <Layout>
                <Center flex={1}>
                    {
                        error ?
                            <CustomError msg={error} /> :
                            presentationData?.is_active ?
                                <VStack flex={1}
                                    width={'100%'} py={4} space={1}
                                >

                                    <Heading textAlign={'center'}
                                        color={'blue.500'} _light={{
                                            color: 'blue.600'
                                        }}
                                    >
                                        {presentationData?.name.split('.')[0]}
                                    </Heading>
                                    <VStack>
                                        <Heading textAlign={'center'} >
                                            {presentationData?.curr_slide}
                                        </Heading>
                                        <Divider w={'50'} alignSelf={'center'} bgColor={'white'} _light={{
                                            bgColor: 'dark.50'
                                        }} />
                                        <Heading textAlign={'center'} >
                                            {presentationData?.count}
                                        </Heading>
                                    </VStack>
                                    <HStack justifyContent={'space-between'} flex={1} space={3}>
                                        <Center
                                            bgColor={'blue.500'}
                                            borderRadius={'2xl'}
                                            h={'100%'}
                                            w={'30%'}
                                            opacity={presentationData?.curr_slide == 1 ? 0.5 : 1}
                                        >
                                            <Pressable
                                                android_ripple={{
                                                    color: '#60a5fa',
                                                    borderless: true,
                                                }}
                                                onPress={previousHandler}
                                                h={'100%'}
                                                m={0}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                flexDirection={'row'}
                                                isDisabled={presentationData?.curr_slide == 1}
                                            >
                                                <MaterialCommunityIcons name="skip-previous" size={80} color="white" />
                                            </Pressable>
                                        </Center>
                                        <VStack
                                            justifyContent={'space-between'}
                                            alignItems={'center'}
                                            flex={1}>
                                            <Center
                                                bgColor={'yellow.500'}
                                                borderRadius={'2xl'}
                                                h={'31%'}
                                                w={'100%'}
                                            >
                                                <Pressable
                                                    m={4}
                                                    android_ripple={{
                                                        color: '#facc15',
                                                        borderless: true
                                                    }}
                                                    onPress={firstHandler}
                                                    justifyContent={'center'}
                                                    h={'100%'}
                                                    w={'100%'}
                                                    alignItems={'center'}
                                                    flexDirection={'row'}
                                                >
                                                    <Heading color="white">
                                                        First
                                                    </Heading>
                                                </Pressable>
                                            </Center>
                                            <Center
                                                bgColor={'violet.500'}
                                                borderRadius={'2xl'}
                                                h={'31%'}
                                                w={'100%'}
                                            >
                                                <Pressable
                                                    m={4}
                                                    android_ripple={{
                                                        color: '#a78bfa',
                                                        borderless: true
                                                    }}
                                                    onPress={gotoHandler}
                                                    isDisabled={isGotoClicked}
                                                    justifyContent={'center'}
                                                    h={'100%'}
                                                    w={'100%'}
                                                    alignItems={'center'}
                                                    alignSelf={'center'}
                                                    flexDirection={'row'}
                                                >
                                                    <Heading color="white">
                                                        Goto
                                                    </Heading>
                                                </Pressable>
                                            </Center>
                                            <Center
                                                bgColor={'red.500'}
                                                borderRadius={'2xl'}
                                                h={'31%'}
                                                w={'100%'}
                                            >
                                                <Pressable
                                                    m={4}
                                                    android_ripple={{
                                                        color: '#f87171',
                                                        borderless: true
                                                    }}
                                                    onPress={lastHandler}
                                                    h={'100%'}
                                                    w={'100%'}
                                                    justifyContent={'center'}
                                                    alignItems={'center'}
                                                    flexDirection={'row'}
                                                >
                                                    <Heading color="white">
                                                        Last
                                                    </Heading>
                                                </Pressable>
                                            </Center>
                                        </VStack>
                                        <Center
                                            bgColor={'tertiary.500'}
                                            borderRadius={'2xl'}
                                            h={'100%'}
                                            w={'30%'}
                                            opacity={presentationData?.curr_slide == presentationData?.count ? 0.5 : 1}
                                        >
                                            <Pressable
                                                android_ripple={{
                                                    color: '#34d399',
                                                    borderless: true
                                                }}
                                                onPress={nextHandler}
                                                h={'100%'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                flexDirection={'row'}
                                                isDisabled={presentationData?.curr_slide == presentationData?.count}
                                            >
                                                <MaterialCommunityIcons name="skip-next" size={80} color="white" />
                                            </Pressable>
                                        </Center>
                                    </HStack>
                                </VStack>
                                :
                                <VStack>
                                    <Heading textAlign={'center'} alignSelf={'center'}>
                                        {`${presentationData?.name.split('.')[0]} (${presentationData?.curr_slide}/${presentationData?.count})`}
                                    </Heading>
                                    <Text textAlign={'center'} alignSelf={'center'}>
                                        Press to start the slide show
                                    </Text>
                                    <Pressable
                                        isDisabled={isClicked}
                                        onPress={startSlideShowHandler}
                                    >
                                        <LottieView
                                            style={{
                                                width: Dimensions.get('window').width * 0.6,
                                                height: Dimensions.get('window').width * 0.6,
                                                alignSelf: 'center'
                                            }}
                                            ref={animation}
                                            source={colorMode == 'dark' ? require('../assets/start-slide-show-dark.json') : require('../assets/start-slide-show.json')}
                                            loop
                                            autoSize
                                        />
                                    </Pressable>
                                    {
                                        isClicked &&
                                        <Heading textAlign={'center'} alignSelf={'center'}>
                                            Please wait...
                                        </Heading>
                                    }
                                </VStack>
                    }
                </Center>
            </Layout>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Close Connection</AlertDialog.Header>
                    <AlertDialog.Body letterSpacing={1} lineHeight={2}>
                        {`Are you sure you want to close this connection.`}
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                No
                            </Button>
                            <Button
                                // isLoading={isLoading} spinnerPlacement="end" isLoadingText="Deleting..."
                                colorScheme="danger" onPress={closeConnectinHandler}>
                                Yes
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    )
}

export default ControlScreen