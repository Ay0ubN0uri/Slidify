import { Center, Heading, Image, Text } from 'native-base';


const NothingFound = ({ message }) => {
    return (
        <Center alignItems="center" justifyContent="center" flex={1}>
            <Image m={0} source={require('../../assets/images/nothing-found.png')} size='2xl' alt="Nothing Found" />
            <Heading mt={3} >{message}</Heading>
        </Center>
    )
}

export default NothingFound;