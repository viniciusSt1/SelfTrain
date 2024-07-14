import { Button, Text, View} from "react-native";
import styles from "./styles";

export default function Home({navigation}){
    return (
        <View style = { styles.center }>
            <Text>Pagina Home</Text>
            <Button title="Stack" onPress={() => navigation.navigate("Teste")}/>
        </View>
    )
}