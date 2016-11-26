let attach = function(virtual_hardware){
	if(virtual_hardware.map.start < 0){
		throw RangeError("Virtual hardware memory map out of range");
	}
	if(virtual_hardware.map.start > this.memory.length || virtual_hardware.map.end > this.memory.length){
		throw RangeError("Virtual hardware memory map out of range");
	}
	if(virtual_hardware.map.end < virtual_hardware.map.start){
		throw RangeError("Virtual hardware memory map out of range");
	}
	if(this.hardware.find(hardware => {
		if(hardware.map.start === virtual_hardware.map.start){
			return true;
		}
		if(hardware.map.end === virtual_hardware.map.end){
			return true;
		}
		if(hardware.map.start.between(virtual_hardware.map.start, virtual_hardware.map.end)){
			return true;
		}
		if(hardware.map.end.between(virtual_hardware.map.start, virtual_hardware.map.end)){
			return true;
		}
		return false;
	})){
		throw RangeError("Virtual hardware memory map already occupied");
	}
	this.hardware.push(virtual_hardware);
}

module.exports = attach;