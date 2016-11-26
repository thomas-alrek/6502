"use strict";

let getNMIVector = function(){
	this.push((this.registers.pc >> 8) & 0xff);
	this.push(this.registers.pc & 0xff);
	this.push(this.registers.status);
	return (this.readByte(0xFFFB) << 8) | this.readByte(0xFFFA);
}

module.exports = getNMIVector;