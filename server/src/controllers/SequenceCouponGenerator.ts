import { Coupon } from '../models/coupon';
import { CouponGenerator } from './interfaces/ICouponGenerator';
import config from '../config.json'

export class SequenceCouponGenerator implements CouponGenerator {
    
    /**
     * Generate a list of sequenced coupons
     * @param len Length of the coupon's value
     * @param startValue Value of the first coupon
     * @returns a list of coupons
     */
    generateCoupons(len: number, startValue?: number): string[] {
        let arr: string[] = [];
        let counter = startValue!;
        for (let i = 0; i < config.quantity; i++) {
            arr.push(new Coupon(len, counter++).toString());
        }
        return arr;
    };

}