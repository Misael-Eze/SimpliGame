export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Area {
  name: string;
  icon?: string;
  questions: Question[];
}

const areas: Area[] = [
  {
    name: "Robotización",
    icon: 'Robotizacion.svg',
    questions: [
      {
        question: "¿Cuántos robots BD Rowa™ hay en Argentina?",
        options: ["199", "200", "218", "180"],
        correctIndex: 2,
      },
      {
        question: "¿Cuál es el robot BD Rowa™ más vendido en el mercado argentino para farmacias?",
        options: ["BD Rowa™ Vmax", "BD Rowa™ Smart", "BD Rowa™ Prolog", "BD Rowa™ EasyLoad"],
        correctIndex: 1,
      },
      {
        question: "¿En cuánto tiempo promedio el robot BD Rowa™ dispensa un medicamento?",
        options: ["Entre 10 a 15 segundos", "Entre 20 a 25 segundos" , "Entre 8 a 10 segundos", "Entre 15 y 20 segundos"],
        correctIndex: 2,
      },
      {
        question: "¿Qué otro beneficio ofrece el robot BD Rowa™ además de la precisión en la dispensación?",
        options: ["Reducción del espacio de almacenamiento necesario", "Menor tiempo de espera para los clientes" , "Disminuir tareas repetitivas", "Todas son correctas"],
        correctIndex: 3,
      },
      {
        question: "¿Cuántos medicamentos puede dispensar un robot BD Rowa™ en un movimiento?",
        options: ["Entre 1 a 3 medicamentos", "1 medicamento" , "5 medicamentos", "7 medicamentos"],
        correctIndex: 0,
      },
      {
        question: " ¿Qué tecnología utiliza el robot BD Rowa™ para asegurar la precisión en la dispensación?",
        options: ["Escaneo manual", "Tecnología de punta, con sensores y software avanzado" , "Etiquetas físicas", "Procesos analógicos"],
        correctIndex: 1,
      }
    ],
  },
  {
    name: "Arquitectura",
    icon: 'Arquitectura.svg',
    questions: [
      {
        question: " ¿Qué ventaja ofrece el almacenamiento automatizado del robot BD Rowa™ en cuanto a la organización de la farmacia?",
        options: ["Aumenta el desorden ", " Da orden a la farmacia y optimiza el espacio físico", " Necesita mucho espacio adicional ", " Reduce la cantidad de productos disponibles"],
        correctIndex: 1,
      },
      {
        question: "¿Cómo afecta el robot BD Rowa™ a la estética y el diseño interior de una farmacia?",
        options: ["Desorganiza el espacio interior "," Se integra de forma estética a los espacios de la farmacia "," No tiene ningún impacto "," Obliga a reducir el área de atención al cliente"],
        correctIndex: 1,
      },
      {
        question: "¿Qué impacto tiene la integración de un robot BD Rowa™ en el espacio de almacenamiento de la farmacia?",
        options: ["Aumenta la necesidad de espacio "," Reduce el espacio necesario gracias a su diseño compacto "," No afecta el espacio de almacenamiento "," Limita la capacidad de almacenamiento"],
        correctIndex: 1,
      },
      {
        question: "¿Cómo puede un robot BD Rowa™ optimizar el flujo de trabajo en el espacio físico de la farmacia?",
        options: ["Eliminando tareas repetitivas "," Aumentando el desorden del inventario "," Requiriendo espacio adicional "," Limita el acceso a ciertos medicamentos"],
        correctIndex: 0,
      },
      {
        question: " ¿Qué consideraciones de diseño deben tenerse en cuenta al instalar un robot BD Rowa™  en una farmacia?",
        options: ["Aumentar salón de ventas, espacio de sobrestock y sector preparación pedidos "," Mejora la imagen de la farmacia y del farmacéutico "," El sistema permite optimizar el espacio "," Todas son correctas"],
        correctIndex: 3,
      },
      {
        question: "¿Cómo puede un robot BD Rowa™ contribuir a una mejor gestión del inventario físico en la farmacia?",
        options: ["Requiriendo más espacio de almacenamiento manual "," Aumentando el desorden "," Permitiendo una organización más eficiente y accesible de los  medicamentos "," Reduciendo la capacidad de almacenamiento"],
        correctIndex: 2,
      },
      {
        question: "¿En qué lugar de la farmacia puede instalarse un robot BD Rowa™?",
        options: ["Planta baja"," Planta alta ","Subsuelo ","Entrepiso"," Todas las opciones son correctas"],
        correctIndex: 4,
      },
      {
        question: "¿Cuál es la altura mínima que puwede tener un robot BD Rowa™?",
        options: ["1,70m "," 1,60m "," 1,85m "," 1,90m"],
        correctIndex: 0,
      },
      {
        question: "¿Cuál es la longitud mínima que puede tener un BD Rowa™?",
        options: ["2,68m "," 2,50m "," 2,70m "," 3,08m"],
        correctIndex: 1,
      },
      {
        question: "¿Cuál es la altura máxima que puede tener un robot BD Rowa™?",
        options: ["3,52m","3,40m ","3,24m ","3,30m"],
        correctIndex: 0,
      },
      {
        question: "¿Cuál es la longitud máxima que puede tener un robot BD Rowa™?",
        options: ["15,17m "," 16,00m "," 14,58m "," 13,98m"],
        correctIndex: 0,
      }
    ],
  },
  {
    name: "Digitalización",
    icon: 'Digitalizacion.svg',
    questions: [
      {
        question: "¿El sistema de turnos solo ofrece informes desactualizados?",
        options: ["Siempre antiguos y no se actualizan", "Solo proporciona gráficos de hace días, no información instantánea", "Son poco claros", "Los gráficos y datos son siempre actuales"],
        correctIndex: 3,
      },
      {
        question: "¿El turnero te avisa cuando los tiempos de espera se salen de control?",
        options: ["El sistema no te avisa", "Solo muestra los tiempos de espera al final", "Avisa en tiempo real si los tiempos de espera superan los límites establecidos", "El sistema no tiene forma de saber"],
        correctIndex: 2,
      },
      {
        question: "¿Puedes ver el rendimiento de tus sucursales de manera eficiente con el turnero?",
        options: ["Solo puedes ver el rendimiento de una sucursal", "Puedes monitorear todas las sucursales en un solo panel", "No se ve el rendimiento de otras sucursales", "Te muestra solo algunas sucursales"],
        correctIndex: 1,
      },
      {
        question: "¿El turnero te da gráficos claros y útiles sobre la atención y las fugas de clientes?",
        options: ["No hay gráficos", "Los gráficos son intuitivos sobre la atención y las fugas.", "Solo muestran datos sin utilidad", "Son demasiado complicados y difíciles de entender"],
        correctIndex: 1,
      },
      {
        question: "¿El turnero te ayuda a optimizar la atención con datos en tiempo real?",
        options: ["El sistema solo da datos después de un largo periodo de tiempo", "El sistema proporciona información instantánea para optimizar el servicio.", "No hay forma de mejorar la atención con los datos disponibles.", "El turnero no ayuda en la optimización"],
        correctIndex: 1,
      }
    ],
  },
  {
    name: "Branding",
    icon: 'Branding2.svg',
    questions: [
      {
        question: "¿Qué es el Branding?",
        options: ["El proceso de diseñar un logo para una empresa.", "La creación de una identidad visual que permite el posicionamiento de marca.", "La creación de productos nuevos para el mercado.", "La técnica de aumentar el número de ventas rápidamente."],
        correctIndex: 1,
      },
      {
        question: "¿Por qué es importante el Branding para una empresa?",
        options: ["Porque permite cobrar precios más bajos que la competencia.", "Porque ayuda a mejorar la percepción y confianza del público hacia la marca.", "Porque reemplaza la necesidad de hacer publicidad.", "Porque solo influye en el diseño visual de la marca."],
        correctIndex: 1,
      },
      {
        question: "¿Cómo influye un buen Branding en la fidelización de los clientes?",
        options: ["Hace que los clientes compren solo una vez.", "Crea una conexión emocional que motiva a elegir la marca repetidamente.", "Reduce el reconocimiento de la marca.", "Aumenta los costos de marketing sin beneficio real."],
        correctIndex: 1,
      },
      {
        question: "¿Qué pasa cuando una empresa no invierte en su Branding?",
        options: ["Una identidad fuerte y coherente.", "Una conexión sólida con los clientes.", "Confusión, falta de diferenciación y pérdida de confianza del público.", "Un aumento del valor percibido de la marca."],
        correctIndex: 0,
      },
      {
        question: "¿Qué es la arquigrafía?",
        options: [
          "La técnica de construir edificios modernos con materiales sostenibles.",
          "El estudio del comportamiento del consumidor frente a una marca.",
          "La aplicación del diseño gráfico en la arquitectura para comunicar la identidad de cada espacio.",
          "El uso de tipografías grandes en carteles publicitarios."
        ],
        correctIndex: 2,
      },
      {
        question: "¿Qué beneficios da una buena identidad visual?",
        options: [
          "Hace que la empresa se vea igual que su competencia.",
          "Aumenta la confusión del público respecto a la marca.",
          "Facilita el reconocimiento, genera confianza y refuerza la personalidad de la marca.",
          "Reduce la necesidad de mantener coherencia en la comunicación."
        ],
        correctIndex: 2,
      },
      {
        question: "¿Qué elementos gráficos se usan en el Branding?",
        options: [
          "Solo el nombre y el precio del producto.",
          "Logotipo, colores, tipografía, formas y estilos visuales coherentes.",
          "Las promociones y descuentos del mes.",
          "Los informes financieros de la empresa."
        ],
        correctIndex: 1,
      },
      {
        question: "¿Qué beneficios se obtienen al aplicar arquigrafía?",
        options: [
          "Potencia la identidad de marca y hace más clara la comunicación visual en los espacios físicos.",
          "Dificulta la orientación de las personas en los entornos.",
          "Hace que los espacios se vean recargados y confusos.",
          "Elimina la necesidad de usar señalética o diseño interior."
        ],
        correctIndex: 0,
      }
    ],
  },
  {
    name: "Atencion al Cliente",
    icon: 'Atencion.svg',
    questions: [
      {
        question: "¿Cuándo esta disponble el servicio de atención telefónica de Automatiza?",
        options: ["En horario comercial "," En horario comercial de Lunes a Viernes","24 horas los 7 días de la semana","Solo fines de semana"],
        correctIndex: 2,
      },
      {
        question: "¿Sí se corta la luz en la farmacia que sucede con el robot BD Rowa™?",
        options: ["El robot no funciona y se detiene "," El robot contiene una UPS para seguir trabajando","Se pierden todos los datos del robot"," Debo cerrar la farmacia hasta que vuelva la luz"],
        correctIndex: 1,
      },
      {
        question: "¿De qué forma llega el robot  BD Rowa™ tu farmacia?",
        options: ["En cajas y en pallets ","Armado completo ","En cajas","Parcialmente armado"],
        correctIndex: 0,
      }
    ],
  },
  {
    name: "Comodin",
    icon: 'Comodin.svg',
    questions: [
      {
        question: " ¿Qué función adicional puede ofrecer el robot BD Rowa™  que beneficia directamente a los pacientes?",
        options: ["Almacena los medicamentos", "Ordena los medicamentos", "Dispensa los medicamentos", "Todas son correctas"],
        correctIndex: 3,
      },
      {
        question: "¿Qué ventaja perciben los pacientes al ser atendidos en una farmacia con tecnología BD Rowa™?",
        options: ["Disminución de tiempos de espera", "Precisión y rapidez en la dispensación de sus medicamentos", "Atención personalizada", "Todas son correctas"],
        correctIndex: 3,
      },
      {
        question: "¿De qué manera el uso de un robot BD Rowa™ impacta en la atención personalizada al paciente?",
        options: ["Obliga al paciente a esperar más", "Reduce el tiempo disponible para la atención al paciente", "No tiene ningún impacto", "Permite al personal farmacéutico dedicar más tiempo a la atención al cliente"],
        correctIndex: 3,
      },
      {
        question: " ¿Qué impacto tiene la precisión del robot BD Rowa™ en la seguridad del paciente?",
        options: ["Aumenta la posibilidad de errores", "No tiene impacto significativo", "Stock controlado y dispensa correcta", "Limita el acceso a ciertos medicamentos"],
        correctIndex: 2,
      },
      {
        question: "¿Qué tipo de farmacias instalan robots BD Rowa™?",
        options: ["Farmacias con menos de 100 tickets diarios", "Farmacias con más de 2000 tickets diarios", "Centros de distribución y Droguerias", "Todas las anteriores"],
        correctIndex: 3,
      },
      {
        question: "¿Qué servicios adicionales puede ofrecer una farmacia equipada con un robot BD Rowa™?",
        options: ["Entrega a domicilio y consultas farmacéuticas personalizadas", "Solo venta de medicamentos", "No puede ofrecer servicios adicionales", "Reducción de horarios de atención"],
        correctIndex: 0,
      },
      {
        question: "¿Qué impacto tiene la implementación de un robot BD Rowa™ en la satisfacción del cliente?",
        options: ["Aumenta la satisfacción del cliente debido a la rapidez, precisión del servicio y atención personalizada.", "No tiene impacto", "Disminuye la satisfacción del cliente", "Limita la interacción personal con el cliente"],
        correctIndex: 0,
      },
      {
        question: "¿De qué forma puede el robot BD Rowa™ dispensar los medicamentos?",
        options: ["Mediante salidas directas", "Mediante cintas de transporte", "Todas las opciones son correctas", "Mediante espirales"],
        correctIndex: 2,
      },
      {
        question: "¿De qué forma se puede abastecer al robot BD Rowa™?",
        options: ["Automática", "Manual", "Online", "Manual y automática"],
        correctIndex: 3,
      },
      {
        question: "¿Cómo se llama el complemento que se utiliza para cargar al robot BD Rowa™ de forma automática?",
        options: ["BD Rowa™ Picking Head", "BD Rowa™ EasyLoad", "BD Rowa™ Order Buffer", "BD Rowa™ Dose"],
        correctIndex: 1,
      },
      {
        question: "¿Cómo puedo limpiar el robot BD Rowa™ cuando se ensucia?",
        options: ["Con un módulo de limpieza", "A mano", "Con módulo de limpieza y a mano", "Con limpiavidrios"],
        correctIndex: 2,
      }
    ]
  }
];


export default areas;