export interface CouponGenerator {
    /**
     * Generic coupon generator
     */
    generateCoupons: (len: number, startValue?: number) => Array<string>
}