import { Box } from "native-base";

const CustomToast = ({ message }) => {
    return <Box
        _dark={{
            bg: "darkBlue.400",
            color: 'white'
        }}
        _light={{
            bg: "lightBlue.400",
            color: 'black'
        }}
        shadow={5}
        px="3" py="2" rounded="sm" mb={5}>
        {message}
    </Box>;
}

export default CustomToast;