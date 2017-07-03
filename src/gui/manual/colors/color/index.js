import { Radio } from 'backbone'
import { View } from 'backbone.marionette'

export default View.extend({
    template: false,
    className: 'color column shrink',

    attributes() {
        const color = this.model.get('screencolor') || this.model.get('color')
        
        return {
            style: `background: rgb(${color.join(', ')});`
        }
    },

    events: {
        'click': 'setColor'
    },

    setColor() {
        Radio.trigger('app', 'color:set', this.model.get('color'))
    }
})
