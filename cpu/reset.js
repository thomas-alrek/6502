"use strict";

let reset = function(){
	this.memory = new Uint8Array(0x10000);
	this.status.carry_flag = false;
	this.status.zero_flag = false;
	this.status.interrupt_flag = true;
	this.status.decimal_mode_flag = false;
	this.status.break_flag = false;
	this.status.unused_flag = true;
	this.status.overflow_flag = false;
	this.status.sign_flag = false;
	this.registers.pc = 0x0;
	this.registers.sp = 0xFD;
	this.registers.ac = 0x0;
	this.registers.x = 0x0;
	this.registers.y = 0x0;
	this.registers.status = this.getStatusFlags();

	for(let i = 0x0; i < 0x2000; i++){
		this.memory[i] = 0xFF;
	}

}

module.exports = reset;