"use strict";

let pop = function(){
    if((this.registers.sp + 1) > 0xFF){
        this.registers.sp = 0x00;
        let address = 0x0100 | this.registers.sp;
        return this.memory[address];
    }else{
        let address = 0x0100 | ++this.registers.sp;
        return this.memory[address];
    }
}

module.exports = pop;
