import { Button, Center, Image, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';


const ErrorOverlay = ({ message, onPress }) => {
    return (
        <Center alignItems="center" justifyContent="center" flex={1}>
            <Image m={0} source={require('../../assets/images/something-wrong.png')} size='2xl' alt="Something want wrong" />
            <Text>{message}</Text>
            <Button
                endIcon={<AntDesign name="reload1" size={18} color="white" />}
                mt={2}
                _text={{
                    color: 'white'
                }}
                size={'lg'}
                _dark={{
                    _pressed: {
                        bg: 'lightBlue.600'
                    }
                }}
                _light={{
                    _pressed: {
                        bg: 'darkBlue.600'
                    }
                }}
                onPress={onPress}
            >
                Reload
            </Button>
        </Center>
    )
}

export default ErrorOverlay;