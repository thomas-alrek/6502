const fs = require("fs");
const CPU = require('./6502/cpu');

//Load boot ROM
fs.readFile("firmware.rom", function (err, data) {
    if (err) throw err;
    boot(data);
});

function boot(rom){
	let cpu = new CPU();

	//Load ROM into memory starting from 0xFF00
	for(let i = 0xFF00; i < (0xFF00 + rom.length); i++){
		cpu.memory[i] = rom[i - 0xFF00];
	}

	//Initialize CPU memory and reset vector
	cpu.reset();

	//Debug
	//cpu.memoryDump();
	cpu.registerDump();
	//cpu.stackDump();
}

/* Testing
cpu.memory[cpu.registers.pc + 1] = 0xaa;
cpu.registers.ac = 0xaa;
cpu.statusDump();

cpu.instructions.adc.bind(cpu);

console.log("");
cpu.statusDump();

cpu.memoryDump();*/
