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
      intro: "Bienvenido a la Isla del Enojo. Aqu\u00ED vas a explorar c\u00F3mo funciona el enojo en tu cuerpo y mente, y vas a aprender herramientas concretas para manejarlo.",
      level1Start: "Vamos a identificar las se\u00F1ales f\u00EDsicas y mentales que aparecen cuando sentimos enojo.",
      level1Complete: "Reconocer esas se\u00F1ales es el primer paso para poder regularlas.",
      level2Start: "Ahora practicaremos una t\u00E9cnica de respiraci\u00F3n que ayuda a calmar el sistema nervioso. Respiraremos en cuatro tiempos: inhalamos, mantenemos, exhalamos y volvemos a mantener.",
      level2Complete: "Esta respiraci\u00F3n es una herramienta que puedes usar en cualquier momento del d\u00EDa.",
      level3Start: "Veamos qu\u00E9 ocurre cuando enfrentamos una situaci\u00F3n que nos provoca enojo, y c\u00F3mo podemos elegir c\u00F3mo responder.",
      level3Complete: "Gestionar el enojo no es suprimirlo, es elegir c\u00F3mo actuar con lo que sientes.",
      finalMessage: "El enojo es una emoci\u00F3n v\u00E1lida. Lo que marca la diferencia es c\u00F3mo la gestionas."
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
      intro: "Bienvenido al Valle de las Nubes. La tristeza es una emoci\u00F3n que todos experimentamos en alg\u00FAn momento. Aqu\u00ED vas a aprender a reconocerla, entender su intensidad y encontrar estrategias para afrontarla.",
      level1Start: "Vamos a identificar en qu\u00E9 situaciones aparece la tristeza y qu\u00E9 la diferencia de otras emociones.",
      level1Complete: "Identificar lo que sientes es el punto de partida para poder trabajar con ello.",
      level2Start: "La tristeza se manifiesta de distintas formas en el cuerpo y la mente. Observa las se\u00F1ales y reconoce cu\u00E1les te resultan familiares.",
      level2Complete: "Reconocer tus propias se\u00F1ales te ayuda a anticiparte y a actuar antes de que la emoci\u00F3n se intensifique.",
      level3Start: "Ahora vamos a evaluar la intensidad de lo que sientes y a elegir una estrategia adecuada.",
      level3Complete: "No todas las situaciones requieren la misma respuesta. Saber elegir la estrategia correcta es una habilidad.",
      finalMessage: "La tristeza no necesita esconderse. Puedes sentirla, expresarla y buscar apoyo cuando lo necesites."
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
      intro: "Bienvenido a la Isla de la Alegr\u00EDa. Aqu\u00ED vas a explorar c\u00F3mo reconocer y disfrutar de las cosas buenas de la vida de manera consciente.",
      level1Start: "Vamos a practicar c\u00F3mo disfrutar de los momentos positivos sin dejarte llevar por la impulsividad.",
      level1Complete: "Disfrutar con consciencia es diferente a reaccionar autom\u00E1ticamente.",
      level2Start: "\u00BFQu\u00E9 haces cuando algo bueno te sucede? Veamos c\u00F3mo compartir esa experiencia.",
      level2Complete: "Compartir la alegr\u00EDa fortalece los v\u00EDnculos y amplifica el momento.",
      level3Start: "Vamos a practicar la secuencia completa: detenerse, respirar, disfrutar, expresar y compartir.",
      level3Complete: "Tienes la capacidad de disfrutar de manera consciente y saludable.",
      finalMessage: "Disfrutar tambi\u00E9n es una forma de bienestar. No se trata solo de superar lo dif\u00EDcil, sino de reconocer lo bueno."
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
      intro: "Bienvenido a la Isla del Miedo. El miedo es una emoci\u00F3n adaptativa que nos protege, pero a veces se activa cuando no hay peligro real. Aqu\u00ED vas a aprender a distinguir entre ambas cosas.",
      level1Start: "Vamos a practicar c\u00F3mo diferenciar entre una amenaza real y una percepci\u00F3n de peligro.",
      level1Complete: "No todo lo que sentimos como peligro lo es. Aprender a evaluar esa diferencia es clave.",
      level2Start: "Cruzcemos el puente utilizando estrategias de calma y afrontamiento gradual.",
      level2Complete: "Avanzar con una estrategia es diferente a huir. Es una decisi\u00F3n consciente.",
      level3Start: "Ahora practicaremos la secuencia completa: detenerse, respirar, observar, evaluar y actuar.",
      level3Complete: "Tienes herramientas para enfrentar situaciones que te generan inquietud.",
      finalMessage: "Sentir miedo no es sin\u00F3nimo de debilidad. Ser valiente tambi\u00E9n significa reconocer el miedo y avanzar de todas formas."
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
      intro: "Bienvenido a la Isla del Desagrado. El desagrado es una emoci\u00F3n que nos senaliza que algo no nos gusta o nos resulta inc\u00F3modo. Aqu\u00ED vas a aprender a evaluar esa se\u00F1al antes de reaccionar.",
      level1Start: "Vamos a clasificar diferentes est\u00EDmulos: cu\u00E1les podemos tolerar, cu\u00E1les requieren acci\u00F3n y cu\u00E1les es mejor evitar.",
      level1Complete: "No todo requiere la misma respuesta. Evaluar antes de actuar es una habilidad importante.",
      level2Start: "Ahora vamos a practicar c\u00F3mo manejar la reacci\u00F3n autom\u00E1tica ante algo que no nos gusta.",
      level2Complete: "Mantener la calma te da la oportunidad de elegir c\u00F3mo responder.",
      level3Start: "Enfrentemos una situaci\u00F3n desagradable y practiquemos una respuesta consciente.",
      level3Complete: "Evaluaste la situaci\u00F3n antes de reaccionar. Eso marca la diferencia.",
      finalMessage: "El desagrado es una se\u00F1al, no una sentencia. Puedes escucharla y decidir c\u00F3mo actuar."
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
      intro: "Bienvenido a la Isla de la Sorpresa. La sorpresa es la emoci\u00F3n m\u00E1s breve, y aparece cuando algo inesperado ocurre. Aqu\u00ED vas a practicar c\u00F3mo manejar lo inesperado.",
      level1Start: "Van a aparecer situaciones inesperadas. Tu tarea es pausar antes de reaccionar.",
      level1Complete: "Pausar antes de reaccionar te da la posibilidad de elegir c\u00F3mo responder.",
      level2Start: "Despu\u00E9s de una sorpresa, pueden aparecer diferentes emociones secundarias. Vamos a identificar cu\u00E1l es.",
      level2Complete: "Identificar la emoci\u00F3n que sigue a la sorpresa te ayuda a entender mejor lo que sientes.",
      level3Start: "Enfrentemos una situaci\u00F3n inesperada y practiquemos la secuencia completa: pausar, observar, identificar y responder.",
      level3Complete: "Tienes la capacidad de adaptarte a lo inesperado sin perderte en el proceso.",
      finalMessage: "No siempre podemos controlar lo que sucede, pero s\u00ED podemos elegir c\u00F3mo respondemos."
    }
  }
];

export const getIslandById = (id: string): IslandConfig | undefined => {
  return islandsConfig.find(island => island.id === id);
};
