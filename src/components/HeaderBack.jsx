import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, useColorScheme} from 'react-native';
import styles, { colors, grays } from '../styles/globalStyles';

export default ({titulo, navigation}) => {
    const isLightMode = useColorScheme() === 'light';

    return(
        <View style={style.header}>
            <MaterialIcons 
                name="keyboard-backspace" 
                size={45} 
                color={isLightMode ? "black" : "white"} 
                onPress={() => {navigation.goBack()}} 
            />
            <Text style={style.title(isLightMode)}>{titulo}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:20,
        //backgroundColor:'red'
    },
    title:(isLightMode) => ({
        fontSize:24,
        color : isLightMode ? "black" : "white",
        fontFamily:"Poppins",
        justifyContent:'center',
        marginBottom:-6,
        //backgroundColor:'blue'
    }),
})