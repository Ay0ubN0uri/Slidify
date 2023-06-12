import React, { useContext } from 'react'
import { Box } from 'native-base';
import { RootContext } from '../../store/context/root-context';

const Layout = ({ children, sylesProps }) => {
    const { themeMode } = useContext(RootContext);

    return (
        <Box bg={themeMode.current.bgColor} flex={1} {...sylesProps}>
            {children}
        </Box>
    )
}

export default Layout;