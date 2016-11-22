module.exports = {
    
    absolute: function(cpu){
        let address = cpu.get16Bytes(cpu.registers.pc + 1, cpu.registers.pc);
        return cpu.memory[address];
    },

    absoluteX: function(cpu){
        let address = cpu.registers.pc + 1 + cpu.registers.x;
        return cpu.memory[address];
    },

    absoluteY: function(cpu){
        let address = cpu.registers.pc + 1 + cpu.registers.y;
        return cpu.memory[address];
    },

    immediate: function(cpu){
        let address = cpu.memory[cpu.registers.pc + 1];
        return cpu.memory[address];
    },

    indirect: function(cpu){
        let address = cpu.get16Bytes(cpu.registers.pc + 1, cpu.registers.pc + 2);
        return cpu.memory[address];
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
        let address = cpu.registers.pc + cpu.memory[cpu.registers.pc + 1];
        return address;
    },

    zeroPage: function(cpu){
        return cpu.memory[cpu.registers.pc + 1];
    },

    zeroPageX: function(cpu){
        return cpu.memory[cpu.registers.x];
    },

    zeroPageY: function(cpu){
        return cpu.memory[cpu.registers.y];
    }

}