let get16Bytes = function(low, high){
    return (((low & 0xff) << 8) | (high & 0xff));
}

module.exports = get16Bytes;
