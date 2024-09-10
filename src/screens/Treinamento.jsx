import React, { useState } from 'react';
import { View, Text, ImageBackground, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Usado para a seta de voltar

const exercises = [
  {
    name: 'Supino Reto',
    repetitions: 12,
  },
  {
    name: 'Agachamento',
    repetitions: 15,
  },
  {
    name: 'Rosca Direta',
    repetitions: 10,
  },
  // Adicione mais exercícios conforme necessário
];

export default function TrainingScreen() {
  const navigation = useNavigation();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // Lógica ao finalizar o treino
      alert('Você concluiu o treino!');
    }
  };

  const { name, repetitions } = exercises[currentExerciseIndex];
  const totalExercises = exercises.length;
  const currentExercise = currentExerciseIndex + 1;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://via.placeholder.com/400x300.png' }} // Adicione a URL da imagem de fundo
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={30} color="white" />
          </Pressable>
          <Text style={styles.exerciseCount}>{currentExercise}/{totalExercises}</Text>
        </View>
      </ImageBackground>

      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseName}>{name}</Text>
        <Text style={styles.repetitions}>{repetitions} repetições</Text>
        
        <Pressable style={styles.continueButton} onPress={handleNextExercise}>
          <Text style={styles.buttonText}>
            {currentExercise < totalExercises ? 'Continuar' : 'Finalizar'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backgroundImage: {
    width: '100%',
    height: 300,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  exerciseCount: {
    color: 'white',
    fontSize: 20,
  },
  exerciseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  repetitions: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
