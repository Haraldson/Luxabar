import hid from 'node-hid'
import { filter, get } from 'lodash'

const getLuxaforDevice = () => {
    let device = null

    const devices = hid.devices()
    const luxaforDevices = filter(devices, device => {
        return device.product.includes('LUXAFOR')
    })

    const luxaforDevice = get(luxaforDevices, '0', null)
    if(luxaforDevice)
        device = new hid.HID(luxaforDevice.path)

    return device
}

export { getLuxaforDevice }
