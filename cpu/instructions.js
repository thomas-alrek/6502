"use strict";

Number.prototype.toByte = function(){
	let val = this;
	if(val > 0xff){
		val = 0xff;
	}
	if(val < 0x0){
		val = (0xff - (+val)) % 0xff;
	}
	return val;
}

let instructions = {
	"adc": function(registers, memory, status, addressing_mode){

		let src = memory[++registers.pc];
		let val = src + registers.ac + (status.carry_flag ? 1 : 0);

		if(status.decimal_mode_flag){
			if((registers.ac & 0xf) + (src & 0xf) + (status.carry_flag ? 1 : 0) > 9){
				val += 6;
			}
			status.sign_flag = (val > 1) ? true : false;
			status.overflow_flag = (!((registers.ac ^ src) & 0x80) && ((registers.ac ^ val) && 0x80)) ? true : false;
			if(val > 0x99){
				val += 96;
			}
			status.carry_flag = (val > 0x99) ? true : false;
		}else{
			status.sign_flag = (val > 1) ? true : false;
			status.overflow_flag = (!((registers.ac ^ src) & 0x80) && ((registers.ac ^ val) && 0x80)) ? true : false;
			status.carry_flag = (val > 0xff) ? true : false;
		}
		registers.ac = val.toByte();
	},
	"bne": function(registers, memory, addressing_mode){

	},
	"clc": function(registers, memory, addressing_mode){

	},
	"dey": function(registers, memory, addressing_mode){

	},
	"lda": function(registers, memory, addressing_mode){

	},
	"ldx": function(registers, memory, addressing_mode){

	},
	"ldy": function(registers, memory, addressing_mode){

	},
	"sbc": function(registers, memory, addressing_mode){

	},
	"sec": function(registers, memory, addressing_mode){

	},
	"sta": function(registers, memory, addressing_mode){

	},
	"stx": function(registers, memory, addressing_mode){

	},
	"tay": function(registers, memory, addressing_mode){

	},
	"tya": function(registers, memory, addressing_mode){

	}
}

module.exports = instructions;