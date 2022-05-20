const express=require('express')
const router=express.Router({mergeParams:true})
const ExpressError=require("../utils/ExpressError")
const catchAsync=require("../utils/catchAsync")
const {isLoggedIn,isReviewAuthor}=require("../middleware")
const reviews=require('../controllers/reviews')
const {validateReview}=require("../middleware")

router.post("/",isLoggedIn,validateReview,catchAsync(reviews.createReview))
router.delete("/:idReview",isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))

module.exports=router