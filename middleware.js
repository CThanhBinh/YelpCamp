const Review = require("./models/review")
const {schema}=require("./validate")
const {reviewSchema}=require("./validate")
const ExpressError=require("./utils/ExpressError")




module.exports.isLoggedIn=(req,res,next)=>{
 if(!req.isAuthenticated()){
     req.session.returnUrl=req.originalUrl
     req.flash('error','You must be signed in')
     return res.redirect("/login")
 }
    next()
}
module.exports.isReviewAuthor=async(req,res,next)=>{
    const{id,idReview}=req.params
    const review=await Review.findById(idReview)
 if(!review.author.equals(req.user._id)){
     req.flash('error','You must be signed in')
     return res.redirect(`campgrounds/${id}`)
 }
    next()
}
module.exports.validateCampground=(req,res,next)=>{
    const {error}=schema.validate(req.body)
    if(error){
      const msg=error.details.map(ms=>ms.message)
      throw new ExpressError(msg,400)
    }else{
      next()
    }
  }
  module.exports.validateReview=(req,res,next)=>{
    const{error}=reviewSchema.validate(req.body)
    if(error){
      const msg=error.details.map(ms=>ms.message)
      throw new ExpressError(msg,400)
    }else{
      next()
    }
  }
