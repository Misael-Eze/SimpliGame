import { reactive } from 'vue'


const Settings = reactive({

    active: false,

    pad: {

        active: false,
        pin: '2560',
        value: '',
        error: false,
        numbers: ['1','2','3','4','5','6','7','8','9'],

        pressed( key: string ): void{

            Settings.pad.error = false;

            if( key == 'delete' ) {

                if( Settings.pad.value.length > 0 ) Settings.pad.value = Settings.pad.value.substring( 0, Settings.pad.value.length - 1 );

            }else if( key == 'back' ) {

                Settings.hide();

            }else if( key == 'enter' ) {

                if( Settings.pad.value == Settings.pad.pin ) {
                    
                    Settings.pad.active = false;

                }else {

                    Settings.pad.error = true;

                }

            }else {

                if( Settings.pad.value.length < 6 ) Settings.pad.value += key;

            }

        }

    },

    timeout: {

        active: false,
        object: 0,
        duration: {
            total: 3,
            current: 0
        }

    },

    startCount(): void {

        if( !Settings.timeout.active ) {

            Settings.timeout.object = window.setInterval(() => {

                Settings.timeout.duration.current ++;
                console.log( 'Settings/count -> ', Settings.timeout.duration.current );

                if( Settings.timeout.duration.current >= Settings.timeout.duration.total ) {

                    Settings.show();
                    Settings.endCount();

                }
                
            }, 1000);

            Settings.timeout.active = true;

        }

    },

    endCount(): void{

        window.clearTimeout( Settings.timeout.object );
        Settings.timeout.active = false;
        Settings.timeout.duration.current = 0;

    },

    show(): void{

       Settings.active = true;
       Settings.pad.active = true;
       Settings.pad.value = '';

    },

    hide(): void{

        Settings.endCount();
        Settings.active = false;

    },

})


export default Settings