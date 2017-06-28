import { Application } from 'backbone.marionette'
import { Model, Radio } from 'backbone'
import hid from 'node-hid/build/Release/HID.node'
import Config from 'config.json'
import gui from 'gui'
import { get, filter, map } from 'lodash'
import { hexToDecimal, decimalBrightness } from './colors'

const luxaforDevice = get(filter(hid.devices(), device => {
    return device.product.includes('LUXAFOR')
}), '0', null)

const device = new hid.HID(luxaforDevice.path)

export default Application.extend({
    el: '#luxafor-menubar',
    region: '#luxafor-menubar',

    initialize() {
        this.channel = Radio.channel('app')
        this.state = new Backbone.Model

        this.channel.on('color:set', color => { this.onColorSet(color) })
        this.channel.on('brightness:set', brightness => { this.onBrightnessSet(brightness) })

        this.listenTo(this.state, 'change', () => { this.updateFlag() })
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

        device.write([2, 0xFF, ...color, 0x33, 0])
    }
})
