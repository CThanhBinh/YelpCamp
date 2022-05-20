const Review=require('../models/review')
const Campground=require("../models/campground")

const reviews={
    createReview:async(req,res)=>{
        const campground=await Campground.findById(req.params.id)
        const review=new Review(req.body)
        review.author=req.user
        campground.reviews.push(review)
        await review.save()
        await campground.save()
        req.flash('success','Thank for review!')
        res.redirect(`/campgrounds/${campground._id}`)
      },
    deleteReview:async(req,res)=>{
        const{id,idReview}=req.params
        await Campground.findByIdAndUpdate(id,{$pull:{reviews:idReview}})
        await Review.findByIdAndDelete(idReview)
        req.flash('success','delete complete')
        res.redirect(`/campgrounds/${id}`)
      }
}
module.exports=reviews