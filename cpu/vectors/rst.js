"use strict";

let getResetVector = function(){
	return (this.memory[0xFFFD] << 8) | this.memory[0xFFFC];
}

module.exports = getResetVector;