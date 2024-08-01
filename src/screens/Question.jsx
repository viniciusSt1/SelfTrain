import { Button, Text, View} from "react-native";
import styles from "../styles/globalStyles";

export default function Question({navigation}){
    return (
        <View style = { styles.center }>
            <Text>Uma questão necessária para gerar o planejamento</Text>
        </View>
    )
}