<script setup>

    import fondo1 from '../../assets/fondo1.jpg'
    import automatizaLogo from '../../assets/automatiza.logo.png'

</script>


<template>

    <div class="wallpaper">

        <!-- <img :src="fondo1" alt="" class="wallpaper-image"> -->
        
        <div
            class="wallpaper-logo"
        >
            <img :src="automatizaLogo" alt="" class="wallpaper-logo-image">
        </div>

    </div>

</template>


<style lang="scss">

    .wallpaper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;

        &-image {
            width: 100%;
            height: 100%;
        }

        &-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 64px;

            &-image {
                width: 1100px;
            }

        }

    }

</style>