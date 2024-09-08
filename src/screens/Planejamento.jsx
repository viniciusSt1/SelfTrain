import { Button, ScrollView, Text, useColorScheme, View, StyleSheet} from "react-native";
import styles, { colors, grays } from "../styles/globalStyles";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import BoxTreinosDay from '../components/BoxTreinosDay'

export default function Planejamento({navigation}){
    const isLightMode = useColorScheme() === 'light'
    return (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <Text style={styles.header(isLightMode)}>Planejamento</Text>
                    <Calendar
                        style={style.calendario(isLightMode)} 
                        theme={{
                            //backgroundColor: 'transparent',
                            calendarBackground: 'transparent',
                            monthTextColor:'white', //cor do mes/ano header
                            arrowColor:'white',
                            textSectionTitleColor:'white',   //cor dos dias da semana
                            todayTextColor: 'black',
                            todayBackgroundColor:colors.primary1,
                            dayTextColor: grays.gray2,  //cores dos dias dentro do mes
                            textDisabledColor: grays.gray5, //cores dos dias fora do mes
                            dotColor: colors.secondary1,    //cor do ponto de marcação   
                        }}
                        markedDates={{
                            //'2024-09-09': {selected: true, selectedColor: 'blue'},
                            '2024-09-12': {marked: true},
                            //'2024-09-15': {marked: true, dotColor: 'red', activeOpacity: 0},
                            //'2024-09-20': {disabled: true, disableTouchEvent: true}
                            '2024-09-30': {marked: true},
                        }}
                        onDayPress={day => {
                            console.log('selected day', day);
                        }}
                    />

                    <Text style={style.subheader(isLightMode)}>Próximos treinos</Text>

                    <BoxTreinosDay navigation={navigation} agrupamentos={["Perna", "Abdomen"]} numero={21} data={new Date().toLocaleDateString('pt-BR')} dia="Segunda-feira" isLightMode={isLightMode} />
                    <BoxTreinosDay navigation={navigation} agrupamentos={["Bíceps", "Tríceps"]} numero={22} data={new Date().toLocaleDateString('pt-BR')} dia="Quarta-feira" isLightMode={isLightMode} />
                    <BoxTreinosDay navigation={navigation} agrupamentos={["Peitoral", "Costas"]} numero={23} data={new Date().toLocaleDateString('pt-BR')} dia="Sexta feira" isLightMode={isLightMode} />
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}

const style = StyleSheet.create({
    calendario: (isLightMode) => ({
        borderRadius:10,
        backgroundColor:'rgba(0,0,0,0.8)'
    }),
    subheader: (isLightMode) => ({
        fontSize:22,
        color:isLightMode ? 'black' : 'white',
        fontFamily:'Outfit'
    })
})