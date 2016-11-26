"use strict";

let getResetVector = function(){
	return (this.readByte(0xFFFD) << 8) | this.readByte(0xFFFC);
}

module.exports = getResetVector;