const CPU = require('./cpu/6502');

let cpu = new CPU();

cpu.memory[cpu.registers.pc + 1] = 0xff;

cpu.registers.ac = 0xaa;

cpu.statusDump();

cpu.instructions.adc(cpu.registers, cpu.memory, cpu.status, 0x0);

console.log("");
cpu.statusDump();