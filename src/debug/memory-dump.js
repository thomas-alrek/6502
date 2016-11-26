"use strict";

let memoryDump = function(_start, _end){

	let start = 0;
	let end = this.memory.length;

	if(typeof _start !== 'undefined' && typeof _end !== 'undefined'){
		start = _start;
		if(_end > _start){
			end = _end;
		}
		if(start < 0){
			start = 0;
			end = (_end - _start) + _end;
		}
	}

	let padding = '';
	for(let x = 0; x < this.memory.length.toString(16).length; x++){
		padding += '0';
	}
	console.log('\nMemory dump ' + (end - start) + ' byte(s)\n');
	for(let i = start; i < end; i += 16){
	let output = '0x' + (padding + i.toString(16)).substring(i.toString(16).length) + " | ";
	let str = '';
		for(let j = 0; j < 16; j++){
			if(typeof this.memory[i + j] === 'undefined'){
				output += '   ';
				str += ' ';
				continue;
			}
			output += (Array(0xFF.toString(16).length + 1).join("0") + this.readByte(i + j).toString(16)).substring(this.readByte(i + j).toString(16).length) + ' ';
			if(this.memory[i+j] <= 31){
				str += '.';
			}else{
				str += String.fromCharCode(this.memory[i+j]);
			}
		}
		output += "| " + str;
		console.log(output);
	};
	console.log("");
};

module.exports = memoryDump;