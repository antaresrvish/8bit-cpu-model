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

interface bus {
    data: number;
}

let bus: bus = {
    data: 0b00000000
}

const registerIn = (reg: register, data: number): register => {
    if(reg.clr) {
        reg.data = 0b00000000;
        console.log(1)
        return reg;
    }

    if(reg.clk && reg.in) {
        reg.data = data;
        console.log(2)
    }
    
    if(reg.clk && reg.out) {
        bus.data = reg.data;
        console.log(3)
    }

    return reg;
};

let aRegister: register = {
    data: 0b00000001,
    out: false,
    in: true,
    clk: true,
    clr: false,
};

let bRegister: register = {
    data: 0b00000010,
    out: true,
    in: false,
    clk: true,
    clr: false
}
console.log('aRegister',aRegister)
console.log('bRegister',bRegister)
aRegister = registerIn(aRegister, 0b00001111);
bRegister = registerIn(bRegister, 0b00001111);
console.log('bus',bus);
