import axios from "axios"

export const fetchInfos = async (url, token) => {
    try {
        const resp = await axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: `Bearer ${token}`
            },
            timeout: 10000,
            timeoutErrorMessage: 'Network Error'
        });
        return resp.data;
    }
    catch (err) {
        console.log('error : ', err.response?.data ?? err)
        return err.response?.data ?? err;
    }
}

export const sendCommand = async (url, token, data) => {
    try {
        const resp = await axios({
            method: 'post',
            url: url,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            },
            data: data
        });
        return resp.data;
    }
    catch (err) {
        console.log('error : ', err.response?.data)
        return err.response?.data ?? err;
    }
}