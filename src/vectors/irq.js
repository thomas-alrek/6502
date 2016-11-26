"use strict";

let getIRQVector = function(){
	this.push((this.registers.pc >> 8) & 0xff);
	this.push(this.registers.pc & 0xff);
	this.push(this.registers.status);
	return (this.readByte(0xFFFF) << 8) | this.readByte(0xFFFE);
}

module.exports = getIRQVector;