"use strict";

let pull = function(){
	let address = 0x0100 | ++this.registers.sp;
    return this.memory[address];
}

module.exports = pull;