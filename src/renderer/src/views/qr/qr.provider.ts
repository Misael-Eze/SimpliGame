import axios from "axios";
import { reactive } from "vue";
import App from "../app/app.provider";
import Game from "../game/game.provider";
import Visual from "../visual/visual.provider";


const Qr = reactive({

    enable: true,
    value: 'https://leads.simplisales.com.ar/',

    message: {
        text: '',

        show(value: string): void {

            this.text = value;
            this.start();

        },

        start(): void {

            const i = document.getElementById('qr-message');

            i!.style.display = 'flex';
            i!.style.transform = 'scale(1)';
            i!.style.opacity = '0';
            i!.style.transition = '0s';

            setTimeout(() => {

                i!.style.transform = 'scale(1)';
                i!.style.opacity = '1';
                i!.style.transition = '.2s';
                
            }, 50);

            setTimeout(() => {

                this.end();

            }, 5000);

        },

        end(): void {

            const i = document.getElementById('qr-message');

            i!.style.transform = 'scale(1)';
            i!.style.opacity = '0';

            setTimeout(() => {
                i!.style.display = 'none';
            }, 200);

        },

    },

    codeBar: {
        current: '',
        board: '',
        data: {
            id: '',
            name: '',
            uuid: ''
        }
    },

    async scan1(value: string): Promise<void> {

        // VERIFICAR QR
        const data = this.isValid(value);
        console.log(data);

        if(data == null) {
            console.log('qr inválido');
            this.message.show('Lo sentimos, el código QR escaneado es inválido');
            return;
        }
        // VERIFICAR QR


        // VERIFICAR SI HAY PREMIOS
        const statusStock = await Game.prize.checkStock();

        if(!statusStock) {
            console.log('no hay mas premios');
            // this.message.show('Lo sentimos, este juego terminó');
            this.enable = false;
            return;
        }
        // VERIFICAR SI HAY PREMIOS


        // VERIFICAR SI EL USUARIO YA JUGÓ
        const statusPlayed = await this.ckeckUserPlayed(data.id);

        if(statusPlayed) {
            console.log('el usuario ya jugó');
            this.message.show('Lo sentimos, el código QR ya fue escaneado anteriormente');
            return;
        }
        // VERIFICAR SI EL USUARIO YA JUGÓ

        Qr.codeBar.data.id = data.id;
        Qr.codeBar.data.name = data.name;
        Qr.codeBar.data.uuid = data.uuid;

        Visual.idx = 1;
        Game.start = true;

        console.log('Hay premios?:', statusStock);
        console.log('El usuario ya jugó?:', statusPlayed);
        console.dir(JSON.stringify(data));

    },

    async scan(value: string): Promise<void> {

    // Check if it's a game ticket - if so, ignore here (customScan will handle it)
    const normalizedValue = value.toUpperCase().trim();
    if (normalizedValue.includes('VALEPORUNJUEGO')) {
        console.log('Vale de juego detectado - dejando que customScan lo maneje');
        return; // Exit early, don't process
    }

    // VERIFICAR QR
    const data = this.isValid(value);
    console.log(data);

    if(data == null) {
        console.log('qr inválido');
        this.message.show('Lo sentimos, el código QR escaneado es inválido');
        return;
    }
    
    // Ya no verificas premios ni si jugó antes
    // Solo guardas los datos y arrancas el juego
    
    Qr.codeBar.data.id = data.id;
    Qr.codeBar.data.name = data.name;
    Qr.codeBar.data.uuid = data.uuid;

    Visual.idx = 1;
    Game.start = true;

    console.log('Usuario válido, iniciando juego');
    console.dir(JSON.stringify(data));

},

    

    async ckeckUserPlayed(id: string): Promise<boolean> {

        let status = false

        await axios.get(`${App.urlApi}/Players/GetById?Id=${id}`).then(res => {

            console.dir(res);

            if(res.data && res.data != null) {

                if(res.data.id != null) status = true;

            }

        }).catch(err => {

            console.dir(err);

        })

        return status;

    },

    isValid1(value: string): {id: string, name: string, uuid: string}|null {

        let data: {id: string, name: string, uuid: string}|null;
        const str = this.hexToString(value);

        try {

            data = JSON.parse(str);

            if(data!['id'] == null || data!['id'] == undefined ||
               data!['name'] == null || data!['name'] == undefined ||
               data!['uuid'] == null || data!['uuid'] == undefined) {

                data = null;

            }

        }catch(err) {

            data = null;
            console.log(err);

        }

        return data;

    },
    isValid(value: string): {id: string, name: string, uuid: string}|null {

    let data: {id: string, name: string, uuid: string}|null;
    
    // First check if it's a game ticket (plain text)
    const normalizedValue = value.toUpperCase().trim();
    if (normalizedValue.includes('VALEPORUNJUEGO')) {
        // It's a game ticket, not user data - return null so it's handled elsewhere
        console.log('Es un vale de juego, no datos de usuario');
        return null;
    }
    
    // Try to decode as hex and parse as JSON (for user QR codes)
    const str = this.hexToString(value);

    try {

        data = JSON.parse(str);

        if(data!['id'] == null || data!['id'] == undefined ||
           data!['name'] == null || data!['name'] == undefined ||
           data!['uuid'] == null || data!['uuid'] == undefined) {

            data = null;

        }

    }catch(err) {

        data = null;
        console.log(err);

    }

    return data;

},

    hexToString(hex: string): string {

        var hex = hex.toString(); //force conversion
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;

    },
    
    stringToHex(str: string): string {

        var hex = '';

        for(var i=0;i<str.length;i++)
            hex += ''+str.charCodeAt(i).toString(16);

        return hex;

    }

})


export default Qr