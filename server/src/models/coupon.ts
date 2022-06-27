interface ICoupon {
    readonly value: string
}

export class Coupon implements ICoupon {
    readonly value: string;

    /**
     * A class that represents a coupon
     * @param len Length of the coupon value; we could set a length of 6 and a value of 22 and the value would be 000022
     * @param val The actual value of the current coupon
     */
    constructor (len: number, val: number) {
        if (len < 1 || val < 1) {
            throw new Error("Params cannot be 0 or empty string");
        }
        if (len < val.toString().length) {
            throw new Error("Length cannot be lesser than value length");
        }
        this.value = this.formatValue(len, val);
    }

    /**
     * 
     * @param value The actual value of the coupon
     * @returns the formatted value
     */
    private formatValue(len:number, value: number): string {
        let formatted = "";
        let aux = value.toString().length;
        while (aux < len) {
            formatted += "0";
            aux++;
        }
        formatted += value;
        return formatted;
    }

    /**
     * @returns the value as a string
     */
    toString() {
        return this.value;
    }
}