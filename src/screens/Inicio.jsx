import { ImageBackground, Pressable, StyleSheet, View, Text } from "react-native";
import { colors } from "../styles/globalStyles";

export default function Inicio({navigation}){
    return (
        <ImageBackground 
            source={require("../assets/imgs/inicio.jpg")}
            style={style.container}
            resizeMode="cover"
        >
            <View style={style.content}>
                <View style={style.title}>
                    <Text style={style.sub1}>Seja bem vindo!</Text>
                    <Text style={style.sub2}>SelfTrain</Text>
                </View>
                <Pressable style={style.start} onPress={() => navigation.navigate("Cadastro")}>
                    <Text style={style.startText}>Começar</Text>
                </Pressable>
                <Pressable style={style.login} onPress={() => navigation.navigate("Login")}>
                    <Text style={style.loginText}>Login</Text>
                </Pressable>
            </View>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        paddingBottom:40
    },
    content:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",
        gap:30
    },
    title:{
        alignItems:"center"
    },
    sub1:{
        color:"white",
        fontFamily:"RobotoCondensed",
        fontSize:28,
    },
    sub2:{
        color:"white",
        fontFamily:"Timmana",
        fontSize:80,
    },
    start:{
        backgroundColor:colors.primary1,
        borderRadius:20,
        paddingHorizontal:50,
        paddingVertical:8,
        alignItems:"center",
        width:"100%",
        maxWidth:250,
        borderStyle:"solid",
        borderColor:colors.primary1,
        borderWidth:2,
        elevation:5
    },
    startText:{
        color:"black",
        fontSize:22,
        fontFamily:"Tauri"
    },
    login:{
        borderStyle:"solid",
        borderColor:"white",
        borderWidth:3,
        borderRadius:20,
        paddingHorizontal:50,
        paddingVertical:8,
        alignItems:"center",
        width:"100%",
        maxWidth:250,
        elevation:5
    },
    loginText:{
        color:"white",
        fontSize:22,
        fontFamily:"Tauri"
    }
})