let opcodes = {
    "0x00": {instruction: 'brk'},
    "0x01": {instruction: 'ora', mode: 'indirectX'},
    "0x05": {instruction: 'ora', mode: 'zeroPage'},
    "0x06": {instruction: 'asl', mode: 'zeroPage'},
    "0x08": {instruction: 'php'},
    "0x09": {instruction: 'ora', mode: 'immediate'},
    "0x0A": {instruction: 'asl'},
    "0x0D": {instruction: 'ora', mode: 'absolute'},
    "0x0E": {instruction: 'asl', mode: 'absolute'},
    "0x10": {instruction: 'bpl', mode: 'relative'},
    "0x11": {instruction: 'ora', mode: 'indirectY'},
    "0x15": {instruction: 'ora', mode: 'zeroPageX'},
    "0x16": {instruction: 'asl', mode: 'zeroPageX'},
    "0x18": {instruction: 'clc'},
    "0x19": {instruction: 'ora', mode: 'absoluteY'},
    "0x1D": {instruction: 'ora', mode: 'absoluteX'},
    "0x1E": {instruction: 'asl', mode: 'absoluteX'},
    "0x20": {instruction: 'jsr', mode: 'absolute'},
    "0x21": {instruction: 'and', mode: 'indirectX'},
    "0x24": {instruction: 'bit', mode: 'zeroPage'},
    "0x25": {instruction: 'and', mode: 'zeroPage'},
    "0x26": {instruction: 'rol', mode: 'zeroPage'},
    "0x28": {instruction: 'plp'},
    "0x29": {instruction: 'and', mode: 'immediate'},
    "0x2A": {instruction: 'rol'},
    "0x2C": {instruction: 'bit', mode: 'absolute'},
    "0x2D": {instruction: 'and', mode: 'absolute'},
    "0x2E": {instruction: 'rol', mode: 'absolute'},
    "0x30": {instruction: 'bmi', mode: 'relative'},
    "0x31": {instruction: 'and', mode: 'indirectY'},
    "0x35": {instruction: 'and', mode: 'zeroPageX'},
    "0x36": {instruction: 'rol', mode: 'zeroPageX'},
    "0x38": {instruction: 'sec'},
    "0x39": {instruction: 'and', mode: 'absoluteY'},
    "0x3D": {instruction: 'and', mode: 'absoluteX'},
    "0x3E": {instruction: 'rol', mode: 'absoluteX'},
    "0x40": {instruction: 'rti'},
    "0x41": {instruction: 'eor', mode: 'indirectX'},
    "0x45": {instruction: 'eor', mode: 'zeroPage'},
    "0x46": {instruction: 'lsr', mode: 'zeroPage'},
    "0x48": {instruction: 'pha'},
    "0x49": {instruction: 'eor', mode: 'immediate'},
    "0x4A": {instruction: 'lsr'},
    "0x4C": {instruction: 'jmp', mode: 'absolute'},
    "0x4D": {instruction: 'eor', mode: 'absolute'},
    "0x4E": {instruction: 'lsr', mode: 'absolute'},
    "0x50": {instruction: 'bvc', mode: 'relative'},
    "0x51": {instruction: 'eor', mode: 'indirectY'},
    "0x55": {instruction: 'eor', mode: 'zeroPageX'},
    "0x56": {instruction: 'lsr', mode: 'zeroPageX'},
    "0x58": {instruction: 'cli'},
    "0x59": {instruction: 'eor', mode: 'absoluteY'},
    "0x5D": {instruction: 'eor', mode: 'absoluteX'},
    "0x5E": {instruction: 'lsr', mode: 'absoluteX'},
    "0x60": {instruction: 'rts'},
    "0x61": {instruction: 'adc', mode: 'indirectX'},
    "0x65": {instruction: 'adc', mode: 'zeroPage'},
    "0x66": {instruction: 'ror', mode: 'zeroPage'},
    "0x68": {instruction: 'pla'},
    "0x69": {instruction: 'adc', mode: 'immediate'},
    "0x6A": {instruction: 'ror'},
    "0x6C": {instruction: 'jmp', mode: 'indirect'},
    "0x6D": {instruction: 'adc', mode: 'absolute'},
    "0x6E": {instruction: 'ror', mode: 'absolute'},
    "0x70": {instruction: 'bvs', mode: 'relative'},
    "0x71": {instruction: 'adc', mode: 'indirectY'},
    "0x75": {instruction: 'adc', mode: 'zeroPageX'},
    "0x76": {instruction: 'ror', mode: 'zeroPageX'},
    "0x78": {instruction: 'sei'},
    "0x79": {instruction: 'adc', mode: 'absoluteY'},
    "0x7D": {instruction: 'adc', mode: 'absoluteX'},
    "0x7E": {instruction: 'ror', mode: 'absoluteX'},
    "0x81": {instruction: 'sta', mode: 'indirectX'},
    "0x84": {instruction: 'sty', mode: 'zeroPage'},
    "0x85": {instruction: 'sta', mode: 'zeroPage'},
    "0x86": {instruction: 'stx', mode: 'zeroPage'},
    "0x88": {instruction: 'dey'},
    "0x8A": {instruction: 'txa'},
    "0x8C": {instruction: 'sty', mode: 'absolute'},
    "0x8D": {instruction: 'sta', mode: 'absolute'},
    "0x8E": {instruction: 'stx', mode: 'absolute'},
    "0x90": {instruction: 'bcc', mode: 'relative'},
    "0x91": {instruction: 'sta', mode: 'indirectY'},
    "0x94": {instruction: 'sty', mode: 'zeroPageX'},
    "0x95": {instruction: 'sta', mode: 'zeroPageX'},
    "0x96": {instruction: 'stx', mode: 'zeroPageY'},
    "0x98": {instruction: 'tya'},
    "0x99": {instruction: 'sta', mode: 'absoluteY'},
    "0x9A": {instruction: 'txs'},
    "0x9D": {instruction: 'sta', mode: 'absoluteX'},
    "0xA0": {instruction: 'ldy', mode: 'immediate'},
    "0xA1": {instruction: 'lda', mode: 'indirectX'},
    "0xA2": {instruction: 'ldx', mode: 'immediate'},
    "0xA4": {instruction: 'ldy', mode: 'zeroPage'},
    "0xA5": {instruction: 'lda', mode: 'zeroPage'},
    "0xA6": {instruction: 'ldx', mode: 'zeroPage'},
    "0xA8": {instruction: 'tay'},
    "0xA9": {instruction: 'lda', mode: 'immediate'},
    "0xAA": {instruction: 'tax'},
    "0xAC": {instruction: 'ldy', mode: 'absolute'},
    "0xAD": {instruction: 'lda', mode: 'absolute'},
    "0xAE": {instruction: 'ldx', mode: 'absolute'},
    "0xB0": {instruction: 'bcs', mode: 'relative'},
    "0xB1": {instruction: 'lda', mode: 'indirectY'},
    "0xB4": {instruction: 'ldy', mode: 'zeroPageX'},
    "0xB5": {instruction: 'lda', mode: 'zeroPageX'},
    "0xB6": {instruction: 'ldx', mode: 'zeroPageY'},
    "0xB8": {instruction: 'clv'},
    "0xB9": {instruction: 'lda', mode: 'absoluteY'},
    "0xBA": {instruction: 'tsx'},
    "0xBC": {instruction: 'ldy', mode: 'absoluteX'},
    "0xBD": {instruction: 'lda', mode: 'absoluteX'},
    "0xBE": {instruction: 'ldx', mode: 'absoluteY'},
    "0xC0": {instruction: 'cpy', mode: 'immediate'},
    "0xC1": {instruction: 'cmp', mode: 'indirectX'},
    "0xC4": {instruction: 'cpy', mode: 'zeroPage'},
    "0xC5": {instruction: 'cmp', mode: 'zeroPage'},
    "0xC6": {instruction: 'dec', mode: 'zeroPage'},
    "0xC8": {instruction: 'iny'},
    "0xC9": {instruction: 'cmp', mode: 'immediate'},
    "0xCA": {instruction: 'dex'},
    "0xCC": {instruction: 'cpy', mode: 'absolute'},
    "0xCD": {instruction: 'cmp', mode: 'absolute'},
    "0xCE": {instruction: 'dec', mode: 'absolute'},
    "0xD0": {instruction: 'bne', mode: 'relative'},
    "0xD1": {instruction: 'cmp', mode: 'indirectY'},
    "0xD5": {instruction: 'cmp', mode: 'zeroPageX'},
    "0xD6": {instruction: 'dec', mode: 'zeroPageX'},
    "0xD8": {instruction: 'cld'},
    "0xD9": {instruction: 'cmp', mode: 'absoluteY'},
    "0xDD": {instruction: 'cmp', mode: 'absoluteX'},
    "0xDE": {instruction: 'dec', mode: 'absoluteX'},
    "0xE0": {instruction: 'cpx', mode: 'immediate'},
    "0xE1": {instruction: 'sbc', mode: 'indirectX'},
    "0xE4": {instruction: 'cpx', mode: 'zeroPage'},
    "0xE5": {instruction: 'sbc', mode: 'zeroPage'},
    "0xE6": {instruction: 'inc', mode: 'zeroPage'},
    "0xE8": {instruction: 'inx'},
    "0xE9": {instruction: 'sbc', mode: 'immediate'},
    "0xEA": {instruction: 'nop'},
    "0xEC": {instruction: 'cpx', mode: 'absolute'},
    "0xED": {instruction: 'sbc', mode: 'absolute'},
    "0xEE": {instruction: 'inc', mode: 'absolute'},
    "0xF0": {instruction: 'beq', mode: 'relative'},
    "0xF1": {instruction: 'sbc', mode: 'indirectY'},
    "0xF5": {instruction: 'sbc', mode: 'zeroPageX'},
    "0xF6": {instruction: 'inc', mode: 'zeroPageX'},
    "0xF8": {instruction: 'sed'},
    "0xF9": {instruction: 'sbc', mode: 'absoluteY'},
    "0xFD": {instruction: 'sbc', mode: 'absoluteX'},
    "0xFE": {instruction: 'inc', mode: 'absoluteX'},
}

module.exports = opcodes;