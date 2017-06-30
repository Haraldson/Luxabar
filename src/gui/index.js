import { View } from 'backbone.marionette'
import template from './template.hbs'

import Manual from './manual'
import Automatic from './automatic'
import Brightness from './brightness'

export default View.extend({
    template,
    id: 'gui',
    className: 'rows',

    ui: {
        automaticSwitch: '#automatic-switch'
    },

    regions: {
        pane: {
            el: '[data-region="pane"]',
            replaceElement: true
        },
        brightness: {
            el: '[data-region="brightness"]',
            replaceElement: true
        }
    },

    events: {
        'change @ui.automaticSwitch': 'onAutomaticSwitchChange'
    },

    onRender() {
        this.showPaneView()
        this.showChildView('brightness', new Brightness)
    },

    onAutomaticSwitchChange() {
        this.showPaneView()
    },

    showPaneView() {
        const mode = this.ui.automaticSwitch.prop('checked') ? 'automatic' : 'manual'
        const map = {
            manual: Manual,
            automatic: Automatic
        }

        this.showChildView('pane', new map[mode])
    }
})
