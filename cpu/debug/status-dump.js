"use strict";

let statusDump = function(){
	console.log("\nRegisters:");
    console.log("\tPC:\t\t0x" + this.registers.pc.toString(16));
    console.log("\tSTATUS REG:\t0x" + this.registers.status.toString(16) + " " +
		(this.status.sign_flag ? 1 : 0) +
		(this.status.overflow_flag ? 1 : 0) + 
		(this.status.unused_flag ? 1 : 0) + 
		(this.status.break_flag ? 1 : 0) +
		(this.status.decimal_mode_flag ? 1 : 0) +
		(this.status.interrupt_flag ? 1 : 0) + 
		(this.status.zero_flag ? 1 : 0) +
		(this.status.carry_flag ? 1 : 0) + 
		" (SVUBDIZC)"
	);
    console.log("\tSTACK REG:\t0x" + this.registers.sp.toString(16));
    console.log("\tACCUM REG\t0x" + this.registers.ac.toString(16));
    console.log("\tIND_X REG:\t0x" + this.registers.x.toString(16));
    console.log("\tIND_Y REG:\t0x" + this.registers.y.toString(16));
}

module.exports = statusDump;