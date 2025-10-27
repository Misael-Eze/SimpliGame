import { createApp } from 'vue'
import MainVue from './main.vue'
import App from './views/app/app.provider'
import Visual from './views/visual/visual.provider'
import Wallpaper from './views/wallpaper/wallpaper.provider'
import Qr from './views/qr/qr.provider'
import Categories from './views/categories/categories.provider'
import Game from './views/game/game.provider'
import Settings from './views/settings/settings.provider'
import Players from './views/players/players.provider'


const app = createApp(MainVue)

// Provide all providers for injection
app.provide('Settings', Settings)
app.provide('App', App)
app.provide('Visual', Visual)
app.provide('Wallpaper', Wallpaper)
app.provide('Qr', Qr)
app.provide('Categories', Categories)
app.provide('Game', Game)
app.provide('Players', Players)

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        App: typeof App,
        Visual: typeof Visual,
        Wallpaper: typeof Wallpaper,
        Qr: typeof Qr,
        Categories: typeof Categories,
        Game: typeof Game,
        Settings: typeof Settings,
        Players: typeof Players,
    }
}

app.config.globalProperties.App = App;
app.config.globalProperties.Visual = Visual;
app.config.globalProperties.Wallpaper = Wallpaper;
app.config.globalProperties.Qr = Qr;
app.config.globalProperties.Categories = Categories;
app.config.globalProperties.Game = Game;
app.config.globalProperties.Settings = Settings;
app.config.globalProperties.Players = Players;


app.mount('#app');
