import { reactive } from 'vue'
import Qr from '../qr/qr.provider';
import Categories from '../categories/categories.provider';
// import Game from '../game/game.provider';


const App = reactive({

    urlApi: 'http://localhost:5000',

    async init(): Promise<void> {

        // VERIFICAR SI HAY PREMIOS
        // const statusStock = await Game.prize.checkStock();

        // if(!statusStock) {
        //     console.log('no hay mas premios');
        //     Qr.enable = false;
        //     return;
        // }
        // VERIFICAR SI HAY PREMIOS
        
        Qr.enable = true;
        Categories.init();

    },

    openDevTools(): void{

        window.electron.ipcRenderer.send( 'appMain', {action: 'openDevTools'} );

    },

    close(): void{

        window.electron.ipcRenderer.send( 'appMain', {action: 'quit'} );

    },

})


export default App