"use strict";

Number.prototype.toByte = require('./prototypes/number').toByte;
Number.prototype.signed = require('./prototypes/number').signed;
Number.prototype.between = require('./prototypes/number').between;

class CPU {
	constructor(options){

		let cpu = this;

		let _carry_flag = null;
		let _zero_flag = null;
		let _interrupt_flag = null;
		let _decimal_mode_flag = null;
		let _break_flag = null;
		let _unused_flag = null;
		let _overflow_flag = null;
		let _sign_flag = null;

		this.debug = false;
		this.trace = [];
		this.hardware = [];
		this.memory = new Uint8Array(0x10000);

		this.count = 0;

		this.registers = {
			pc: null,
			sp: null,
			ac: null,
			x: null,
			y: null,
			status: null
		}

		this.status = {
			set carry_flag(flag) {
				_carry_flag = flag; 
				cpu.registers.status = cpu.getStatusFlags() 
			},
			get carry_flag() {
				return _carry_flag;
			},
			set zero_flag(flag) {
				_zero_flag = flag; 
				cpu.registers.status = cpu.getStatusFlags();
			},
			get zero_flag() {
				return _zero_flag;
			},
			set interrupt_flag(flag) {
				_interrupt_flag = flag; 
				cpu.registers.status = cpu.getStatusFlags();
			},
			get interrupt_flag() {
				return _interrupt_flag;
			},
			set decimal_mode_flag(flag) {
				_decimal_mode_flag = flag; 
				cpu.registers.status = cpu.getStatusFlags();
			},
			get decimal_mode_flag() {
				return _decimal_mode_flag;
			},
			set break_flag(flag) {
				_break_flag = flag; 
				cpu.registers.status = cpu.getStatusFlags();
			},
			get break_flag() {
				return _break_flag;
			},
			set unused_flag(flag) {
				_unused_flag = true; 
			},
			get unused_flag() {
				return _unused_flag;
			},
			set overflow_flag(flag) {
				_overflow_flag = flag; 
				cpu.registers.status = cpu.getStatusFlags();
			},
			get overflow_flag() {
				return _overflow_flag;
			},
			set sign_flag(flag) {
				_sign_flag = flag; 
				cpu.registers.status = cpu.getStatusFlags();
			},
			get sign_flag() {
				return _sign_flag;
			}
		}

		this.interrupt = null;

		this.addressing_mode = {
			zero_page: 0,
			indexed_zero_page_x: 1,
			indexed_zero_page_y: 2,
			absolute: 3,
			indexed_absolute_x: 4,
			indexed_absolute_y: 5,
			implied: 6,
			accumulator: 7,
			immediate: 8,
			relative: 9,
			indexed_indirect: 10,
			indirect_indexed: 11,
			indirect: 12
		}
	}
}

CPU.prototype.tick = function(){
	let pc = this.registers.pc;
	var opcode = this.fetch();
	var instruction = this.decode(opcode);
	instruction.opcode = opcode;
	instruction.pc = pc;
	this.execute(instruction);
}

CPU.prototype.loop = function(callback){
	if(this.debug){
		setTimeout(() =>{
			this.tick();
			if(typeof callback === 'function'){
				callback();
			}
			this.loop(callback);
		}, 0);
	}else{
		while(1){
			if(typeof callback === 'function'){
				callback();
			}
			this.tick();
		}
	}
}

/* memory mapped virtual hardware */
CPU.prototype.attach = require('./hardware/attach');

/* memory functions */
CPU.prototype.addressingModes = require('./memory/addressing-modes');
CPU.prototype.load = require('./memory/load');
CPU.prototype.getBytes16 = require('./memory/get-bytes-16');
CPU.prototype.get16Bytes = require('./memory/get-16-bytes');
CPU.prototype.readByte = require('./memory/read-byte');
CPU.prototype.writeByte = require('./memory/write-byte');
CPU.prototype.readWord = require('./memory/read-word');
CPU.prototype.writeWord = require('./memory/write-word');

/* stack functions */
CPU.prototype.push = require('./stack/push');
CPU.prototype.pop = require('./stack/pop');

/* fetch - decode - execute - loop */
CPU.prototype.instructions = require('./instructions');
CPU.prototype.opcodes = require('./opcodes');
CPU.prototype.fetch = require('./decode').fetch;
CPU.prototype.decode = require('./decode').decode;
CPU.prototype.execute = require('./decode').execute;

/* vectors */
CPU.prototype.getResetVector = require('./vectors/rst');
CPU.prototype.getBreakVector = require('./vectors/brk');
CPU.prototype.getIRQVector = require('./vectors/irq');
CPU.prototype.getNMIVector = require('./vectors/nmi');

/* registers */
CPU.prototype.update_nz = require('./logic/update-nz');
CPU.prototype.update_nzc = require('./logic/update-nzc');
CPU.prototype.getStatusFlags = require('./logic/get-status-flags');

/* helper logic */
CPU.prototype.reset = require('./logic/reset');

/* debugging */
CPU.prototype.memoryDump = require('./debug/memory-dump');
CPU.prototype.registersDump = require('./debug/register-dump');
CPU.prototype.stackDump = require('./debug/stack-dump');

module.exports = CPU;
