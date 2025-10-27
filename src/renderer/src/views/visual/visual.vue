<script setup lang="ts">

    import QrVue from '../qr/qr.vue'
    import CategoriesVue from '../categories/categories.vue'
    import GameVue from '../game/game.vue'

</script>


<template>

    <div class="visual">

        <div
            class="visual-container"
            :style="`transform:translate(calc(-${Visual.idx} * calc(100%/3)))`"
        >

            <div class="visual-container-item">
                <QrVue></QrVue>
            </div>

            <div class="visual-container-item">
                <CategoriesVue></CategoriesVue>
            </div>

            <div class="visual-container-item">
                <GameVue></GameVue>
            </div>

        </div>

        <div
            class="visual-home"
            :class="{'visual-home-active': Game.start && !Game.timer.active}"
            @click="Game.reset()"
        >

            <div class="visual-home-icon">
                <svg class="visual-home-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
            </div>

        </div>

        <div
            class="visual-reload"
            :class="{'visual-reload-active': !Qr.enable}"
            @click="App.init()"
        >

            <div class="visual-reload-icon">
                <svg class="visual-reload-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z"/></svg>
            </div>

        </div>

        <div
            class="visual-settings"
            @touchstart="Settings.startCount()"
            @mousedown="Settings.startCount()"
            @touchend="Settings.endCount()"
            @mouseup="Settings.endCount()"
        ></div>

        <!-- <div
            class="visual-players"
            @click="Players.active = true; Players.init();"
        >

            <div class="visual-players-icon">
                <svg class="visual-players-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
            </div>

        </div>

        <PlayersVue></PlayersVue> -->

    </div>

</template>


<style lang="scss">

    .visual {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 100;

        &-container {
            width: calc(100% * 3);
            height: 100%;
            overflow: hidden;
            display: flex;
            transform: translate(0 * - calc(100% / 3));
            transition: all .4s;

            &-item {
                width: 100%;
                height: 100%;
                overflow-y: auto;
            }

        }

        &-home,
        &-reload,
        &-players {
            position: absolute;
            bottom: 32px;
            right: 32px;
            z-index: 100;
            bottom: -112px;
            transition: all .1s;

            &-icon {
                display: flex;
                align-content: center;
                justify-content: center;
                background: red;
                width: 96px;
                height: 96px;
                border-radius: 50%;
                background: hsl(0, 0, 90);
                box-shadow: 0 4px 4px hsl(0, 0, 0, .2);

                &-svg {
                    width: 40px;
                    fill: hsl(0, 0, 24)
                }

            }

            &-active {
                bottom: 32px;
            }

        }

        &-players {
            top: 16px;
            right: 16px;
            bottom: initial;

            &-icon{
                width: 80px;
                height: 80px;

                &-svg {
                    width: 32px;
                }

            }

        }


        &-settings {
            position: absolute;
            left: 0;
            top: 0;
            width: 300px;
            height: 300px;
            z-index: 100;
            // border-radius: 50%;
            // background: hsl(291, 48%, 96%);
        }

    }

</style>