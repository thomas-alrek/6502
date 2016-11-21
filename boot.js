const fs = require('fs');
const CPU = require('./6502/cpu');

let cpu = new CPU();

cpu.load('firmware.rom');
cpu.reset();

cpu.loop();