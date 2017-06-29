import hid from 'node-hid/build/Release/HID.node'
import { filter, get } from 'lodash'

let device = null

const devices = hid.devices()
const luxaforDevices = filter(devices, device => {
    return device.product.includes('LUXAFOR')
})

const luxaforDevice = get(luxaforDevices, '0', null)
if(luxaforDevice)
    device = new hid.HID(luxaforDevice.path)

export default device
