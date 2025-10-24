export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Area {
  name: string;
  questions: Question[];
}

const areas: Area[] = [
  {
    name: "Robotización",
    questions: [
      {
        question: "¿Cuántos robots BD Rowa TM hay en Argentina?",
        options: ["199", "200", "218", "180"],
        correctIndex: 0,
      },
      {
        question: "¿Cuál es el robot BD Rowa TM más vendido en el mercado argentino para farmacias?",
        options: ["BD Rowa TM Vmax", "BD Rowa TM Smart", "BD Rowa TM Prolog", "BD Rowa TM EasyLoad"],
        correctIndex: 0,
      },
      {
        question: "¿En cuánto tiempo promedio el robot BD Rowa TM  dispensa un medicamento?",
        options: ["Entre 10 a 15 segundos", "Entre 20 a 25 segundos" , "Entre 8 a 10 segundos", "Entre 15 y 20 segundos"],
        correctIndex: 0,
      },
      {
        question: "¿Qué otro beneficio ofrece el robot  BD Rowa TM además de la precisión en la dispensación?",
        options: ["Reducción del espacio de almacenamiento necesario", "Menor tiempo de espera para los clientes" , "Disminuir tareas repetitivas", "Todas son correctas"],
        correctIndex: 0,
      },
      {
        question: "¿Cuántos medicamentos puede dispensar un robot BD Rowa TM en un movimiento?",
        options: ["Entre 1 a 3 medicamentos", "1 medicamento" , "5 medicamentos", "7 medicamentos"],
        correctIndex: 0,
      },
      {
        question: " ¿Qué tecnología utiliza el robot BD Rowa TM para asegurar la precisión en la dispensación?",
        options: ["Entre 10 a 15 segundos", "Entre 20 a 25 segundos" , "Entre 8 a 10 segundos", "Entre 15 y 20 segundos"],
        correctIndex: 0,
      }
    ],
  },
  {
    name: "Arquitectura",
    questions: [
      {
        question: " ¿Qué ventaja ofrece el almacenamiento automatizado del robot BD Rowa TM en cuanto a la organización de la farmacia?",
        options: ["Aumenta el desorden ", " Da orden a la farmacia y optimiza el espacio físico", " Necesita mucho espacio adicional ", " Reduce la cantidad de productos disponibles"],
        correctIndex: 0,
      },
      {
        question: "¿Cómo afecta el robot BD Rowa TM a la estética y el diseño interior de una farmacia?",
        options: ["Desorganiza el espacio interior "," Se integra de forma estética a los espacios de la farmacia "," No tiene ningún impacto "," Obliga a reducir el área de atención al cliente"],
        correctIndex: 0,
      },
      {
        question: "¿Qué impacto tiene la integración de un robot BD Rowa TM en el espacio de almacenamiento de la farmacia?",
        options: ["Aumenta la necesidad de espacio "," Reduce el espacio necesario gracias a su diseño compacto "," No afecta el espacio de almacenamiento "," Limita la capacidad de almacenamiento"],
        correctIndex: 0,
      },
      {
        question: "¿Cómo puede un robot BD Rowa TM optimizar el flujo de trabajo en el espacio físico de la farmacia?",
        options: ["Eliminando tareas repetitivas "," Aumentando el desorden del inventario "," Requiriendo espacio adicional "," Limita el acceso a ciertos medicamentos"],
        correctIndex: 0,
      },
      {
        question: " ¿Qué consideraciones de diseño deben tenerse en cuenta al instalar un robot BD Rowa TM  en una farmacia?",
        options: ["Aumentar salón de ventas, espacio de sobrestock y sector preparación pedidos "," Mejora la imagen de la farmacia y del farmacéutico "," El sistema permite optimizar el espacio "," Todas son correctas"],
        correctIndex: 0,
      },
      {
        question: "¿Cómo puede un robot BD Rowa TM contribuir a una mejor gestión del inventario físico en la farmacia?",
        options: ["Requiriendo más espacio de almacenamiento manual "," Aumentando el desorden "," Permitiendo una organización más eficiente y accesible de los  medicamentos "," Reduciendo la capacidad de almacenamiento"],
        correctIndex: 0,
      },
      {
        question: "¿En qué lugar de la farmacia puede instalarse un robot BD Rowa TM?",
        options: ["Planta baja"," Planta alta ","Subsuelo ","Entrepiso"," Todas las opciones son correctas"],
        correctIndex: 0,
      },
      {
        question: "¿Cuál es la medida más pequeña en alto que puede tener un robot BD Rowa TM?",
        options: ["1,70m "," 1,60m "," 1,85m "," 1,90m"],
        correctIndex: 0,
      },
      {
        question: "¿Cuál es la medida más pequeña en largo que puede tener un BD Rowa TM?",
        options: ["2,68m "," 2,50m "," 2,70m "," 3,08m"],
        correctIndex: 0,
      },
      {
        question: "¿Cuál es el alto máximo que puede tener un robot BD Rowa TM?",
        options: ["3,52m","3,40m ","3,24m ","3,30m"],
        correctIndex: 0,
      },
      {
        question: "¿Cuál es el largo máximo que puede tener un robot BD Rowa TM  ?",
        options: ["15,17m "," 16,00m "," 14,58m "," 13,98m"],
        correctIndex: 0,
      }
    ],
  },
  {
    name: "Digitalización",
    questions: [
      {
        question: "¿El turnero solo te da informes viejos y desactualizados?",
        options: ["Siempre antiguos y no se actualizan", "Solo proporciona gráficos de hace días, no información instantánea", "Son poco claros", "Los gráficos y datos son siempre actuales"],
        correctIndex: 0,
      },
      {
        question: "¿El turnero te avisa cuando los tiempos de espera se salen de control?",
        options: ["El sistema no te avisa", "Solo muestra los tiempos de espera al final", "avisa en tiempo real si los tiempos de espera superan los límites establecidos", "El sistema no tiene forma de saber"],
        correctIndex: 0,
      },
      {
        question: "¿Puedes ver el rendimiento de tus sucursales de manera eficiente con el turnero?",
        options: ["Solo puedes ver el rendimiento de una sucursal", "Puedes monitorear todas las sucursales en un solo panel", "No se ve el rendimiento de otras sucursales", "Te muestra solo algunas sucursales"],
        correctIndex: 0,
      },
      {
        question: "¿El turnero te da gráficos claros y útiles sobre la atención y las fugas de clientes?",
        options: ["No hay gráficos", "Los gráficos son intuitivos sobre la atención y las fugas.", "Solo muestran datos sin utilidad", "Son demasiado complicados y difíciles de entender"],
        correctIndex: 0,
      },
      {
        question: "¿El turnero te ayuda a optimizar la atención con datos en tiempo real?",
        options: ["El sistema solo da datos después de un largo periodo de tiempo", "El sistema proporciona información instantánea para optimizar el servicio.", "No hay forma de mejorar la atención con los datos disponibles.", "El turnero no ayuda en la optimización"],
        correctIndex: 0,
      }
    ],
  },
  {
    name: "Branding",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctIndex: 0,
      }
    ],
  },
  {
    name: "Vending Machines",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctIndex: 0,
      },
      {
        question: "¿",
        options: ["", "", "", ""],
        correctIndex: 0,
      }
    ],
  },
  {
    name: "Atención al Cliente",
    questions: [
      {
        question: "¿Cuándo esta disponble el servicio de atención telefónica de Automatiza?",
        options: ["En horario comercial "," En horario comercial de Lunes a Viernes","24 horas los 7 días de la semana","Solo fines de semana"],
        correctIndex: 0,
      },
      {
        question: "¿Sí se corta la luz en la farmacia que sucede con el robot  BD Rowa TM?",
        options: ["El robot no funciona y se detiene "," El robot contiene una UPS para seguir trabajando","Se pierden todos los datos del robot"," Debo cerrar la farmacia hasta que vuelva la luz"],
        correctIndex: 0,
      },
      {
        question: "¿De qué forma llega el robot  BD Rowa TM tu farmacia?",
        options: ["En cajas y en pallets ","Armado completo ","En cajas","Parcialmente armado"],
        correctIndex: 0,
      }
    ],
  }
];


export default areas;