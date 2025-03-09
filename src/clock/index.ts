interface Iclock {
    hz: number;
    hlt: boolean;
    clk: boolean;
    clkInv: boolean;
}

class clock implements Iclock {
    hz: number;
    hlt: boolean;
    clk: boolean;

    constructor(hz: number, hlt:boolean, clk:boolean) {
        this.hz = hz;
        this.hlt = hlt;
        this.clk = clk;
    }

    get clkData(): boolean {
        if (this.hz >= 1000 || this.hz <= 0) {
            return this.clk;
        }
        let secs = 1/this.hz;
        let set = false;
        return set; //just for now.
    }

    get clkInv(): boolean {
        return !this.clk;
    }
}