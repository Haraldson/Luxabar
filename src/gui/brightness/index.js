import { Radio } from 'backbone'
import { View } from 'backbone.marionette'
import template from './template.hbs'

export default View.extend({
    template,
    id: 'brightness',
    className: 'row shrink',

    ui: {
        brightnessSlider: 'input[type="range"]'
    },

    events: {
        'input @ui.brightnessSlider': 'setBrightness'
    },

    onRender() {
        this.setBrightness()
    },

    setBrightness() {
        Radio.trigger('app', 'brightness:set', this.ui.brightnessSlider.val())
    }
})
