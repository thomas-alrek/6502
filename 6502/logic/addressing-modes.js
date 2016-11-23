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
        return cpu.get16Bytes(cpu.memory[high], cpu.memory[low]);
    },

    absoluteX: function(cpu){
        return cpu.registers.x + cpu.registers.pc++;
    },

    absoluteY: function(cpu){
        return cpu.registers.y + cpu.registers.pc++;
    },

    immediate: function(cpu){
        return ++cpu.registers.pc
    },

    indirect: function(cpu){
        return cpu.get16Bytes(++cpu.registers.pc, ++cpu.registers.pc);
    },

    indirectX: function(cpu){
        let address = cpu.memory[cpu.registers.pc + 1];
        address = cpu.get16Bytes(address + cpu.registers.x + 1, address + cpu.registers.x + 2) % 0x100;
        return cpu.memory[address];
    },

    indirectY: function(cpu){
        let address = cpu.memory[cpu.registers.pc + 1];
        address = cpu.get16Bytes(address + cpu.registers.y + 1, address + cpu.registers.y + 2) % 0x100;
        return cpu.memory[address];
    },

    relative: function(cpu){
        return cpu.registers.pc + (cpu.memory[cpu.registers.pc++] + 2).signed();
    },

    zeroPage: function(cpu){
        return cpu.memory[cpu.registers.pc + 1];
    },

    zeroPageX: function(cpu){
        return cpu.registers.x;
    },

    zeroPageY: function(cpu){
        return cpu.registers.y;
    }

}