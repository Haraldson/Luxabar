# Luxabar

A menubar app made for the [Luxafor](http://luxafor.com/) Flag. It currently supports two modes of operation:

1. Manually set a color from a predefined palette
2. Activate the automatic mode to show your Slack Do not disturb/Snooze status

## Building

Before installing the app’s dependencies using npm, you might need to install certain depencencies globally on your system, such as `node-gyp` and `node-pre-gyp`, in order to enable the `postinstall` script to build the required `.node` versions.

Then install the depencencies normally using `npm install`, both in the project root, and again in the `src` folder.

```bash
$ npm install node-gyp node-pre-gyp -g
$ npm install && cd src && npm install && cd -
```

Then, you have to [create a Slack App](https://api.slack.com/apps/new);
- Add a bot user
- Under _OAuth & Permissions_, select and add `dnd_read` (_Access the team’s Do Not Disturb settings_) in _Select Permission Scopes_
- Install the app to your team of choice
- Copy both the _OAuth Access Token_ and _Bot User OAuth Access Token_ into `src/credentials.json` like this:

```json
{
    "oauthAccessToken": "xoxp-xxx",
    "botUserOauthToken": "xoxb-xxx"
}
```

By now you should be all set to run `npm run bundle`. Provided everything works, you now have an app waiting for you in your repo directory!
