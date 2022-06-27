import { CouponGenerator } from './interfaces/ICouponGenerator';

export class CouponGeneratorService {
    genService: CouponGenerator

    /**
     * Coupon Generator Service
     * @param generator Specific generator
     */
    constructor (generator: CouponGenerator) {
        this.genService = generator
    }

    generate(len: number, startValue?: number): string[] {
        return this.genService.generateCoupons(len, startValue);
    }
}