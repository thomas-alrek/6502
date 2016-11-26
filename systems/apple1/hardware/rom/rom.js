const fs = require('fs');

let ROM = require('../../../../hardware/rom/rom');
const data = fs.readFileSync(__dirname + '/firmware.bin');

class AppleROM extends ROM{
    constructor(){
        super(data, 0xff00, 0xffff);
    }
}

module.exports = AppleROM;