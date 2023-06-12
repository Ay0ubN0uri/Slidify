import { AntDesign } from '@expo/vector-icons';
import { Pressable } from 'native-base';
import { useContext, useRef, useState } from 'react';
import { RootContext } from '../../store/context/root-context';
import AddExpenseModal from '../Expenses/AddExpenseModal';
const PlusIcon = () => {
    const [showModal, setShowModal] = useState(false);
    const { themeMode } = useContext(RootContext);

    const onCloseModal = () => {
        setShowModal(false);
    }
    const plusHandler = (e) => {
        setShowModal(true);
    }


    return (
        <>
            <Pressable mr={2} p={2}
                rounded={'full'}
                android_ripple={{
                    color: '#7dd3fc',
                }}
                onPress={plusHandler}
            >
                <AntDesign name="pluscircle" size={25} color={themeMode.current.fgHeaderColor} />
            </Pressable>
            <AddExpenseModal showModal={showModal} onCloseModal={onCloseModal} />
        </>
    )
}

export default PlusIcon;