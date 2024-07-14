import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Teste({navigation}){
    return (
        <SafeAreaView>
            <Button title="back" onPress={() => navigation.goBack()}/>
            <Text>Pagina de teste</Text>
        </SafeAreaView>
    )
}