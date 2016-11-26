const fs = require("fs");

let load = function(romFile, address){
	let cpu = this;
	let rom = [];
	try{
		rom = fs.readFileSync(romFile);
	}catch(e){
		throw e;
	}
	if(typeof address === 'undefined'){
		address = (cpu.memory.length) - (rom.length);
	}
	for(let i = address; i < (address + rom.length); i++){
		cpu.memory[i] = rom[i - address];
	}
}

module.exports = load;