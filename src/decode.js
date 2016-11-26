let fetch = function(){
	if(this.registers.pc + 1 >= this.memory.length){
		this.registers.pc = 0x0;
	}
	return this.readByte(this.registers.pc++);
}

let decode = function(opcode){
	opcode = '0x' + opcode.toString(16);
	let original = opcode;
	opcode = this.opcodes[opcode];
	if(typeof opcode === 'undefined'){
        if(this.debug){
            console.log("TRAP - Illegal opcode: \n\t" + original + "\n");
            throw 'HALT';
        }else{
            opcode = this.opcodes["0xea"];
        }
	}
	return opcode;
}

let execute = function(operand){
	let instruction = this.instructions[operand.instruction];
	let address = 0x0;
	if(typeof operand.mode !== 'undefined'){
		address = this.addressingModes[operand.mode](this);
	}
	if(this.debug){
        if(this.trace.length > 11){
            this.trace = this.trace.slice(0, 11);
            this.trace[0] = "...";
            this.trace[1] = "";
        }
		this.trace.push("$" + operand.pc.toString(16) + "\t " +"(0x" + operand.opcode.toString(16) + ")\t " + operand.instruction.toUpperCase() + "\t 0x" + address.toString(16));
	}
	if(typeof this.instructions[operand.instruction] !== 'function'){
		if(this.debug){
			console.log("\u001b[2J\u001b[0;0H");
		}
		console.log('TRAP - Instruction "' + operand.instruction + '" not implemented\n');
		throw 'HALT';
	}
	try{
		instruction(this, address);
	}catch(e){
		console.log(operand.instruction);
		throw e;
	}
}

module.exports.fetch = fetch;
module.exports.decode = decode;
module.exports.execute = execute;