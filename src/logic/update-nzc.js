let update_nzc = function(value){
	this.status.carry_flag = (value > 0xFF) ? true : false;
	return this.update_nz(value);
}

module.exports = update_nzc;