"use strict";

let statusDump = function(){
    console.log("PC: 0x" + this.registers.pc.toString(16));
    console.log("SVUBDIZC\n" + 
		(this.status.sign_flag ? 1 : 0) +
		(this.status.overflow_flag ? 1 : 0) + 
		(this.status.unused_flag ? 1 : 0) + 
		(this.status.break_flag ? 1 : 0) +
		(this.status.decimal_mode_flag ? 1 : 0) +
		(this.status.interrupt_flag ? 1 : 0) + 
		(this.status.zero_flag ? 1 : 0) +
		(this.status.carry_flag ? 1 : 0)
	);
    console.log("STACK REG: 0x" + this.registers.sp.toString(16));
    console.log("ACCUM REG: 0x" + this.registers.ac.toString(16));
    console.log("IND_X REG: 0x" + this.registers.x.toString(16));
    console.log("IND_Y REG: 0x" + this.registers.y.toString(16));
}

module.exports = statusDump;