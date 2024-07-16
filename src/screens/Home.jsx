import { Button, StyleSheet, Text, View} from "react-native";
import { useColorScheme } from "react-native";
import styles from "./styles";
import { colors, grays } from "./styles";

export default function Home({navigation}){
    const isLightMode = useColorScheme() === "light"

    return (
        <View style = { [styles.center, style.background(isLightMode)] }>
            <Text>Pagina Home</Text>
            <Button title="Stack" onPress={() => navigation.navigate("Teste")}/>
        </View>
    )
}

const style = StyleSheet.create({
    background: (isLightMode) => ({
        backgroundColor: isLightMode ? grays.background_light : grays.background_dark
    })
})