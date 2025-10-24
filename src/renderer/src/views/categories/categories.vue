<script setup>

    // import Categories from './categories.provider';

</script>


<template>

    <div class="categories">

        <div class="categories-title">
            <div class="categories-title-username">{{ `¡Hola ${Qr.codeBar.data.name}!` }}</div>
            <div class="categories-title-text">{{ Categories.title }}</div>
        </div>

        <div class="categories-container">

            <div
                class="categories-container-item"
                v-for="item in Categories.items"
                :style="`background-color: ${item.color};`"
                @click="Game.init(item)"
            >
                <div class="categories-container-item-text">{{ item.name }}</div>
                
                <div class="categories-container-item-button">
                    <div class="categories-container-item-button-text">Jugar</div>
                    <div class="categories-container-item-button-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>


<style lang="scss">

    .categories {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        &-title {
            margin-top: calc(-123px - 64px);
            margin-bottom: 64px;
            width: calc(100% - 128px);
            // display: none;

            &-username {
                text-align: center;
                font-size: 48px;
                color: hsl(0, 0, 12);
                font-weight: 500;
                padding-bottom: 16px;
                // display: none;
            }

            &-text {
                font-size: 32px;
                color: hsl(0, 0, 12);
                font-weight: 400;
                text-align: center;
            }

        }

        &-container {
            display: grid;
            // grid-template-columns: repeat(3, calc(calc(100% / 3) - calc(24px / 3)));
            grid-template-columns: repeat(2, calc(calc(100% - 24px) / 2));
            grid-gap: 24px;
            padding: 0 64px;
            width: calc(100% - 128px);

            &-item {
                position: relative;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                flex-direction: column;
                padding: 24px;
                // margin: 12px;
                border-radius: 32px;
                box-shadow: 0 2px 4px 0px hsl(0, 0, 0, .2);
                height: 176px;
                overflow: hidden;

                &-text {
                    font-size: 32px;
                    font-weight: 600;
                    // text-align: center;
                    // margin-bottom: 48px;
                }

                &-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: hsl(0, 0, 0, .1);
                    padding: 12px 32px;
                    border-radius: 12px;
                    color: hsl(0, 0, 12);
                    border: 2px solid hsl(0, 0, 0, .2);

                    &-text {
                        font-size: 24px;
                        font-weight: 400;
                        margin-right: 24px;
                    }

                    &-icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 10px;
                        margin-top: 4px;
                        fill: hsl(0, 0, 12);
                    }

                }

                &::before {
                    content: '';
                    position: absolute;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    right: -100px;
                    bottom: -100px;
                    background: hsl(0, 0, 0, .05);
                }

            }

        }

    }

</style>./categories.provider