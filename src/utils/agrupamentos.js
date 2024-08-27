export default ['Peitoral','Costas','Bíceps','Tríceps','Abdômen','Pernas']

export function requireIcon(agrupamento) {
    switch (agrupamento) {
        case 'Abdômen':
            return require('../assets/icons/abdomen.png'); 
        case 'Bíceps':
            return require('../assets/icons/biceps.png');
        case 'Costas':
            return require('../assets/icons/back.png'); 
        case 'Pernas':
            return require('../assets/icons/leg.png'); 
        case 'Peitoral':
            return require('../assets/icons/chest.png'); 
        case 'Tríceps':
            return require('../assets/icons/triceps.png'); 
        default:
            return null;
    }
}

export function requireBackground(agrupamento){
    switch (agrupamento) {
        case 'Abdômen':
            return require('../assets/imgs/abdomen.jpg'); 
        case 'Bíceps':
            return require('../assets/imgs/biceps.jpg');
        case 'Costas':
            return require('../assets/imgs/costas.jpg'); 
        case 'Perna':
            return require('../assets/imgs/leg.jpg'); 
        case 'Peitoral':
            return require('../assets/imgs/peito.jpg'); 
        case 'Tríceps':
            return require('../assets/imgs/triceps.jpg'); 
        default:
            return null;
    }
}