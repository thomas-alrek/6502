"use strict";

let stackDump = function(){
	console.log("\nStack:");
	for(let i = 0xFF; i >= 0x00; i--){
		let address = 0x0100 | i;
		console.log("\t0x" + i.toString(16) + ": 0x" + this.memory[address].toString(16));
	}
}

module.exports = stackDump;