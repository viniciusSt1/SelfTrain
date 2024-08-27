import firestore from '@react-native-firebase/firestore';

const treinoRef = firestore().collection('treino').doc('treino1');
const exerciciosRefs = [
    firestore().doc('exercicios/exercicio1'),
    firestore().doc('exercicios/exercicio2'),
    firestore().doc('exercicios/exercicio3')
];

treinoRef.set({
    nome: 'Treino de Força',
    descricao: 'Treino focado em aumento de força muscular',
    exercicios: exerciciosRefs
});
