import { Application } from 'backbone.marionette'
import { Radio } from 'backbone'
import Config from 'config.json'
import GUI from 'gui'

export default Application.extend({
    el: '#luxafor-menubar',
    region: '#luxafor-menubar',

    initialize()
    {
        Radio.reply('app', 'config', Config)
    },

    onStart() {
        // Render GUI
        this.showView(new GUI)
    }
})
