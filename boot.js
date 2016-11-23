const fs = require('fs');
const CPU = require('./6502/cpu');
const argv = require('yargs').argv;

let cpu = new CPU();

let firmware = 'firmware.rom';
let address = undefined;
let debug = false;
let memdump = false;

if(argv.firmware){
    firmware = argv.firmware;
}

if(argv.address){
    address = argv.address;
}

if(argv.debug){
    debug = argv.debug;
}

if(argv.memdump){
    memdump = argv.memdump;
}

cpu.load(firmware, address);
cpu.reset();

cpu.debug = debug;

//console.log(firmware + " loaded");

//cpu.memoryDump();
//cpu.registersDump();

function exitHandler(options, err) {
    if (options.cleanup){
        if(cpu.debug){
            console.log("Stack trace:\n");
            console.log("\tAddr:\tOpcode:\tInstr:\tValue:\n");
            for(let i = 0; i < cpu.trace.length; i++){
                console.log("\t " + cpu.trace[i]);
            }
            cpu.memoryDump(cpu.registers.pc - 0x80, cpu.registers.pc + 0x80);
            cpu.registersDump();
        }
        if(memdump){
            if(typeof memdump === 'string'){
                let range = memdump.split('-');
                if(range.length == 2){
                    cpu.memoryDump(parseInt(range[0]), parseInt(range[1]));
                }else{
                    cpu.memoryDump();
                }                
            }else{
                cpu.memoryDump();
            }
        }
    };
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{exit:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {cleanup: true, exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {cleanup: true, exit:true}));

cpu.loop();



		//console.log("Frequency: " + this.frequency + " HZ");
		//console.log("Cycles: " + this.counter);
