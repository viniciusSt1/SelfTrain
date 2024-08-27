import { Button, Text, useColorScheme, View} from "react-native";
import styles from "../styles/globalStyles";

export default function Corpo({navigation}){
    const isLightMode = useColorScheme() == 'light'
    return (
        <View style = { [styles.center,styles.background(isLightMode)] }>
            <Text>Pagina Corpo</Text>
        </View>
    )
}