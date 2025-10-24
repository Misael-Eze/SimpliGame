import { reactive } from 'vue'
import Visual from '../visual/visual.provider';
import App from '../app/app.provider';
import axios from 'axios';
import Qr from '../qr/qr.provider';


const Game = reactive({

    selected: {
        name: '',
        color: '',
        question: {
            text: '',
            description: '',
            answers: [] as Array<{text: string, isCorrect: boolean}>
        }
    },

    prize: {

        value: '',

        async checkStock(): Promise<boolean> {

            let status = false;
    
            await axios.post(`${App.urlApi}/Prizes/GetAvailablePrizes`).then(res => {

                console.dir(res);

                if(res.data && res.data != null) {
    
                    if(res.data.length > 0) {

                        for(const e of res.data) {
                            if(e.stock > 0) status = true;
                        }

                        if(status) this.setRandom(res.data);
                        console.log(this.value);
    
                    }
    
                }
    
            }).catch(err => {
    
                console.dir(err);
    
            })
    
            return status;
    
        },

        setRandom(array: [{name: string, stock: number}]): void {

            const randomIndex = Math.floor(Math.random() * array.length);
            const randomElement = array[randomIndex];
            this.value = randomElement.name;

        },

        async toGiveAward(): Promise<void> {

            const payload = {
                Id: Qr.codeBar.data.id,
                AssistantName: Qr.codeBar.data.name,
                AwardedPrize: Game.prize.value
            }
    
            await axios.post(`${App.urlApi}/Prizes/AwardPrizeToAssistant`, payload).then(res => {
    
                console.dir(res);
    
            }).catch(err => {
    
                console.dir(err);
    
            })
    
        },

        async registerAssistantWithNoPrize(): Promise<void> {

            const payload = {
                Id: Qr.codeBar.data.id,
                AssistantName: Qr.codeBar.data.name,
                AwardedPrize: ''
            }
    
            await axios.post(`${App.urlApi}/Prizes/RegisterAssistantWithNoPrize`, payload).then(res => {
    
                console.dir(res);
    
            }).catch(err => {
    
                console.dir(err);
    
            })

        }

    },

    answer: {
        idx: -1,
        text: 'Incrementa la necesidad de espacio de almacenamiento',
        isCorrect: false
    },

    textClass: 'start',
    start: false, // predeterminado -> false
    end: false,

    timer: {

        count: 3,
        id: 0,
        active: false,
        touched: false,

        init(answer, idx): void {

            if(Game.timer.touched) return;
            Game.timer.touched = true;
            this.start(answer, idx);

            this.id = window.setInterval(() => {

                this.count --;
                if(this.count <= 1) this.end();

            }, 1000);

        },

        start(answer, idx): void {

            Game.answer.idx = idx;
            Game.answer.text = answer.text;
            Game.answer.isCorrect = answer.isCorrect;

            const i = document.getElementById('game-timer');

            i!.style.display = 'flex';
            i!.style.transform = 'scale(1)';
            i!.style.opacity = '0';
            i!.style.transition = '0s';

            setTimeout(() => {

                i!.style.transform = 'scale(1)';
                i!.style.opacity = '1';
                i!.style.transition = '.2s';
                this.active = true;
                
            }, 50);

        },

        async end(): Promise<void> {

            window.clearTimeout(this.id);

            setTimeout(async() => {

                const i = document.getElementById('game-timer');
                Game.end = true;

                if(Game.answer.isCorrect) {
                    Game.textClass = 'success';
                    await Game.prize.toGiveAward();
                }else {
                    Game.textClass = 'error';
                    await Game.prize.registerAssistantWithNoPrize();
                }

                setTimeout(() => {

                    i!.style.transform = 'scale(1)';
                    i!.style.opacity = '0';

                    setTimeout(() => {
                        i!.style.display = 'none';
                    }, 200);

                    setTimeout(() => {
                        
                        this.count = 3;
                        this.active = false;
                        Game.textClass = 'start';

                    }, 100);

                }, 2000);

            }, 1000);

        },

    },

    init(category: typeof Game.selected): void {

        Game.selected = category;
        Visual.idx = 2;

    },

    reset(): void {

        Visual.idx = 0;
        Game.start = false;
        Game.end = false;
        Game.timer.touched = false;

        Game.answer.idx = -1;
        Game.answer.text = '';
        Game.answer.isCorrect = false;

        Game.selected.question.description = '',

        Game.prize.value = '';

        Qr.codeBar.data.id = '';
        Qr.codeBar.data.name = '';
        Qr.codeBar.data.uuid = '';
        
        App.init();

    }

})


export default Game