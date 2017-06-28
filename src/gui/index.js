import { Collection } from 'backbone'
import { View } from 'backbone.marionette'
import template from './template.hbs'
import { get } from 'lodash'
import Config from 'config.json'

import Colors from './colors'
import Brightness from './brightness'

export default View.extend({
    template,
    id: 'gui',
    className: 'rows',

    regions: {
        colors: {
            el: '[data-region="colors"]',
            replaceElement: true
        },
        brightness: {
            el: '[data-region="brightness"]',
            replaceElement: true
        }
    },

    onRender() {
        this.showChildView('colors', new Colors({
            collection: new Collection(get(Config, 'palette'))
        }))

        this.showChildView('brightness', new Brightness)
    }
})
