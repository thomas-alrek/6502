module.exports = {
    
    absolute: function(cpu){
        let low = cpu.registers.pc++;
        let high = cpu.registers.pc++;
        return cpu.get16Bytes(cpu.readByte(high), cpu.readByte(low));
    },

    absoluteX: function(cpu){
        return this.absolute(cpu) + cpu.registers.x;
    },

    absoluteY: function(cpu){
        return this.absolute(cpu) + cpu.registers.y;
    },

    immediate: function(cpu){
        return cpu.readByte(cpu.registers.pc++);
    },

    indirect: function(cpu){
        let low = cpu.registers.pc++;
        let high = cpu.registers.pc++;
        return cpu.get16Bytes(cpu.readByte(high), cpu.readByte(low));
    },

    indirectX: function(cpu){
        let z = cpu.readByte(1 + cpu.registers.pc++);
        return (cpu.readByte(z + cpu.registers.x) + cpu.readByte(z + cpu.registers.x) << 8) % 0x100;
    },

    indirectY: function(cpu){
        let z = cpu.readByte(1 + cpu.registers.pc++);
        return (cpu.readByte(z) + cpu.readByte(z) << 8) + cpu.registers.y;
    },

    relative: function(cpu){
        return cpu.registers.pc + (cpu.readByte(cpu.registers.pc++) + 1).signed();
    },

    zeroPage: function(cpu){
        return cpu.readByte(1 + cpu.registers.pc++);
    },

    zeroPageX: function(cpu){
        return (cpu.readByte(1 + cpu.registers.pc++) + cpu.registers.x) % 0x100;
    },

    zeroPageY: function(cpu){
        return (cpu.readByte(1 + cpu.registers.pc++) + cpu.registers.y) % 0x100;
    }

}