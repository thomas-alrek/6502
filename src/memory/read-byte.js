let readByte = function(address){
    for(device in this.hardware){
        if(address >= this.hardware[device].map.start && address <= this.hardware[device].map.end){
            offset = address - this.hardware[device].map.start;
            this.memory[address] = this.hardware[device].readByte(offset);
            return this.memory[address];
        }
    }
    return this.memory[address];
}

module.exports = readByte;