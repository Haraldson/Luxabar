import { Application } from 'backbone.marionette'
import { Model, Radio } from 'backbone'
import luxafor from './luxafor'
import { hexToDecimal, decimalBrightness } from './colors'
import rtmClient from 'slack/methods/rtm.client-browser'
import dndInfo from 'slack/methods/dnd.info'
import Config from 'config.json'
import Credentials from 'credentials.json'
import gui from 'gui'
import { debounce, get, filter, map } from 'lodash'

const { oauthAccessToken, botUserOauthToken } = Credentials
const slacket = rtmClient()

export default Application.extend({
    el: '#luxabar',
    region: '#luxabar',

    initialize() {
        this.channel = Radio.channel('app')
        this.state = new Backbone.Model

        this.channel.on('color:set', color => { this.onColorSet(color) })
        this.channel.on('brightness:set', brightness => { this.onBrightnessSet(brightness) })

        this.updateFlag = debounce(this.updateFlag, 150, { leading: false, maxWait: 300, trailing: true })
        this.listenTo(this.state, 'change', () => { this.updateFlag() })

        slacket.dnd_updated_user(() => {
            dndInfo({ token: oauthAccessToken }, (error, data) => {
                // TODO: Read data, update flag accordingly
                console.log(data)
            })
        })

        slacket.listen({ token: botUserOauthToken })
    },

    onStart() {
        this.showView(new gui)
    },

    onColorSet(color) {
        this.state.set('color', color)
    },

    onBrightnessSet(brightness) {
        this.state.set('brightness', brightness)
    },

    updateFlag() {
        let { brightness, color } = this.state.toJSON()
        if(!brightness || !color)
            return

        // Stay in the lower half range of brightnesses
        brightness = Math.round(brightness / 2)

        // Translate colors
        color = map(color, hex => {
            const decimal = hexToDecimal(hex)
            return decimalBrightness(decimal, brightness)
        })

        luxafor.write([2, 0xFF, ...color, 0x33, 0])
    }
})
