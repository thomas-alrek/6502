"use strict";

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

		this.memory = new Uint8Array(0);

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

		this.reset();
	}
}

CPU.prototype.push = require('./push');
CPU.prototype.pull = require('./pull');

CPU.prototype.instructions = require('./instructions');

CPU.prototype.reset = require('./reset');
CPU.prototype.getStatusFlags = require('./get-status-flags');
CPU.prototype.memoryDump = require('./memory-dump');
CPU.prototype.statusDump = require('./status-dump');

module.exports = CPU;