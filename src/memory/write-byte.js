let writeByte = function(address, value){
    for(device in this.hardware){
        if(address >= this.hardware[device].map.start && address <= this.hardware[device].map.end){
            offset = address - this.hardware[device].map.start;
            this.memory[address] = this.hardware[device].writeByte(offset, value);
            return this.memory[address];
        }
    }
    this.memory[address] = value;
}

module.exports = writeByte;