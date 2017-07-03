import { Application } from 'backbone.marionette'
import { Model, Radio } from 'backbone'
// import usb from 'usb-detection'
import { getLuxaforDevice } from './luxafor'
import { Color } from 'sumi-color'
import Config from 'config.json'
import gui from 'gui'
import { get, debounce, map } from 'lodash'

export default Application.extend({
    el: '#luxabar',
    region: '#luxabar',

    initialize() {
        this.channel = Radio.channel('app')
        this.state = new Backbone.Model(get(Config, 'defaults'))

        // console.log(usb)
        // usb.on('attach', device => {
        //     console.log('attach', device)
        // })
        //
        // usb.on('detach', device => {
        //     console.log('detach', device)
        // })

        this.channel.on('color:set', color => { this.onColorSet(color) })
        this.channel.on('brightness:set', brightness => { this.onBrightnessSet(brightness) })

        this.updateFlag = debounce(this.updateFlag, 150, { leading: false, maxWait: 300, trailing: true })
        this.listenTo(this.state, 'change:color change:brightness', () => { this.updateFlag() })
        this.updateFlag()
    },

    onStart() {
        this.setLuxaforDevice()

        this.listenTo(this.state, 'change:connected', connected => {
            console.log('Connected?', connected)
        })

        this.showView(new gui)
    },

    setLuxaforDevice() {
        this.luxafor = getLuxaforDevice()
        this.state.set('connected', !!this.luxafor)
    },

    onColorSet(color) {
        this.state.set('color', color)
    },

    onBrightnessSet(brightness) {
        this.state.set('brightness', brightness)
    },

    updateFlag() {
        if(!this.state.get('connected'))
            return

        let { brightness, color } = this.state.toJSON()
        if(!brightness || !color)
            return

        color = map(new Color(color).brightness(brightness).color(), Math.round)
        this.luxafor.write([2, 0xFF, ...color, 0x11, 0])
    }
})
