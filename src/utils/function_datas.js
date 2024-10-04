export const convertTimestamp = (timestamp) => new Date(timestamp.seconds * 1000);

export const getNomeDoDia = (data) => {
    const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const dia = data.getDay();
    return diasSemana[dia];
};

export const isFirebaseTimestamp = (value) => value && typeof value === 'object' && '_seconds' in value && '_nanoseconds' in value;
  