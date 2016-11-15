"use strict";

let push = function(operand){
	let address = 0x0100 | this.registers.sp;
	this.memory[address] = operand;
	this.registers.sp--;
}

module.exports = push;