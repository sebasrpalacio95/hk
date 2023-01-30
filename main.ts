let I2C_ADDR = 0x44;
let TEMP_CMD = 0x2C;
let HUMI_CMD = 0x2C;

let sht3x = I2C_ADDR;

function readTemp() {
    pins.i2cWriteNumber(I2C_ADDR, TEMP_CMD, NumberFormat.UInt16BE);
    let data = pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt16BE, false);

    let temp = (data & 0xfffc) / 65536 * 165 - 40;
    return temp;
}

function readHumi() {
    i2cWriteNumber(I2C_ADDR, HUMI_CMD, NumberFormat.UInt16BE, false);
    let data = sht3x.read(6);

    let humi = ((data[3] << 8) + data[4]) * 100 / 65535;
    return humi;
}

console.log("Temperature: " + readTemp() + "°C");
console.log("Humidity: " + readHumi() + "%");
