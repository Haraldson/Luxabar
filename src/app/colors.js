const hexToDecimal = hex => {
    return parseInt(hex, 16)
}

const decimalToHex = decimal => {
    return (decimal).toString(16)
}

const hexBrightness = (hex, brightness) => {
    return decimalToHex(
        hexToDecimal(hex) * brightness / 100
    )
}

const decimalBrightness = (decimal, brightness) => {
    return Math.round(decimal * brightness / 100)
}

export {
    hexToDecimal, decimalToHex,
    hexBrightness, decimalBrightness
}
