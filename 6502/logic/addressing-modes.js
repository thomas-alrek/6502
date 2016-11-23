Number.prototype.signed = function(){
	let val = this;
	if(val > 0x7F){
		val  = val - 0x100;
	}
	return val;
}

module.exports = {
    
    absolute: function(cpu){
        let low = cpu.registers.pc++;
        let high = cpu.registers.pc++;
        console.log("0x" + cpu.get16Bytes(cpu.memory[high], cpu.memory[low]).toString(16));
        return cpu.get16Bytes(cpu.memory[high], cpu.memory[low]);
    },

    absoluteX: function(cpu){
        return this.absolute(cpu) + cpu.registers.x;
    },

    absoluteY: function(cpu){
        return this.absolute(cpu) + cpu.registers.y;
    },

    immediate: function(cpu){
        return cpu.registers.pc++;
    },

    indirect: function(cpu){
        let low = cpu.registers.pc++;
        let high = cpu.registers.pc++;
        return cpu.get16Bytes(cpu.memory[high], cpu.memory[low]);
    },

    indirectX: function(cpu){
        let z = cpu.memory[1 + cpu.registers.pc++];
        return (cpu.memory[z + cpu.registers.x] + cpu.memory[z + cpu.registers.x] << 8) % 0x100;
    },

    indirectY: function(cpu){
        let z = cpu.memory[1 + cpu.registers.pc++];
        return (cpu.memory[z] + cpu.memory[z] << 8) + cpu.registers.y;
    },

    relative: function(cpu){
        return cpu.registers.pc + (cpu.memory[cpu.registers.pc++] + 1).signed();
    },

    zeroPage: function(cpu){
        return cpu.memory[1 + cpu.registers.pc++];
    },

    zeroPageX: function(cpu){
        return (cpu.memory[1 + cpu.registers.pc++] + cpu.registers.x) % 0x100;
    },

    zeroPageY: function(cpu){
        return (cpu.memory[1 + cpu.registers.pc++] + cpu.registers.y) % 0x100;
    }

}