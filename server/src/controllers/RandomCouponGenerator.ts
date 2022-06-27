import { Coupon } from '../models/coupon';
import { CouponGenerator } from './interfaces/ICouponGenerator';
import config from '../config.json'

export class RandomCouponGenerator implements CouponGenerator {
    
    /**
     * Generate a list of randomized coupons
     * @param len Length of the coupon's value
     * @returns a list of coupons
     */
    generateCoupons(len: number): string[] {
        let arr: string[] = [];
        for (let i = 0; i < config.quantity; i++) {
            arr.push(new Coupon(len, Math.floor(Math.random() * (10**(len))) + 1).toString())
        }
        return arr;
    };

}