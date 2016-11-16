let getBytes16 = function(val){
    return {
        low: ((val >> 8) & 0xff),
        high: val & 0xff
    }
}

module.exports = getBytes16;
