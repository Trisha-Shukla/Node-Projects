import { Coupon } from "../models/coupon.js";

export async function createCoupon(req,res){
    try {
        const { name, code, discountPercentage, minPrice } = req.body;
        const userId = req.user._id;
    
        //coupon with same code exists
        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
          return res.status(400).json({ message: "Coupon code already exists" });
        }
    
        //save coupon
        const coupon = new Coupon({
          name,
          code,
          minPrice,
          discountPercentage,
          seller: userId,
        });
    
        await coupon.save();
        res.status(201).json({ message: "Coupon created successfully", coupon });
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error Adding Coupon" });
      }
}
export async function getCoupon(req,res){

}