export default ['Peitoral', 'Costas', 'Bíceps', 'Tríceps', 'Abdômen', 'Pernas', 'Ombro', 'Lombar', 'Cardio', 'Panturrilha', 'FullBody', 'Isquiotibiais', 'Quadríceps']

export function requireIcon(agrupamento) {
    switch (agrupamento) {
        case 'Abdômen':
            return require('../assets/icons/abdomen.png');
        case 'Bíceps':
            return require('../assets/icons/biceps.png');
        case 'Costas':
            return require('../assets/icons/back.png');
        case 'Ombro':
            return require('../assets/icons/ombro.png');
        case 'Pernas':
        case 'Quadríceps':
            return require('../assets/icons/leg.png');
        case 'Peitoral':
            return require('../assets/icons/chest.png');
        case 'Tríceps':
            return require('../assets/icons/triceps.png');
        case 'Lombar':
            return require('../assets/icons/lombar.png');
        case 'Cardio':
            return require('../assets/icons/cardio.png');
        case 'Panturrilha':
            return require('../assets/icons/panturrilha.png');
        case 'FullBody':
            return require('../assets/icons/Body.png');
        case 'Isquiotibiais':
            return require('../assets/icons/isquiotibiais.png');
        default:
            return null;
    }
}

export function requireBackground(agrupamento) {
    switch (agrupamento) {
        case 'Abdômen':
            return require('../assets/imgs/abdomen.jpg');
        case 'Bíceps':
            return require('../assets/imgs/biceps.jpg');
        case 'Costas':
        case 'Ombro':
            return require('../assets/imgs/costas.jpg');
        case 'Pernas':
        case 'Quadríceps':
        case 'Isquiotibiais':    
            return require('../assets/imgs/leg.jpg');
        case 'Peitoral':
            return require('../assets/imgs/peito.jpg');
        case 'Tríceps':
            return require('../assets/imgs/triceps.jpg');
        case 'FullBody':
            return require('../assets/imgs/FullBody.jpg');
        case 'Cardio':
            return require('../assets/imgs/cardio.jpg');
        case 'Lombar':
            //return require('../assets/icons/lombar.png');
        case 'Panturrilha':
            //return require('../assets/icons/panturrilha.png');

        default:
            return null;
    }
}