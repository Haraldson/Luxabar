import { Radio } from 'backbone'
import { View } from 'backbone.marionette'
import template from './template.hbs'
import rtmClient from 'slack/methods/rtm.client-browser'
import dndInfo from 'slack/methods/dnd.info'
import Credentials from 'credentials.json'
import { get } from 'lodash'

const { oauthAccessToken, botUserOauthToken } = Credentials
const slacket = rtmClient()

export default View.extend({
    template,
    id: 'automatic',
    className: 'pane rows',

    initialize() {
        this.setColor()
        slacket.dnd_updated_user(() => { this.setColor() })

        slacket.listen({ token: botUserOauthToken })
    },

    setColor() {
        dndInfo({ token: oauthAccessToken }, (error, data) => {
            const snooze = get(data, 'snooze_enabled', false)
            const color = snooze ? ['ff', '00', '00'] : ['00', 'ff', '00']
            Radio.trigger('app', 'color:set', color)
        })
    },

    onDestroy() {
        slacket.close()
    }
})
