import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "../navigators/RootNavigator";
import Floaters from "./core/Floaters";

const Root = () => {

    return (
        <NavigationContainer >
            <RootNavigator />
            <Floaters />
        </NavigationContainer>
    )
}

export default Root;