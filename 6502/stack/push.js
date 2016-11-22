"use strict";

let push = function(operand){
	let address = 0x0100 | this.registers.sp;
	this.memory[address] = operand;
	if((this.registers.sp - 1) < 0x00) {
		this.registers.sp = 0xFF;
	}else{
		this.registers.sp--;
	}	
}

module.exports = push;