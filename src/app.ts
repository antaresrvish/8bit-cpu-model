interface cpu {
    a: register;
    b: register;
};

interface register {
    data: number;
    out: boolean;
    in: boolean;
    clk: boolean;
    clr: boolean;
};

const registerIn = (reg: register, input: number): register => {
    if(reg.clr) {
        reg.data = 0b00000000;
        return reg;
    }

    if(reg.clk && reg.in) {
        reg.data = input;
    }

    return reg;
};

let aRegister: register = {
    data: 0b00000000,
    out: false,
    in: true,
    clk: true,
    clr: false,
};
console.log(aRegister)
aRegister = registerIn(aRegister, 0b00001111);
console.log(aRegister)