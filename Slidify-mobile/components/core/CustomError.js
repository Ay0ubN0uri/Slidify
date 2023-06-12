import { Button, Center, Heading } from 'native-base'
import Layout from './Layout'
import { Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRef } from 'react';

const CustomError = ({
    msg,
    onPress,
    buttonLabel = 'Refresh',
    showButton = false
}) => {
    const animation = useRef(null);

    return (
        <Layout pt={8}>
            <Center flex={1}>
                <LottieView
                    style={{
                        width: Dimensions.get('window').width * 0.7,
                        height: Dimensions.get('window').width * 0.7,
                        alignSelf: 'center'
                    }}
                    ref={animation}
                    source={require('../../assets/error.json')}
                    loop
                    autoPlay
                />
                <Heading fontSize={'lg'} mb={2} alignSelf={'center'} textAlign={'center'}>
                    {msg}
                </Heading>
                {
                    showButton &&
                    <Button
                        onPress={onPress}
                        colorScheme={'lightBlue'}
                        alignSelf={'center'}
                        fontSize={'2xl'}
                        rightIcon={<FontAwesome name="refresh" size={24} color="white" />}
                    >
                        {buttonLabel}
                    </Button>
                }
            </Center>
        </Layout>
    )
}

export default CustomError