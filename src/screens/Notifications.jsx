import React, { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationSettings() {
    const [isWaterNotificationEnabled, setWaterNotificationEnabled] = useState(false);
    const [waterInterval, setWaterInterval] = useState(2); // default 2 hours
    const [isWorkoutNotificationEnabled, setWorkoutNotificationEnabled] = useState(false);
    const [workoutReminderTime, setWorkoutReminderTime] = useState(new Date());

    const [showTimePicker, setShowTimePicker] = useState(false);

    // Function to handle time picker
    const onChangeTime = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setWorkoutReminderTime(selectedTime);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Configurações de Notificações</Text>

            {/* Water Reminder */}
            <View style={styles.notificationOption}>
                <View style={styles.row}>
                    <Text style={styles.optionText}>Notificação para beber água</Text>
                    <Switch 
                        value={isWaterNotificationEnabled} 
                        onValueChange={setWaterNotificationEnabled}
                        thumbColor={isWaterNotificationEnabled ? "#00bfa5" : "#f4f3f4"}
                        trackColor={{ false: "#ccc", true: "#00bfa5" }}
                    />
                </View>
                {isWaterNotificationEnabled && (
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerLabel}>Intervalo de horas:</Text>
                        <Picker
                            selectedValue={waterInterval}
                            onValueChange={(itemValue) => setWaterInterval(itemValue)}
                            style={styles.picker}
                        >
                            {[...Array(12).keys()].map(i => (
                                <Picker.Item key={i + 1} label={`${i + 1} horas`} value={i + 1} />
                            ))}
                        </Picker>
                    </View>
                )}
            </View>

            {/* Workout Reminder */}
            <View style={styles.notificationOption}>
                <View style={styles.row}>
                    <Text style={styles.optionText}>Lembrete de treino</Text>
                    <Switch 
                        value={isWorkoutNotificationEnabled} 
                        onValueChange={setWorkoutNotificationEnabled}
                        thumbColor={isWorkoutNotificationEnabled ? "#ff6f00" : "#f4f3f4"}
                        trackColor={{ false: "#ccc", true: "#ff6f00" }}
                    />
                </View>
                {isWorkoutNotificationEnabled && (
                    <View style={styles.timePickerContainer}>
                        <Text style={styles.pickerLabel}>Horário do lembrete:</Text>
                        <Pressable style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
                            <Text style={styles.timeText}>
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

            {/* Save Button */}
            <View style={styles.buttonContainer}>
                <Pressable style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Salvar Configurações</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    notificationOption: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
    pickerContainer: {
        marginTop: 10,
    },
    pickerLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    picker: {
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    timePickerContainer: {
        marginTop: 10,
    },
    timeButton: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    timeText: {
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#00bfa5',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 30,
        elevation: 3,
    },
    saveButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});
