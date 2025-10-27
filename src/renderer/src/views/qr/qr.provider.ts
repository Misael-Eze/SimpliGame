import axios from "axios";
import { reactive } from "vue";
import App from "../app/app.provider";
import Game from "../game/game.provider";

const Qr = reactive({
    enable: true,
    value: 'https://leads.simplisales.com.ar/',
    
    // 🎯 Flag para comunicar detección de vale
    valeDetected: false,

    message: {
        text: '',
        show(value: string): void {
            this.text = value;
            this.start();
        },
        start(): void {
            const i = document.getElementById('qr-message');
            if (!i) return;
            
            i.style.display = 'flex';
            i.style.transform = 'scale(1)';
            i.style.opacity = '0';
            i.style.transition = '0s';

            setTimeout(() => {
                i.style.transform = 'scale(1)';
                i.style.opacity = '1';
                i.style.transition = '.2s';
            }, 50);

            setTimeout(() => {
                this.end();
            }, 5000);
        },
        end(): void {
            const i = document.getElementById('qr-message');
            if (!i) return;
            
            i.style.transform = 'scale(1)';
            i.style.opacity = '0';
            setTimeout(() => {
                i.style.display = 'none';
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

    async scan(value: string): Promise<void> {
        console.log('🔍 scan() llamado con:', value);
        
        // Validación básica
        if (!value || typeof value !== 'string') {
            console.log('❌ Valor inválido:', value);
            return;
        }

        try {
            const raw = value.toString().trim();
            console.log('📱 Valor raw:', raw);

            // 1) Detectar vale en texto plano (case insensitive)
            const upperValue = raw.toUpperCase();
            if (upperValue.includes('VALEPORUNJUEGO')) {
                console.log('✅ Vale detectado (texto plano)');
                this.valeDetected = true;
                this.enable = false;
                this.message.show('Vale detectado - iniciando juego');
                return;
            }

            // 2) Intentar decodificar como hexadecimal
            const hexCandidate = raw.replace(/^0x/i, '');
            if (/^[0-9a-fA-F]+$/.test(hexCandidate) && hexCandidate.length % 2 === 0) {
                try {
                    const decoded = this.hexToString(hexCandidate);
                    console.log('🔓 Hex decodificado:', decoded);
                    
                    if (decoded && decoded.toUpperCase().includes('VALEPORUNJUEGO')) {
                        console.log('✅ Vale detectado (hex)');
                        this.valeDetected = true;
                        this.enable = false;
                        this.message.show('Vale detectado - iniciando juego');
                        return;
                    }
                } catch (err) {
                    console.log('⚠️ Error al decodificar hex:', err);
                }
            }

            // 3) Intentar parsear como JSON (para QR de usuarios)
            try {
                const userData = JSON.parse(raw);
                if (userData && userData.id && userData.name && userData.uuid) {
                    console.log('👤 QR de usuario detectado:', userData);
                    this.codeBar.data = userData;
                    // Aquí podrías hacer algo con los datos del usuario si es necesario
                    return;
                }
            } catch (err) {
                // No es JSON válido, continuar
            }

            // 4) Intentar decodificar hex y parsear como JSON
            if (/^[0-9a-fA-F]+$/.test(raw)) {
                try {
                    const decoded = this.hexToString(raw);
                    const userData = JSON.parse(decoded);
                    if (userData && userData.id && userData.name && userData.uuid) {
                        console.log('👤 QR de usuario detectado (hex):', userData);
                        this.codeBar.data = userData;
                        return;
                    }
                } catch (err) {
                    // No es un QR de usuario válido
                }
            }

            // No se reconoció el QR
            console.log('❌ QR no reconocido');
            this.message.show('Código QR no reconocido. Por favor, escanea el vale del juego.');
            
        } catch (error) {
            console.error('❌ Error en scan():', error);
            this.message.show('Error al procesar el código QR');
        }
    },

    // Método para resetear después de jugar
    resetVale(): void {
        console.log('🔄 Reseteando vale');
        this.valeDetected = false;
        this.enable = true;
    },

    async ckeckUserPlayed(id: string): Promise<boolean> {
        let status = false;
        try {
            const res = await axios.get(`${App.urlApi}/Players/GetById?Id=${id}`);
            if (res.data && res.data != null) {
                if (res.data.id != null) status = true;
            }
        } catch (err) {
            console.error('Error checking user:', err);
        }
        return status;
    },

    isValid(value: string): {id: string, name: string, uuid: string} | null {
        if (!value || typeof value !== 'string') {
            return null;
        }

        // Verificar si es un vale de juego
        const normalizedValue = value.toUpperCase().trim();
        if (normalizedValue.includes('VALEPORUNJUEGO')) {
            console.log('Es un vale de juego, no datos de usuario');
            return null;
        }
        
        // Intentar decodificar como hex y parsear JSON
        try {
            const str = this.hexToString(value);
            const data = JSON.parse(str);
            
            if (data && data.id && data.name && data.uuid) {
                return data;
            }
        } catch (err) {
            console.log('Error parsing user data:', err);
        }

        return null;
    },

    hexToString(hex: string): string {
        if (!hex || typeof hex !== 'string') {
            return '';
        }
        
        let str = '';
        try {
            for (let i = 0; i < hex.length; i += 2) {
                const charCode = parseInt(hex.substr(i, 2), 16);
                if (!isNaN(charCode)) {
                    str += String.fromCharCode(charCode);
                }
            }
        } catch (err) {
            console.error('Error in hexToString:', err);
            return '';
        }
        return str;
    },
    
    stringToHex(str: string): string {
        if (!str || typeof str !== 'string') {
            return '';
        }
        
        let hex = '';
        try {
            for (let i = 0; i < str.length; i++) {
                hex += str.charCodeAt(i).toString(16);
            }
        } catch (err) {
            console.error('Error in stringToHex:', err);
            return '';
        }
        return hex;
    }
});

export default Qr;