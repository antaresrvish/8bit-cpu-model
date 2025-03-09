interface Register {
    binary: number;
    in: boolean;
    out: boolean;
    clk: boolean;
    clr: boolean
}

interface Bus {
    binary: number;
}

interface CPU {
    registers: {
        A: Register;
        B: Register;
    };
    bus: Bus;
    clock(): void;
    reset(): void;
    output(reg: 'A' | 'B'): void;
    input(reg: 'A' | 'B'): void;
}

class processor implements CPU {
    registers: {
        A: Register;
        B: Register;
    };
    bus: Bus;
    constructor() {
        this.registers = {
            A: {
                binary: 0x00,
                in: false,
                out: false,
                clk: false,
                clr: false
            },
            B: {
                binary: 0x00,
                in: false,
                out: false,
                clk: false,
                clr: false
            }
        };
        this.bus = {
            binary: 0x00
        };
    }
    private processRegister(reg: 'A' | 'B'): void {
        const register = this.registers[reg];
        if (register.clr) {
            register.binary = 0x00;
            console.log(`REGISTER ${reg} CLR`);
            return;
        }

        if (register.clk && register.out) {
            this.bus.binary = register.binary;
            console.log(`Register ${reg} → Bus: 0b${register.binary.toString(2).padStart(8, '0')} (${register.binary})`);
        }

        if (register.clk && register.in) {
            register.binary = this.bus.binary;
            console.log(`Register ${reg} → Bus: 0b${register.binary.toString(2).padStart(8, '0')} (${register.binary})`);
        }

    }

    clock(): void {
        console.log("CLK");
        this.processRegister('A');
        this.processRegister('B');
    }

    reset(): void {
        this.registers.A.binary = 0x00;
        this.registers.B.binary = 0x00;
        this.bus.binary = 0x00;
        console.log('CLR')
    }

    output(reg: 'A' | 'B'): void {
        this.registers[reg].out = true;
        this.registers[reg].in = false;
        console.log(`STATE SET OUT REGISTER ${reg}`);
    }

    input(reg: 'A' | 'B'): void {
        this.registers[reg].in = true;
        this.registers[reg].out = false;
        console.log(`STATE SET IN REGISTER ${reg}`);
    }

    loadToBus(binary: number): void {
        this.bus.binary = binary;
        console.log(`LOAD TO BUS`);
    }

    getState(): object {
        return {
            registers: {
                A: {
                    ...this.registers.A,
                    binary: `0b${this.registers.A.binary.toString(2).padStart(8, '0')}`
                },
                B: {
                    ...this.registers.B,
                    binary: `0b${this.registers.B.binary.toString(2).padStart(8, '0')}`
                }
            },
            bus: {
                binary: `0b${this.bus.binary.toString(2).padStart(8, '0')}`
            }
        }
    }
}

const cpu = new processor();

cpu.loadToBus(0b00000001);
cpu.input('A');
cpu.clock();

console.log(cpu.getState())