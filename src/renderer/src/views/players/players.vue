<script setup lang="ts">

    import {onMounted} from 'vue'
    import Players from '../players/players.provider'

    onMounted(() => {

        Players.init();

    })

</script>


<template>

    <div
        class="players"
    >

        <div class="players-top">

            <div class="players-top-text">Jugadores</div>
            <!-- <div
                class="players-top-close"
                @click="Players.active = false;"
            >
                <svg class="players-top-close-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
            </div> -->

        </div>

        <div class="players-container">

            <div
                v-for="player in Players.items"
                :key="`player-${player.id}`"
                class="players-container-item"
                :class="{
                    'players-container-item-success': player.prize.length > 0,
                    'players-container-item-fail': player.prize.length == 0
                }"
            >
                <div class="players-container-item-ul">
                    <div class="players-container-item-ul-pri">ID:</div>
                    <div class="players-container-item-ul-sec">{{ player.id }}</div>
                </div>
                <div class="players-container-item-ul">
                    <div class="players-container-item-ul-pri">Nombre:</div>
                    <div class="players-container-item-ul-sec">{{ player.name }}</div>
                </div>
                <div class="players-container-item-ul">
                    <div class="players-container-item-ul-pri">Premio:</div>
                    <div class="players-container-item-ul-sec">{{ player.prize }}</div>
                </div>
            </div>

        </div>

    </div>

</template>


<style lang="scss">

    .players {
        position: absolute;
        top: 0;
        right: 0;
        width: 400px;
        height: 100%;
        background: hsl(0, 0, 100);
        z-index: 100;
        box-shadow: 0px 0px 32px 0px hsl(0, 0, 0, .25);
        overflow: hidden;
        // right: -500px;
        // transition: all .2s;

        &-active {
            right: 0;
        }

        &-top {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 32px;
            // background: red;
            border-bottom: 2px solid hsl(0, 0, 90);
            
            &-text {
                font-size: 32px;
                font-weight: 500;
                text-align: center;
            }

            &-close {
                position: absolute;
                right: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 64px;
                height: 64px;
                // background: blue;

                &-svg {
                    width: 24px;
                }

            }

        }

        &-container {
            overflow-y: auto;
            height: calc(100% - 109px);

            &-item {
                padding: 32px;
                border-bottom: 2px solid hsl(0, 0, 100);

                &-ul {
                    display: flex;
                    align-items: center;
                    padding: 2px 0;

                    &-pri {
                        display: flex;
                        justify-content: flex-end;
                        width: 78px;
                        font-size: 18px;
                        padding-right: 8px;
                    }

                    &-sec{
                        font-size: 24px;
                    }
                   
                }

                &-success {
                    background: hsl(120, 100, 50, .2);
                }

                &-fail {
                    background: hsl(0, 100, 50, .2);
                }

            }

        }

    }

</style>