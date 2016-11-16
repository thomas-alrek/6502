"use strict";

let pop = function(){
	let address = 0x0100 | ++this.registers.sp;
    return this.memory[address];
}

module.exports = pop;
