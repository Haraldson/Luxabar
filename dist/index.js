const debug = true
const Menubar = require('menubar')

const menubar = Menubar({
    width: 490,
    height: 200,
    preloadWindow: true
})

menubar.on('ready', () => {

})

menubar.on('after-hide', () => {
    if(!debug)
        menubar.app.hide()
})

menubar.on('after-create-window', () => {
    if(debug)
        menubar.window.openDevTools()
})

// ready - when the app has been created and initialized
// create-window - the line before new BrowserWindow is called
// after-create-window - the line after all window init code is done
// show - the line before window.show is called
// after-show - the line after window.show is called
// hide - the line before window.hide is called (on window blur)
// after-hide - the line after window.hide is called
// after-close - after the .window (BrowserWindow) property has been deleted
// focus-lost - emitted if always-on-top option is set and the user clicks away
