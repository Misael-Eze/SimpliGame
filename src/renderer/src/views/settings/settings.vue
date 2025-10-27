<script setup lang="ts">

//    import PlayersVue from '../players/players.vue'

</script>


<template>
    
    <div class="settings">

        <div class="settings-container">

            <div
                class="settings-container-init"
                v-if="Settings.pad.active"
            >

                <div class="settings-container-init-display">

                    <div class="settings-container-init-display-content">

                        <div
                            class="settings-container-init-display-content-pin"
                            v-if="Settings.pad.value.length > 0"
                            :class="{ 'settings-container-init-display-content-pin-error': Settings.pad.error }"
                        >
                            <div
                                v-for="(_, idx) in Settings.pad.value.length"
                                :key="`key-${idx}`"
                            >*</div>
                        </div>

                        <div class="settings-container-init-display-content-bar"></div>

                        <div
                            class="settings-container-init-display-content-delete"
                            @click="Settings.pad.pressed( 'delete' )"
                            v-if="Settings.pad.value.length > 0"
                        >
                            <div class="settings-container-init-display-content-delete-i">
                                <svg class="settings-container-init-display-content-delete-i-svg" viewBox="0 0 320.941 320.941" xmlns="http://www.w3.org/2000/svg"><path d="m290.853 40.118h-181.049c-9.06 0-17.551 4.016-23.301 11.038l-84.241 102.968c-3.017 3.692-3.017 9.001 0 12.693l84.251 102.978c5.739 7.013 14.231 11.028 23.291 11.028h181.048c16.592 0 30.088-13.497 30.088-30.088v-180.529c.001-16.592-13.496-30.088-30.087-30.088zm10.029 210.617c0 5.534-4.496 10.029-10.029 10.029h-181.049c-3.026 0-5.857-1.342-7.767-3.673l-79.05-96.621 79.04-96.611c1.92-2.341 4.75-3.683 7.777-3.683h181.048c5.534 0 10.029 4.496 10.029 10.029.001.001.001 180.53.001 180.53z"/><path d="m223.585 103.232-43.056 43.056-43.056-43.056-14.182 14.182 43.056 43.056-43.056 43.056 14.182 14.182 43.056-43.056 43.056 43.056 14.182-14.182-43.056-43.056 43.056-43.056z"/></svg>
                            </div>

                        </div>

                    </div>

                </div>

                <div class="settings-container-init-pad">

                    <div
                        class="settings-container-init-pad-item"
                        v-for="number in Settings.pad.numbers"
                        :key="number"
                        @click="Settings.pad.pressed( number )"
                    >
                        <div class="settings-container-init-pad-item-text">{{number}}</div>
                    </div>

                    <div
                        class="settings-container-init-pad-item"
                        @click="Settings.pad.pressed( 'back' )"
                    >
                        <div class="settings-container-init-pad-item-i">
                            <svg class="settings-container-init-pad-item-i-svg" viewBox="0 0 448 512"><path d="M231.536 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113L238.607 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"/></svg>
                        </div>
                    </div>

                    <div
                        class="settings-container-init-pad-item"
                        @click="Settings.pad.pressed( '0' )"
                    >
                        <div class="settings-container-init-pad-item-text">0</div>
                    </div>

                    <div
                        class="settings-container-init-pad-item"
                        @click="Settings.pad.pressed( 'enter' )"
                    >
                        <div class="settings-container-init-pad-item-i">
                            <svg class="settings-container-init-pad-item-i-svg" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m260.52 329.539a24 24 0 0 0 33.941 33.941l90.51-90.51a24 24 0 0 0 0-33.941l-90.51-90.509a24 24 0 0 0 -33.941 0 24 24 0 0 0 0 33.941l49.539 49.539h-262.059a24 24 0 0 0 -24 24 24 24 0 0 0 24 24h262.059z"/><path d="m448 24h-224a40 40 0 0 0 -40 40v32a24 24 0 0 0 48 0v-24h208v368h-208v-24a24 24 0 0 0 -48 0v32a40 40 0 0 0 40 40h224a40 40 0 0 0 40-40v-384a40 40 0 0 0 -40-40z"/></g></svg>
                        </div>
                    </div>

                </div>

            </div>

            <div
                class="settings-container-content"
                v-else
            >

                <div class="settings-container-content-top">

                    <div class="settings-container-content-top-title">Ajustes del Totem</div>

                </div>


                <div class="settings-container-content-options">

                    <div
                        class="settings-container-content-options-btn"
                        @click="Settings.hide()"
                    >
                        <div class="settings-container-content-options-btn-i">
                            <svg class="settings-container-content-options-btn-i-svg" viewBox="0 0 448 512"><path d="M231.536 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113L238.607 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"/></svg>
                        </div>
                    </div>

                    <div
                        class="settings-container-content-options-btn"
                        @click="App.openDevTools()"
                    >
                        <div class="settings-container-content-options-btn-i">
                            <svg class="settings-container-content-options-btn-i-svg" viewBox="0 0 94.504 94.504" xmlns="http://www.w3.org/2000/svg"><path d="M93.918,45.833L69.799,21.714c-0.75-0.75-2.077-0.75-2.827,0l-5.229,5.229c-0.781,0.781-0.781,2.047,0,2.828l17.477,17.475L61.744,64.724c-0.781,0.781-0.781,2.047,0,2.828l5.229,5.229c0.375,0.375,0.884,0.587,1.414,0.587c0.529,0,1.039-0.212,1.414-0.587l24.117-24.118C94.699,47.881,94.699,46.614,93.918,45.833z"/><path d="M32.759,64.724L15.285,47.248l17.477-17.475c0.375-0.375,0.586-0.883,0.586-1.414c0-0.53-0.21-1.039-0.586-1.414l-5.229-5.229c-0.375-0.375-0.884-0.586-1.414-0.586c-0.53,0-1.039,0.211-1.414,0.586L0.585,45.833c-0.781,0.781-0.781,2.047,0,2.829L24.704,72.78c0.375,0.375,0.884,0.587,1.414,0.587c0.53,0,1.039-0.212,1.414-0.587l5.229-5.229C33.542,66.771,33.542,65.505,32.759,64.724z"/><path d="M60.967,13.6c-0.254-0.466-0.682-0.812-1.19-0.962l-4.239-1.251c-1.058-0.314-2.172,0.293-2.484,1.352L33.375,79.382c-0.15,0.509-0.092,1.056,0.161,1.521c0.253,0.467,0.682,0.812,1.19,0.963l4.239,1.251c0.189,0.056,0.38,0.083,0.567,0.083c0.863,0,1.66-0.564,1.917-1.435l19.679-66.644C61.278,14.612,61.221,14.065,60.967,13.6z"/></svg>
                        </div>
                        <div class="settings-container-content-options-btn-text">Consola</div>
                    </div>

                    <div
                        class="settings-container-content-options-btn"
                        @click="App.close()"
                    >
                        <div class="settings-container-content-options-btn-i">
                            <svg class="settings-container-content-options-btn-i-svg" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"/></svg>
                        </div>
                        <div class="settings-container-content-options-btn-text">Cerrar App</div>
                    </div>

                </div>

            </div>

            <!-- <PlayersVue v-if="!Settings.pad.active"></PlayersVue> -->

        </div>

    </div>

</template>


<style lang="scss">

    @import './settings.scss';

</style>