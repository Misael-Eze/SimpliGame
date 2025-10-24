import axios from "axios";
import { reactive } from "vue";
import App from "../app/app.provider";


const Players = reactive({

    active: false,

    items: [] as Array<{id: string, name: string, prize: string}>,

    async init(): Promise<void>{

        this.items = [];

        await axios.get(`${App.urlApi}/Players/Get`).then(res => {

            if(res.data && res.data != null) {

                for(const e of res.data) {

                    this.items.push({
                        id: e.id,
                        name: e.name,
                        prize: e.prize
                    })

                }

            }

        }).catch(err => {

            console.dir(err);

        })

    }

})


export default Players