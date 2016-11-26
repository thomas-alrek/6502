const KBD = 0x10;
const KBDCR = 0x11;
const DSP = 0x12;
const DSPCR = 0x13;

class PIA6821{
    constructor(data){
        this.map = {
            start: 0xd000, 
            end: 0xdfff
        }
        this.memory = new Uint8Array(0x1000);
    }
}

PIA6821.prototype.readByte = function(address){
    switch(address){
        case KBD:
            this.memory[KBDCR] &= ~(1 << 7);
            break;
        default:
            break;
    }
    return this.memory[address];
}

PIA6821.prototype.writeByte = function(address, value){
    switch(address){
        case DSP:
            this.memory[DSP] |= 1 << 7;
            break;
        default:
            break;
    }
    return this.memory[address];
}

module.exports = PIA6821;