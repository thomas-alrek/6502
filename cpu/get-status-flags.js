let getStatusFlags = function(){
	let p = this.status;
	return +p.carry_flag | +p.zero_flag << 1 | +p.interrupt_disable << 2 | +p.decimal_mode_flag << 3 | +p.break_command << 4 | 0x20 | +p.overflow_flag << 6 | +p.negative_flag << 7;
}

module.exports = getStatusFlags;