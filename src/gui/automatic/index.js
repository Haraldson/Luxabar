import { Radio } from 'backbone'
import { View } from 'backbone.marionette'
import template from './template.hbs'
import rtmClient from 'slack/methods/rtm.client-browser'
import dndInfo from 'slack/methods/dnd.info'
import Credentials from 'credentials.json'
import { Color } from 'sumi-color'
import { get, map } from 'lodash'

const { oauthAccessToken, botUserOauthToken } = Credentials
const slacket = rtmClient()

export default View.extend({
    template,
    id: 'switch-automatic',
    className: 'pane rows',

    ui: {
        status: '.slack-status'
    },

    color: {
        busy: [255, 0, 0],
        free: [0, 255, 0]
    },

    initialize() {
        this.setColor()
        slacket.dnd_updated_user(() => { this.setColor() })

        slacket.listen({ token: botUserOauthToken })
    },

    setColor() {
        dndInfo({ token: oauthAccessToken }, (error, data) => {
            const snooze = get(data, 'snooze_enabled', false)
            const color = get(this.color, snooze ? 'busy' : 'free')

            // Update status color
            const statusColor = map(new Color(color).brightness(67).color(), Math.round)
            this.ui.status.css('background', `rgb(${statusColor.join(', ')})`)

            // Update flag
            Radio.trigger('app', 'color:set', color)
        })
    },

    onDestroy() {
        slacket.close()
    }
})
