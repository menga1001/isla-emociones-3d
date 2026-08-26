export interface IslandConfig {
  id: string;
  name: string;
  emotion: string;
  icon: string;
  biome: string;
  objective: string;
  skill: string;
  durationMinutes: [number, number];
  mainMechanic: string;
  inputs: string[];
  feedback: string[];
  errorCondition: string;
  retry: string;
  reward: string;
  finalLevel: string;
  learning: string;
  unlockMessage: string;
  colors: {
    primary: string;
    secondary: string;
    ambient: string;
  };
  musicTrack: string;
  guideDialogue: {
    intro: string;
    level1Start: string;
    level1Complete: string;
    level2Start: string;
    level2Complete: string;
    level3Start: string;
    level3Complete: string;
    finalMessage: string;
  };
}

export const islandsConfig: IslandConfig[] = [
  {
    id: "enojo",
    name: "Isla del Enojo",
    emotion: "Enojo",
    icon: "\u{1F525}",
    biome: "volc\u00E1nica",
    objective: "Reducir activaci\u00F3n y entrenar autocontrol",
    skill: "Respiraci\u00F3n + pausa",
    durationMinutes: [2, 4],
    mainMechanic: "Interacci\u00F3n sincronizada con respiraci\u00F3n 4-4-4-4",
    inputs: ["presionar", "mantener", "mover"],
    feedback: ["animaci\u00F3n", "sonido", "texto"],
    errorCondition: "Respiraci\u00F3n fuera de tiempo / acci\u00F3n incorrecta",
    retry: "inmediato",
    reward: "El medidor emocional de la isla disminuye",
    finalLevel: "Situaci\u00F3n cotidiana: 'Alguien tom\u00F3 algo que era tuyo'",
    learning: "Pensar antes de actuar",
    unlockMessage: "Respirar y hacer una pausa",
    colors: {
      primary: "#FF4500",
      secondary: "#FF8C00",
      ambient: "#2D1B00"
    },
    musicTrack: "enojo-ambient.mp3",
    guideDialogue: {
      intro: "\u00A1Hola! Bienvenido a la Isla del Enojo. Aqu\u00ED aprenderemos a respirar cuando sentimos enojo.",
      level1Start: "Vamos a identificar las se\u00F1ales del enojo en nuestro cuerpo.",
      level1Complete: "\u00A1Muy bien! Ya reconoces c\u00F3mo se siente el enojo.",
      level2Start: "Ahora practicaremos la respiraci\u00F3n 4-4-4-4. \u00BFListo?",
      level2Complete: "\u00A1Excelente! Tu respiraci\u00F3n te ayuda a calmarte.",
      level3Start: "Veamos qu\u00E9 hacemos cuando alguien toma algo nuestro.",
      level3Complete: "\u00A1Genial! Tomaste una buena decisi\u00F3n.",
      finalMessage: "Sentir enojo est\u00E1 bien. Lo importante es elegir qu\u00E9 hacer con \u00E9l."
    }
  },
  {
    id: "tristeza",
    name: "Isla de la Tristeza",
    emotion: "Tristeza",
    icon: "\u{1F327}\uFE0F",
    biome: "nublada",
    objective: "Reconocer, expresar y buscar apoyo",
    skill: "Reconocimiento + expresi\u00F3n + b\u00FAsqueda de apoyo",
    durationMinutes: [3, 5],
    mainMechanic: "Clasificaci\u00F3n de nubes de pensamientos + selecci\u00F3n de apoyo",
    inputs: ["seleccionar", "arrastrar", "ordenar"],
    feedback: ["animaci\u00F3n", "sonido", "texto", "cambio de color"],
    errorCondition: "Pensamiento clasificado incorrectamente",
    retry: "inmediato",
    reward: "La isla recupera color y luz progresivamente",
    finalLevel: "Construir frase 'Estoy triste porque ___ y necesito ___'",
    learning: "Expresar emociones y buscar ayuda es de valientes",
    unlockMessage: "Expresar y buscar apoyo",
    colors: {
      primary: "#4A90D9",
      secondary: "#7BB3E0",
      ambient: "#1A2A3A"
    },
    musicTrack: "tristeza-ambient.mp3",
    guideDialogue: {
      intro: "Hola... bienvenido a la Isla de la Tristeza. Est\u00E1 bien sentirse triste a veces.",
      level1Start: "Vamos a identificar pensamientos de tristeza entre las nubes.",
      level1Complete: "Muy bien. Reconocer la tristeza es el primer paso.",
      level2Start: "\u00BFQu\u00E9 podemos hacer cuando nos sentimos tristes?",
      level2Complete: "Excelente. Hay muchas formas de sentirte mejor.",
      level3Start: "Ahora elige con qui\u00E9n hablar cuando est\u00E9s triste.",
      level3Complete: "Genial. Buscar apoyo es muy valiente.",
      finalMessage: "La tristeza no necesita esconderse. Puedes sentirla, expresarla y buscar apoyo."
    }
  },
  {
    id: "alegria",
    name: "Isla de la Alegr\u00EDa",
    emotion: "Alegr\u00EDa",
    icon: "\u{1F308}",
    biome: "soleada",
    objective: "Autoconocimiento, disfrute consciente y equilibrio",
    skill: "Disfrute consciente y compartici\u00F3n",
    durationMinutes: [2, 4],
    mainMechanic: "Atrapar elementos positivos con control de impulsividad",
    inputs: ["presionar", "mantener", "soltar"],
    feedback: ["animaci\u00F3n", "sonido", "texto", "part\u00EDculas"],
    errorCondition: "Atrapar demasiado r\u00E1pido / no compartir",
    retry: "inmediato",
    reward: "La isla se vuelve m\u00E1s colorida y brillante",
    finalLevel: "Secuencia: detenerse \u2192 respirar \u2192 disfrutar \u2192 expresar \u2192 compartir",
    learning: "Disfrutar tambi\u00E9n es una forma de bienestar",
    unlockMessage: "Disfrutar y compartir",
    colors: {
      primary: "#FFD700",
      secondary: "#FF69B4",
      ambient: "#FFF8DC"
    },
    musicTrack: "alegria-ambient.mp3",
    guideDialogue: {
      intro: "\u00A1Hola! \u00A1Bienvenido a la Isla de la Alegr\u00EDa! Aqu\u00ED celebraremos las cosas buenas.",
      level1Start: "Vamos a atrapar estrellas y globos, pero con calma.",
      level1Complete: "\u00A1Genial! Disfrutar con calma es mejor.",
      level2Start: "\u00BFQu\u00E9 haces cuando ganas algo importante?",
      level2Complete: "\u00A1Muy bien! Compartir la alegr\u00EDa la hace crecer.",
      level3Start: "Practiquemos la secuencia completa juntos.",
      level3Complete: "\u00A1Incre\u00EDble! Sabes disfrutar de manera saludable.",
      finalMessage: "Disfrutar tambi\u00E9n es una forma de bienestar. Puedes sentir alegr\u00EDa y expresarla de manera saludable."
    }
  },
  {
    id: "miedo",
    name: "Isla del Miedo",
    emotion: "Miedo",
    icon: "\u{1F311}",
    biome: "bosque nocturno",
    objective: "Distinguir peligro real de percepci\u00F3n de amenaza",
    skill: "Pausa + observaci\u00F3n + afrontamiento gradual",
    durationMinutes: [3, 5],
    mainMechanic: "Clasificaci\u00F3n + cruce de puente con estrategias",
    inputs: ["seleccionar", "presionar", "mantener"],
    feedback: ["animaci\u00F3n", "sonido", "texto", "iluminaci\u00F3n"],
    errorCondition: "Huir sin evaluar / clasificar incorrectamente",
    retry: "inmediato",
    reward: "La niebla se disipa y el bosque se ilumina",
    finalLevel: "Secuencia: detenerse \u2192 respirar \u2192 observar \u2192 evaluar \u2192 actuar",
    learning: "Ser valiente tambi\u00E9n significa avanzar de manera segura",
    unlockMessage: "Observar, evaluar y afrontar",
    colors: {
      primary: "#7B2D8E",
      secondary: "#9B59B6",
      ambient: "#0D0D1A"
    },
    musicTrack: "miedo-ambient.mp3",
    guideDialogue: {
      intro: "Hola... bienvenido a la Isla del Miedo. El miedo es normal, y podemos aprender a manejarlo.",
      level1Start: "Vamos a distinguir peligro real de pensamientos de miedo.",
      level1Complete: "Muy bien. No todo lo que sentimos es peligro real.",
      level2Start: "Cruzcemos el puente usando estrategias de calma.",
      level2Complete: "\u00A1Excelente! Avanzaste con seguridad.",
      level3Start: "Practiquemos la secuencia completa: detener, respirar, observar, evaluar, actuar.",
      level3Complete: "\u00A1Genial! Puedes enfrentar tus miedos de manera segura.",
      finalMessage: "Tener miedo no significa que no seas valiente. Ser valiente tambi\u00E9n significa avanzar de manera segura aunque tengas miedo."
    }
  },
  {
    id: "desagrado",
    name: "Isla del Desagrado",
    emotion: "Desagrado",
    icon: "\u{1F922}",
    biome: "pantano estilizado",
    objective: "Tolerancia y evaluaci\u00F3n de est\u00EDmulos desagradables",
    skill: "Evaluaci\u00F3n antes de reaccionar",
    durationMinutes: [2, 4],
    mainMechanic: "Clasificaci\u00F3n de est\u00EDmulos + control de reacci\u00F3n facial",
    inputs: ["seleccionar", "mantener", "arrastrar"],
    feedback: ["animaci\u00F3n", "sonido", "texto", "expresi\u00F3n facial"],
    errorCondition: "Reaccionar impulsivamente / clasificar incorrectamente",
    retry: "inmediato",
    reward: "La expresi\u00F3n del personaje cambia de rechazo a neutralidad",
    finalLevel: "Situaci\u00F3n desagradable donde evitar reaccionar impulsivamente",
    learning: "Sentir desagrado es una se\u00F1al. Puedes escucharla y decidir qu\u00E9 hacer.",
    unlockMessage: "Evaluar antes de reaccionar",
    colors: {
      primary: "#27AE60",
      secondary: "#8BC34A",
      ambient: "#1A2E1A"
    },
    musicTrack: "desagrado-ambient.mp3",
    guideDialogue: {
      intro: "Hola... bienvenido a la Isla del Desagrado. Aqu\u00ED aprenderemos a manejar lo que no nos gusta.",
      level1Start: "Vamos a clasificar est\u00EDmulos: cu\u00E1les evitar, revisar o tolerar.",
      level1Complete: "Muy bien. No todo requiere la misma reacci\u00F3n.",
      level2Start: "Ahora practiquemos controlar nuestra reacci\u00F3n.",
      level2Complete: "Excelente. Mantuviste la calma muy bien.",
      level3Start: "Veamos una situaci\u00F3n desagradable y c\u00F3mo responder.",
      level3Complete: "\u00A1Genial! Evaluaste antes de reaccionar.",
      finalMessage: "Sentir desagrado es una se\u00F1al. Puedes escucharla y decidir qu\u00E9 hacer."
    }
  },
  {
    id: "sorpresa",
    name: "Isla de la Sorpresa",
    emotion: "Sorpresa",
    icon: "\u2728",
    biome: "cambiante",
    objective: "Pausa + orientaci\u00F3n + flexibilidad ante lo inesperado",
    skill: "Pausar y adaptarse",
    durationMinutes: [2, 4],
    mainMechanic: "Eventos aleatorios + secuencia PAUSA \u2192 OBSERVA \u2192 IDENTIFICA \u2192 RESPONDE",
    inputs: ["seleccionar", "presionar", "esperar"],
    feedback: ["animaci\u00F3n", "sonido", "texto", "cambio de escenario"],
    errorCondition: "Reaccionar sin pausa / identificar incorrectamente",
    retry: "inmediato",
    reward: "Las part\u00EDculas doradas brillan m\u00E1s",
    finalLevel: "Situaci\u00F3n inesperada: identificar Sorpresa \u2192 emoci\u00F3n secundaria \u2192 respuesta",
    learning: "No siempre podemos controlar lo que sucede, pero podemos aprender a responder",
    unlockMessage: "Pausar y adaptarse",
    colors: {
      primary: "#FFD700",
      secondary: "#FFA500",
      ambient: "#1A1A2E"
    },
    musicTrack: "sorpresa-ambient.mp3",
    guideDialogue: {
      intro: "\u00A1Hola! \u00A1Bienvenido a la Isla de la Sorpresa! \u00A1Aqu\u00ED todo puede pasar!",
      level1Start: "\u00A1Cuidado! Pueden ocurrir cosas inesperadas. Observa y responde con calma.",
      level1Complete: "\u00A1Muy bien! Pausaste antes de reaccionar.",
      level2Start: "Identifiquemos qu\u00E9 emoci\u00F3n sientes despu\u00E9s de la sorpresa.",
      level2Complete: "Excelente. La sorpresa puede llevar a diferentes emociones.",
      level3Start: "Veamos una situaci\u00F3n inesperada y practiquemos la secuencia completa.",
      level3Complete: "\u00A1Genial! Sabes adaptarte a lo inesperado.",
      finalMessage: "No siempre podemos controlar lo que sucede, pero podemos aprender a responder a lo inesperado."
    }
  }
];

export const getIslandById = (id: string): IslandConfig | undefined => {
  return islandsConfig.find(island => island.id === id);
};
