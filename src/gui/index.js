import { Collection } from 'backbone'
import { View } from 'backbone.marionette'
import { Radio } from 'backbone'
import template from './template.hbs'

export default View.extend({
    template,
    id: 'gui',
    className: 'rows',

    onRender() {
        const Config = Radio.request('app', 'config')
    }
})
