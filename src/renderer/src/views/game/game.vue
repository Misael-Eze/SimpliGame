<script setup lang="ts">



</script>


<template>

    <div class="game">

        <div
            class="game-container"
            :style="`background-color: ${Game.selected.color};`"
        >
            <div
                class="game-container-title"
                :style="`background-color: ${Game.selected.color};`"
            >{{ Game.selected.name }}</div>
            <div class="game-container-text" v-html="Game.selected.question.text"></div>
        </div>

        <div class="game-text">Seleccione la respuesta correcta</div>

        <div class="game-answers">

            <div
                v-for="[idx, answer] in Game.selected.question.answers.entries()"
                class="game-answers-item"
                :class="{
                    'game-answers-item-selected': idx == Game.answer.idx,
                    'game-answers-item-success': Game.end && answer.isCorrect,
                    'game-answers-item-error': Game.end && !answer.isCorrect
                }"
                :style="`background-color: ${Game.selected.color};`"
                @click="Game.timer.init(answer, idx);"
            >
                <div class="game-answers-item-text" v-html="answer.text"></div>
            </div>

        </div>

        <div
            class="game-timer"
            id="game-timer"
            :class="{'game-timer-success': Game.textClass == 'success',
                     'game-timer-error': Game.textClass == 'error'}"
        >

            <div
                v-if="Game.textClass == 'start'"
                class="game-timer-count"
                :class="{'game-timer-count-active': Game.timer.active}"
            >{{ Game.timer.count }}</div>

            <div
                v-if="Game.textClass != ''"
                class="game-timer-answer"
            >

                <div 
                    class="game-timer-answer-success"
                    v-if="Game.textClass == 'success'"
                >
                    <svg class="game-timer-answer-success-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                </div>

                <div
                    class="game-timer-answer-error"
                    v-if="Game.textClass == 'error'"
                >
                    <svg class="game-timer-answer-error-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                </div>

            </div>

        </div>

        <div
            class="game-qdes"
            :style="`height: ${Game.end ? '314px' : '0px'}; margin-top: ${Game.end ? '64px' : '0px'};`"
        >

            <!-- <div class="game-qdes-title">Descripción de la respuesta correcta</div> -->
             <div class="game-qdes-title"></div>
            <div class="game-qdes-content" v-html="Game.selected.question.description"></div>
            <div class="game-qdes-title"></div>

        </div>

    </div>

</template>


<style lang="scss">

    sup {
        // color: red;
        font-size: 50%;
        font-weight: 500;
    }

    .game {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        &-container {
            // width: calc(85% - 64px - 16px);
            width: calc(85% - 12px);
            border-radius: 32px;
            margin-bottom: 64px;
            box-shadow: 0 2px 4px 0px hsl(0, 0, 0, .2);
            border: 6px solid hsl(0, 0, 0, .2);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            &-title {
                position: absolute;
                top: - 27px - 8px - 8px - 4px;
                height: 54px;
                // background: red;
                background: white;
                font-size: 32px;
                font-weight: 500;
                color: hsl(0, 0, 0, .8);
                text-align: center;
                padding: 8px 24px;
                border-radius: 16px;
                border: 6px solid hsl(0, 0, 0, .2);
                line-height: 48px;
            }

            &-text {
                font-size: 40px;
                font-weight: 500;
                text-align: center;
                color: hsl(0, 0, 0, .8);
                // line-height: 56px;
                padding: 48px;
            }

        }

        &-text {
            font-size: 32px;
            color: hsl(0, 0, 12);
            font-weight: 400;
            text-align: center;
            margin-bottom: 32px;

            

        }

        &-answers {
            display: grid;
            grid-template-columns: repeat(2, calc(50% - 8px));
            width: 85%;
            grid-gap: 16px;

            &-item {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 32px;
                min-height: 128px;
                box-shadow: 0 2px 4px 0px hsl(0, 0, 0, .2);
                padding: 20px 32px;
                border: 6px solid hsl(0, 0, 0, .2);
                transition: all .2s;

                &-text {
                    font-size: 32px;
                    // font-weight: 500;
                    text-align: center;
                    color: hsl(0, 0, 0, .8);
                    // line-height: 48px;
                }

                &-selected {
                    background: hsl(216, 95%, 79%, 1) !important;
                    border-color: hsl(216, 95%, 59%, 1) !important;
                }

                &-success {
                    background: hsl(129, 61%, 75%, 1) !important;
                }

                &-error {
                    background: hsl(355, 59%, 78%, 1) !important;
                }

            }

        }

        &-timer {
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

            &-count {
                font-size: 400px;
                font-weight: 700;
                color: hsl(0, 0, 100);
                transition: all .2s;
                // transform: scale(2);
            }

            &-success {
                background: hsl(129, 61%, 85%, .8);
            }

            &-error {
                background: hsl(355, 59%, 88%, .8);
            }

            &-answer {

                &-success,
                &-error {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    border: 24px solid hsl(129, 61%, 55%, 1);
                    width: 350px;
                    height: 350px;
                    
                    &-svg {
                        width: 192px;
                        fill: hsl(129, 61%, 55%, 1);
                    }

                }

                &-error {
                    border-color: hsl(355, 59%, 58%, 1);

                    &-svg {
                        fill: hsl(355, 59%, 58%, 1);
                    }

                }

            }

            // &-active {
            //     // display: flex;
            //     transform: scale(1);
            //     opacity: 1;
            // }

        }

        &-qdes {
            width: 85%;
            background: hsl(0, 0, 90);
            border-radius: 32px;
            overflow: hidden;
            // height: auto;
            height: 369px;
            height: 0px;
            margin-top: 64px;
            margin-top: 0px;
            transition: all .2s;

            &-title {
                font-size: 32px;
                font-weight: 500;
                text-align: center;
                // padding: 32px;
                padding: 16px 0;
            }

            &-content {
                font-size: 32px;
                padding: 0 64px;
                // padding-bottom: 100px;
                overflow: auto;
                max-height: 250px;

                /* width */
                &::-webkit-scrollbar {
                    width: 8px;
                }

                /* Track */
                &::-webkit-scrollbar-track {
                    background: hsl(0, 0, 90);
                }

                /* Handle */
                &::-webkit-scrollbar-thumb {
                    background: #888;
                }

                /* Handle on hover */
                &::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }

            }

        }

    }


</style>