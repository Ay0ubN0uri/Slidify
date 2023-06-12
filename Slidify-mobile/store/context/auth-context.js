import { createContext, useState } from "react";


const initialData = {
    isConnected: false,
    token: null,
    url: null
}

export const AuthContext = createContext({
    data: initialData,
    // data: {
    //     isConnected: true,
    //     token: 'Dsk3842aF9',
    //     url: 'http://192.168.0.130:8000'
    // },
    setData: () => { },
    logout: () => { },
})


const AuthContextProvider = ({ children }) => {
    const [data, setData] = useState(
        initialData
        // {
        //     isConnected: true,
        //     token: 'Dsk3842aF9',
        //     url: 'http://192.168.0.130:8000'
        // }
    )

    const logout = () => {
        setData(initialData)
    }

    const value = {
        data,
        setData,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;