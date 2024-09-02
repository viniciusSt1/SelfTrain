export default interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    creationTime: string;
    lastSignInTime: string;
    nome: string | null;
    altura: number | null;
    antebraco: number | null;
    braco: number | null;
    cintura: number | null;
    idade: number | null;
    ombros: number | null;
    panturrilha: number | null;
    peito: number | null;
    perna: number | null;
    peso: number | null;
    treinos: { exercicios: string[] }[];
}