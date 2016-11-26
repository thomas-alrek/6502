class ROM{
    constructor(data, start, end){
        let romSize = data.length - 1;
        let mapSize = end - start;
        if(romSize > mapSize){
            throw RangeError("Can't map " + romSize + " byte(s) in 0x" + start.toString(16) + " - 0x" + end.toString(16) + " (" + mapSize + " bytes)");
        }
        this.map = {start, end}
        this.memory = new Uint8Array(data.length);
        for(let i = 0; i < data.length; i++){
            this.memory[i] = data[i];
        }
    }
}

ROM.prototype.readByte = function(address){
    return this.memory[address];
}

ROM.prototype.writeByte = function(address, value){
    return this.memory[address];
}

module.exports = ROM;