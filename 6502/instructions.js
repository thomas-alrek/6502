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

Number.prototype.signed = function(){
	let val = this;
	if(val > 0x7F){
		val  = val - 0x100;
	}
	return val;
}

let instructions = {

	"cli": (cpu) => {
		cpu.status.interrupt_flag = false
	},

	"nop": (cpu) => {},

	"ora": (cpu, address) => {
		let ac = cpu.registers.ac;
		let value = cpu.memory[address];
		cpu.registers.ac = cpu.update_nz(ac | value);
	},

	"bpl": (cpu, address) => {
		if(!cpu.status.sign_flag){
			cpu.registers.pc = address;
		}
	},

	"jsr": (cpu, address) => {
		cpu.push(cpu.registers.pc - 1);
		cpu.registers.pc = address;
	},

	"eor": (cpu, address) => {
		let ac = cpu.registers.ac;
		let value = cpu.memory[address];
		cpu.registers.ac = cpu.update_nz(ac ^ value);
	},

	"and": (cpu, address) => {
		let ac = cpu.registers.ac;
		let value = cpu.memory[address];
		cpu.registers.ac = cpu.update_nz(ac & value);
	},

	"sta": (cpu, address) => {
		let value = cpu.registers.ac;
		cpu.memory[address] = value;
	},

	"adc": (cpu, address) => {
		let ac = cpu.registers.ac;
		let ac_signed = ac.signed();
		let val = cpu.memory[address];
		let val_signed = val.signed();
		let carry_flag = (cpu.status.carry_flag ? 1 : 0);

		let result1 = ac_signed + val_signed + carry_flag;
		let result2 = ac + val + carry_flag;

		cpu.registers.ac = cpu.update_nzc(result2);
		cpu.status.overflow_flag = ((result1 > 0x7F) ? true : false) | ((result1 < -128) ? true : false);
	},

	"lsr": (cpu, address) => {
		if(typeof address === 'undefined'){
			cpu.status.carry_flag = cpu.registers.ac % 2;
			cpu.registers.ac = cpu.update_nz(cpu.registers.ac >> 1);
		}else{
			cpu.status.carry_flag = cpu.memory[address] % 2;
			cpu.memory[address] = cpu.update_nz(cpu.memory[address] >> 1);
		}
	},

	"sty": (cpu, address) => {
		cpu.memory[address] = cpu.registers.y;
	},

	"rts": (cpu, address) => {
		let low = cpu.pop();
		let high = cpu.pop();
		cpu.registers.pc = cpu.get16Bytes(low, high) + 1;
	},

	"pha": (cpu, address) => {
		cpu.push(cpu.registers.ac);
	},

	"jmp": (cpu, address) => {
		cpu.registers.pc = address;
	},

	"pla": (cpu, address) => {
		cpu.registers.ac = cpu.update_nz(cpu.pop());
	}

}

module.exports = instructions;