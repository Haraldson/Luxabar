import { Collection } from 'backbone'
import { View } from 'backbone.marionette'
import template from './template.hbs'
import { get } from 'lodash'
import Config from 'config.json'

import Colors from './colors'

export default View.extend({
    template,
    id: 'manual',
    className: 'pane rows',

    regions: {
        colors: {
            el: '[data-region="colors"]',
            replaceElement: true
        }
    },

    onRender() {
        this.showChildView('colors', new Colors({
            collection: new Collection(get(Config, 'palette'))
        }))
    }
})
