let update_nz = function(value){
	value = value % 0x100;
	this.status.zero_flag = (value == 0) ? true : false;
	this.status.sign_flag = (value & 0x80 != 0) ? true: false;
	return value;
}

module.exports = update_nz;