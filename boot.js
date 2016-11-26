const fs = require('fs');
const CPU = require('./src/6502');
const argv = require('yargs').argv;

let firmware = './example/test.bin';
let address = undefined;
let debug = true;
let memdump = false;

let Apple1ROM = require('./hardware/rom/apple1-rom');
let C64ROM = require('./hardware/rom/test-rom');
let rom = new C64ROM();
//let rom = new Apple1ROM();

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

function exitHandler(options, err) {
    if (options.cleanup){
        if(cpu.debug){
            console.log("\nStack trace:\n");
            for(let i = 0; i < cpu.trace.length; i++){
                console.log("\t " + cpu.trace[i]);
            }
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

process.on('exit', exitHandler.bind(null,{exit:true}));
process.on('SIGINT', exitHandler.bind(null, {cleanup: true, exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {cleanup: true, exit:true}));

let cpu = new CPU();
/*cpu.load(firmware, address);*/
cpu.attach(rom);
cpu.reset();
cpu.debug = debug;
cpu.loop();