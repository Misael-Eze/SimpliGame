<script setup lang="ts">

    import QrcodeVue from 'qrcode.vue'
    import Qr from './qr.provider'
    import Game from '../game/game.provider'
    import {onMounted} from 'vue'

    onMounted(() => {

        document.addEventListener( 'keydown', e => {

            if(e.keyCode == 13) {

                Qr.codeBar.current = Qr.codeBar.board;
                Qr.codeBar.board = '';

                console.log('Readed BarCode ->', Qr.codeBar.current);
                if(!Game.start) Qr.scan(Qr.codeBar.current);

            }else {

                Qr.codeBar.board += e.key;

            }

        })

    })

</script>


<template>

    <div
        class="qr"
        v-if="Qr.enable"
    >

        <div class="qr-main">

            <!-- <div class="qr-main-title">Escaneá el QR, completá tus datos y jugá por un premio</div> -->

            <div class="qr-main-content">
                <QrcodeVue
                    :value="Qr.value"
                    :size="400"
                    :level="'H'"
                    :render-as="'canvas'"
                    :foreground="'#2d3173'"
                ></QrcodeVue>
            </div>

        </div>

        <div
            class="qr-message"
            id="qr-message"
        >
            <div class="qr-message-container">
                <div class="qr-message-container-text">{{ Qr.message.text }}</div>
            </div>
        </div>

    </div>

    <div
        class="qr"
        v-else
    >

        <div class="qr-disable">

            <div class="qr-disable-text">¡Muchas gracias por participar!<br><br>Este formulario expiró</div>

        </div>

    </div>

</template>


<style lang="scss">

    $color-primary: hsl(251, 85%, 24%);



    .qr {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #1f9696;


        &-main {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            &-title {
                font-size: 48px;
                width: 700px;
                text-align: center;
                margin-bottom: 96px;
                margin-top: calc(-96px - 106px);
                font-weight: 700;
            }

            &-content {
                border-radius: 16px;
                overflow: hidden;
            }

        }

        &-indicator {
            position: absolute;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            // padding: 16px;
            padding: 32px;

            &-info {
                position: absolute;
            }

            &-title {
                font-size: 40px;
                // width: 600px;
                text-align: center;
                margin-bottom: 32px;
                margin-bottom: calc(300px + 128px);
                font-weight: 700;
            }

            &-animation {
                position: absolute;
                // background: red;
                display: flex;
                align-items: center;
                justify-content: center;
                bottom: 128px;

                // background: $color-primary ;
                animation: animationSplashCircle1 1s ease infinite;
                // animation-delay: 10s;
                // right: 24px;

                &-svg {
                    height: 300px;
                    // width: 300px;
                    fill: $color-primary;
                }

            }

        }

        &-message {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: hsl(0, 0, 0, .5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
            transform: scale(1);
            display: none;
            transition: all .1s;
            z-index: 100;

            &-container {
                display: flex;
                align-items: center;
                justify-content: center;
                background: hsl(0, 0, 100);
                padding: 64px 32px;
                width: 50%;
                border-radius: 16px;
                box-shadow: 0px 0px 16px 16px hsl(0, 0, 0, .2);

                &-text {
                    font-size: 40px;
                    color: hsl(0, 0, 0);
                    text-align: center;
                }

            }

        }

        &-disable {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70%;
            z-index: 0;

            &-text {
                font-size: 80px;
                font-weight: 500;
                text-align: center;
                line-height: 112px;
            }

        }

    }

    @keyframes animationSplashCircle1 {

        0%  { bottom: 128px;    }
        50% { bottom: 0px;    }
        100% { bottom: 128px;    }

    }


    @keyframes animationSplashCircle2 {

        0%   { bottom: 0;    }
        10%  { bottom: 28px; }
        18%  { bottom: 0;    }
        34%  { bottom: 48px; }
        46%  { bottom: 0;    }
        72%  { bottom: 76px;}
        80%  { bottom: 56px;}
        84%  { bottom: 46px;}
        100% { bottom: 0;    }

    }

@keyframes pulseQR {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 20px rgba(102, 126, 234, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
  }
}

.qr > QrcodeVue {
  animation: pulseQR 2s infinite;
}

</style>