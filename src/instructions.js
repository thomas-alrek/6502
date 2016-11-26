"use strict";

let instructions = {

	"cli": (cpu) => {
		cpu.status.interrupt_flag = false
	},

	"cld": (cpu) => {
		cpu.status.decimal_flag = false;
	},

	"nop": (cpu) => {},

	"ora": (cpu, address) => {
		let ac = cpu.registers.ac;
		let value = cpu.readByte(address);
		cpu.registers.ac = cpu.update_nz(ac | value);
	},

	"bpl": (cpu, address) => {
		if(!cpu.status.sign_flag){
			cpu.registers.pc = address;
		}
	},

	"jsr": (cpu, address) => {
		let word = cpu.getBytes16(cpu.registers.pc - 1);
		cpu.push(word.high);
		cpu.push(word.low);
		cpu.registers.pc = address;
	},

	"eor": (cpu, address) => {
		let ac = cpu.registers.ac;
		let value = cpu.readByte(address);
		cpu.registers.ac = cpu.update_nz(ac ^ value);
	},

	"and": (cpu, address) => {
		let ac = cpu.registers.ac;
		let value = cpu.readByte(address);
		cpu.registers.ac = cpu.update_nz(ac & value);
	},

	"sta": (cpu, address) => {
		cpu.writeByte(address, cpu.registers.ac);
	},

	"adc": (cpu, address) => {
		let ac = cpu.registers.ac;
		let ac_signed = ac.signed();
		let val = cpu.readByte(address);
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
			cpu.status.carry_flag = cpu.readByte(address) % 2;
			cpu.writeByte(address, cpu.update_nz(cpu.readByte(address) >> 1));
		}
	},

	"sty": (cpu, address) => {
		cpu.writeByte(cpu.registers.y);
	},

	"stx": (cpu, address) => {
		cpu.writeByte(cpu.registers.x);
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
	},

	"ldy": (cpu, address) => {
		cpu.registers.y = cpu.update_nz(address);
	},

	"lda": (cpu, address) => {
		cpu.registers.ac = cpu.update_nz(address);
	},

	"cmp": (cpu, address) => {
		let result = cpu.registers.accumulator - address;
		cpu.status.carry_flag = (result >= 0) ? true : false;
		cpu.update_nz(result);
	},

	"beq": (cpu, address) => {
		if(cpu.status.zero_flag){
			cpu.registers.pc = address;
		}
	},

	"iny": (cpu, address) => {
		cpu.registers.y = cpu.update_nz(cpu.registers.y + 1);
	},

	"inc": (cpu, address) => {
		cpu.writeByte(address, cpu.update_nz(cpu.readByte(address) + 1));
	},

	"bit": (cpu, address) => {
		let val = cpu.readByte(address);
		cpu.status.sign_flag = ((val >> 7) % 2);
		cpu.status.overflow_flag = ((val >> 6) % 2);
		cpu.status.zero_flag = ((cpu.registers.ac & val) == 0) ? true : false;
	},

	"bmi": (cpu, address) => {
        if(cpu.status.sign_flag){
			cpu.registers.pc = address;
		}
	},

	"bne": (cpu, address) => {
		if(!cpu.status.zero_flag){
			cpu.registers.pc = address;
		}
	},

	"ldx": (cpu, address) => {
		cpu.registers.x  = cpu.update_nz(cpu.readByte(address));
	},

	"txs": (cpu) => {
		cpu.registers.sp = cpu.registers.x;
	},

	"dey": (cpu) => {
		cpu.registers.y = cpu.update_nz(cpu.registers.y - 1);
	},

	"brk": (cpu) => {
		let word = cpu.getBytes16(cpu.registers.pc + 1);
		cpu.push(word.high);
		cpu.push(word.low);
		cpu.registers.pc = (cpu.readByte(0xFFFE) + cpu.readByte(0xFFFF) << 8);
	},

	"rol": (cpu, address) => {
		if(typeof address === 'undefined'){
			let val = cpu.registers.ac << 1;
			if(cpu.status.carry_flag){
				val = val | 0x01;
			}
			cpu.registers.ac = cpu.update_nzc(val);
		}else{
			let val = cpu.readByte(address) << 1;
			if(cpu.status.carry_flag){
				val = val | 0x01;
			}
			cpu.writeByte(cpu.update_nzc(val));
		}
	}

}

module.exports = instructions;