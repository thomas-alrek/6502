"use strict";

let reset = function(){
	this.status.carry_flag = false;
	this.status.zero_flag = false;
	this.status.interrupt_flag = true;
	this.status.decimal_mode_flag = false;
	this.status.break_flag = false;
	this.status.unused_flag = true;
	this.status.overflow_flag = false;
	this.status.sign_flag = false;
	this.registers.pc = this.getResetVector();
	this.registers.sp = 0xfd;
	this.registers.ac = 0x0;
	this.registers.x = 0x0;
	this.registers.y = 0x0;

	//this.registers.status = this.getStatusFlags();

	//this.loop();

}

module.exports = reset;
