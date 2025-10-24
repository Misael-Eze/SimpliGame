import axios from "axios";
import { reactive } from "vue";
import App from "../app/app.provider";


const Categories = reactive({

    title: 'Seleccione una categoría',

    items: [

        // {
        //     name: 'Recursos',
        //     color: '#C1F0C8',
        //     question: {
        //         text: '¿Cuántos robots Rowa hay en Argentina?',
        //         description: 'En la Argentina hay 170 robots instalados ...',
        //         answers: [
        //             {
        //                 text: '50',
        //                 isCorrect: false
        //             },
        //             {
        //                 text: '85',
        //                 isCorrect: false
        //             },
        //             {
        //                 text: '170',
        //                 isCorrect: true
        //             },
        //             {
        //                 text: '104',
        //                 isCorrect: false
        //             }
        //         ]

        //     }

        // },

        // {
        //     name: 'Clientes',
        //     color: '#FAE2D5',
        //     question: {
        //         text: '¿Qué función adicional puede ofrecer el robot Rowa que beneficia directamente a los clientes?',
        //         description: '...',
        //         answers: [
        //             {
        //                 text: 'Entrega inmediata del medicamento',
        //                 isCorrect: false
        //             },
        //             {
        //                 text: 'Seguridad de dispensación',
        //                 isCorrect: false
        //             },
        //             {
        //                 text: 'Atención personalizada al cliente',
        //                 isCorrect: false
        //             },
        //             {
        //                 text: 'Todas son correctas',
        //                 isCorrect: true
        //             }
        //         ]

        //     }
        // },

        // {
        //     name: 'Espacio Físico',
        //     color: '#FFF3CD',
        //     question: {
        //         text: '¿Qué ventaja ofrece el almacenamiento automatizado del robot Rowa en cuanto a la organización de la farmacia?',
        //         description: '...',
        //         answers: [
        //             {
        //                 text: 'Aumenta el desorden',
        //                 isCorrect: false
        //             },
        //             {
        //                 text: 'Mejora la organización y optimiza el uso del espacio',
        //                 isCorrect: true
        //             },
        //             {
        //                 text: 'Necesita mucho espacio adicional',
        //                 isCorrect: false
        //             },
        //             {
        //                 text: 'Reduce la cantidad de productos disponibles',
        //                 isCorrect: false
        //             }
        //         ]

        //     }
        // },

        // {
        //     name: 'Productos y Servicios',
        //     color: '#F1CEEE',
        //     question: {
        //         text: '¿Qué ventaja ofrece el robot Rowa en la gestión de productos en una farmacia?',
        //         description: '...',
        //         answers: [
        //             {
        //                 text: 'Aumenta el desorden del inventario',
        //                 isCorrect: false
        //             },
        //             {
        //                 text: 'Reduce la cantidad de productos vendidos',
        //                 isCorrect: true
        //             },
        //             {
        //                 text: 'Reduce la cantidad de productos disponibles',
        //                 isCorrect: false
        //             },
        //             {
        //                 text: 'Incrementa la necesidad de espacio de almacenamiento',
        //                 isCorrect: false
        //             }
        //         ]

        //     }
        // },

        // {
        //     name: 'Complementos del robot',
        //     color: '#F6B26B',
        //     question: {
        //         text: '¿Cómo se llama el complemento que se utiliza para cargar al robot de forma automática?',
        //         description: '...',
        //         answers: [
        //             {
        //                 text: 'ProLog',
        //                 isCorrect: false
        //             },
        //             {
        //                 text: 'EasyLoad',
        //                 isCorrect: true
        //             },
        //             {
        //                 text: 'Order Buffer',
        //                 isCorrect: false
        //             },
        //             {
        //                 text: 'Dose',
        //                 isCorrect: false
        //             }
        //         ]

        //     }
        // },

        // {
        //     name: 'Atención al Cliente',
        //     color: '#F57089',
        //     question: {
        //         text: '¿Qué sucede con el robot si se corta el suministro eléctrico en la Farmacia?',
        //         description: '...',
        //         answers: [
        //             {
        //                 text: 'El robot no funciona',
        //                 isCorrect: false
        //             },
        //             {
        //                 text: 'Debo esperar que retorne el servicio de energía',
        //                 isCorrect: true
        //             },
        //             {
        //                 text: 'El robot tiene una UPS para poder seguir trabajando',
        //                 isCorrect: false
        //             },
        //             {
        //                 text: 'Debo cerrar la farmacia hasta que vuelva la energía',
        //                 isCorrect: false
        //             }
        //         ]

        //     }
        // },

    ] as any,

    init(): void {

        axios.get(`${App.urlApi}/Questions`).then(res => {

            console.dir(res);

            if(res.data) {

                Categories.items = [];

                for(const e of res.data) {

                    const answers = [] as any;

                    for(const a of e.answers) {

                        answers.push({
                            text: a.text,
                            isCorrect: a.correct
                        })

                    }
                   
                    Categories.items.push({
                        name: e.category,
                        color: e.color,
                        question: {
                            text: e.text,
                            description: e.explanation,
                            answers
                        }
                    })
                    
                }

            }

        }).catch(err => {

            console.dir(err);

        })

    }

})


export default Categories