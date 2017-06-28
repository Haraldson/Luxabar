import { Radio } from 'backbone'
import { View } from 'backbone.marionette'

export default View.extend({
    template: false,
    className: 'color column shrink',

    attributes() {
        return {
            style: `background: #${this.model.get('color').join('')}`
        }
    },

    events: {
        'click': 'setColor'
    },

    onRender() {
        if(this.model.collection.indexOf(this.model) == 0)
            this.setColor()
    },

    setColor() {
        Radio.trigger('app', 'color:set', this.model.get('color'))
    }
})
