const fs = require('fs');
const argv = require('yargs').argv;

/* hardware */
const CPU = require('../../src/6502');
const AppleROM = require('./hardware/rom/rom');
const PIA6821 = require('./hardware/pia6821/pia6821');

/* options */
let debug = true;

if(argv.debug){
    debug = argv.debug;
}

let cpu = new CPU();
let rom = new AppleROM();
let pia6821 = new PIA6821();

cpu.debug = debug;

cpu.attach(rom);
cpu.attach(pia6821);

let perfStart = Date.now();

cpu.reset();
cpu.loop();

function exitHandler(){
    let perfEnd = Date.now();
    let time = perfEnd - perfStart;
    console.log("Executed " + cpu.count + " instructions in " + (time/1000).toFixed(2) + " seconds" );
    console.log((cpu.count/(time/1000)).toFixed(2) + " instructions per second");
    process.exit();
}

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('uncaughtException', exitHandler);