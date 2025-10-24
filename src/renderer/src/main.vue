<script setup lang="ts">

    import App from './views/app/app.vue'

</script>


<template>

    <div class="main">

        <App></App>

    </div>

</template>


<style lang="scss">

    body,
    html {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        user-select: none;
    }

    #app,
    .main {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

</style>