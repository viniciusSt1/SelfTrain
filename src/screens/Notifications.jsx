import React, { useEffect, useState } from 'react';
import { View, Text, Switch, Pressable, Platform, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import styles, { colors, grays } from '../styles/globalStyles';
import HeaderBack from '../components/HeaderBack';
import { MMKV } from 'react-native-mmkv';   // biblioteca para armazenamento local

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

// Configuração do MMKV
const storage = new MMKV();

export default function NotificationSettings({ navigation }) {
    const isLightMode = useColorScheme() === 'light';

    // Estados para lembrete de hidratação
    const [isWaterNotificationEnabled, setWaterNotificationEnabled] = useState(false);
    const [waterInterval, setWaterInterval] = useState(2); // padrão de 2 horas

    // Estados para lembrete de treino
    const [isWorkoutNotificationEnabled, setWorkoutNotificationEnabled] = useState(false);
    const [workoutReminderTime, setWorkoutReminderTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Estado para recebimento de e-mails
    const [isEmailsNotificationEnabled, setIsEmailsNotificationEnabled] = useState(false);

    // Pedir permissão para notificações
    useEffect(() => {
        const requestPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permissão para notificações não concedida');
            }
        };
        requestPermissions();
    }, []);

    // Carregar estados ao montar o componente
    useEffect(() => {
        const loadNotificationSettings = () => {
            const waterEnabled = storage.getBoolean('isWaterNotificationEnabled');
            const workoutEnabled = storage.getBoolean('isWorkoutNotificationEnabled');
            const waterIntervalStored = storage.getNumber('waterInterval');
            const workoutTimeStored = storage.getString('workoutReminderTime');
            const emailStored = storage.getBoolean('emailStored');

            if (waterEnabled !== null) setWaterNotificationEnabled(waterEnabled);
            if (workoutEnabled !== null) setWorkoutNotificationEnabled(workoutEnabled);
            if (waterIntervalStored !== null) setWaterInterval(waterIntervalStored);
            if (workoutTimeStored !== null) setWorkoutReminderTime(new Date(workoutTimeStored));
            if (emailStored !== null) setIsEmailsNotificationEnabled(emailStored);
        };

        loadNotificationSettings();
    }, []);

    // Salvar estados ao alterar as notificações
    useEffect(() => {
        storage.set('isWaterNotificationEnabled', isWaterNotificationEnabled);
        storage.set('isWorkoutNotificationEnabled', isWorkoutNotificationEnabled);
        storage.set('waterInterval', waterInterval);
        storage.set('workoutReminderTime', workoutReminderTime.toString());
        storage.set('emailStored', isEmailsNotificationEnabled);
    }, [isWaterNotificationEnabled, isWorkoutNotificationEnabled, waterInterval, workoutReminderTime, isEmailsNotificationEnabled]);

    // Efeito para agendar notificações de hidratação
    useEffect(() => {
        const handleWaterNotifications = async () => {
            const waterNotifications = await Notifications.getAllScheduledNotificationsAsync();
            waterNotifications.forEach(notification => {
                if (notification.content.title === "Hora de beber água") {
                    Notifications.cancelScheduledNotificationAsync(notification.identifier);
                }
            });

            if (isWaterNotificationEnabled) {
                scheduleWaterNotifications();
            }
        };

        handleWaterNotifications(); // Chama a função async dentro do useEffect
    }, [isWaterNotificationEnabled, waterInterval]);

    // Efeito para agendar notificações de treino
    useEffect(() => {
        const handleWorkoutNotifications = async () => {
            const workoutNotifications = await Notifications.getAllScheduledNotificationsAsync();
            workoutNotifications.forEach(notification => {
                if (notification.content.title === "Lembrete de treino") {
                    Notifications.cancelScheduledNotificationAsync(notification.identifier);
                }
            });

            if (isWorkoutNotificationEnabled) {
                scheduleWorkoutNotifications();
            }
        };

        handleWorkoutNotifications(); // Chama a função async dentro do useEffect
    }, [isWorkoutNotificationEnabled, workoutReminderTime]);

    // Função para agendar notificações de hidratação
    const scheduleWaterNotifications = async () => {
        for (let i = 0; i < 24; i += waterInterval) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Hora de beber água",
                    body: "É hora de se hidratar!",
                },
                trigger: {
                    hour: (new Date().getHours() + i) % 24,
                    minute: 0,
                    repeats: true,
                },
            });
        }
    };

    // Função para agendar notificações de treino
    const scheduleWorkoutNotifications = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Lembrete de treino",
                body: "É hora do seu treino!",
            },
            trigger: {
                hour: workoutReminderTime.getHours(),
                minute: workoutReminderTime.getMinutes(),
                repeats: true,
            },
        });
    };

    const onChangeTime = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setWorkoutReminderTime(selectedTime);
        }
    };

    return (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <HeaderBack titulo="Notificações" navigation={navigation} />
                    <View style={style.notificationOption(isLightMode)}>
                        <View style={style.row}>
                            <Text style={style.optionText(isLightMode)}>Receber emails</Text>
                            <Switch
                                value={isEmailsNotificationEnabled}
                                onValueChange={setIsEmailsNotificationEnabled}
                                thumbColor={isEmailsNotificationEnabled ? colors.primary2: colors.gray1}
                                trackColor={{ false: grays.gray3, true: colors.primary1 }}
                            />
                        </View>
                    </View>
                    <View style={style.notificationOption(isLightMode)}>
                        <View style={style.row}>
                            <Text style={style.optionText(isLightMode)}>Notificação para beber água</Text>
                            <Switch
                                value={isWaterNotificationEnabled}
                                onValueChange={setWaterNotificationEnabled}
                                thumbColor={isWaterNotificationEnabled ? colors.primary2: colors.gray1}
                                trackColor={{ false: grays.gray3, true: colors.primary1 }}
                            />
                        </View>

                        {isWaterNotificationEnabled && (
                            <View style={style.pickerContainer}>
                                <Text style={style.pickerLabel(isLightMode)}>Intervalo de horas:</Text>
                                <View style={style.picker(isLightMode)}>
                                    <Picker
                                        selectedValue={waterInterval}
                                        onValueChange={(itemValue) => setWaterInterval(itemValue)}
                                    >
                                        {[...Array(12).keys()].map(i => (
                                            <Picker.Item key={i + 1} label={`${i + 1} horas`} value={i + 1} />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        )}
                    </View>

                    <View style={style.notificationOption(isLightMode)}>
                        <View style={style.row}>
                            <Text style={style.optionText(isLightMode)}>Lembrete de treino</Text>
                            <Switch
                                value={isWorkoutNotificationEnabled}
                                onValueChange={setWorkoutNotificationEnabled}
                                thumbColor={isWorkoutNotificationEnabled ? colors.primary2: colors.gray1}
                                trackColor={{ false: grays.gray3, true: colors.primary1 }}
                            />
                        </View>

                        {isWorkoutNotificationEnabled && (
                            <View style={style.pickerContainer}>
                                <Text style={style.pickerLabel(isLightMode)}>Horário do lembrete:</Text>
                                <Pressable style={style.picker(isLightMode)} onPress={() => setShowTimePicker(true)}>
                                    <Text style={style.timeText}>
                                        {`${workoutReminderTime.getHours()}:${workoutReminderTime.getMinutes() < 10 ? '0' : ''}${workoutReminderTime.getMinutes()}`}
                                    </Text>
                                </Pressable>

                                {showTimePicker && (
                                    <DateTimePicker
                                        value={workoutReminderTime}
                                        mode="time"
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                        onChange={onChangeTime}
                                    />
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    notificationOption: (isLightMode) => ({
        backgroundColor: isLightMode ? 'white' : grays.gray7,
        borderRadius: 10,
        padding: 20,
        gap: 10
    }),
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionText: (isLightMode) => ({
        fontSize: 18,
        color: isLightMode ? 'black' : 'white',
    }),
    pickerContainer: {
        gap: 5
    },
    pickerLabel: (isLightMode) => ({
        fontSize: 16,
        color: isLightMode ? grays.gray5 : grays.gray5,
        marginBottom: 5,
    }),
    picker: (isLightMode) => ({
        backgroundColor: isLightMode ? grays.gray1 : grays.background_light,
        borderRadius: 10,
        height: 40,
        justifyContent: 'center',
        elevation: 2
    }),
    timeText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center'
    },
});
