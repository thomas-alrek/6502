module.exports.toByte = function(){
	let val = this;
	if(val > 0xff){
		val = 0xff;
	}
	if(val < 0x0){
		val = (0xff - (+val)) % 0xff;
	}
	return val;
}

module.exports.signed = function(){
	let val = this;
	if(val > 0x7F){
		val  = val - 0x100;
	}
	return val;
}

module.exports.between = function(a, b) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return this > min && this < max;
};