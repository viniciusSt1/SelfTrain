import firestore from "@react-native-firebase/firestore";
import { exercicios } from "../IE/exercicios";

const exerciciosCollection = firestore().collection('exercicios');

// Para cada exercício na lista, adicionamos ao Firestore
exercicios.forEach(async (exercicio, index) => {
    try {
        await exerciciosCollection.doc((index).toString()).set({
            idExerc: exercicio.idExerc,
            nome: exercicio.nome,
            tipoContagem: exercicio.tipoContagem, // Tempo ou repetições
            niveisOpt: exercicio.niveisOpt, // Fases OPT mais recomendadas
            dificuldade: exercicio.dificuldade, // 1 a 3 (iniciante, intermediário, avançado)
            tipo: exercicio.tipo, // Máquina, PesoLivre, Bola, etc.
            tipoSubTreino: exercicio.tipoSubTreino, // Alongamento, Mobilidade, Cardio, etc.
            agrupMusc: exercicio.agrupMusc // Agrupamentos musculares (Pernas, Abdômen, Peito, etc.)
        });
    } catch (error) {
        console.error(`Erro ao adicionar exercício ${exercicio.nome}: `, error);
    }
});