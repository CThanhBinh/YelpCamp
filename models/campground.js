const mongoose = require('mongoose');
const Schema= mongoose.Schema
const Review=require("./review")

const reSize=new Schema({
  url:String,
  filename:String
})
reSize.virtual('newUrl').get(function(){
  return this.url.replace('upload','upload/w_200')
})
const CampgroundSchema=new Schema({
  title:String,
  price:Number,
  images:[reSize],
  description:String,
  location:String,
  author:{type:Schema.Types.ObjectId,ref:'User'},
  reviews:[{type:Schema.Types.ObjectId,ref:'Review'}]
})

CampgroundSchema.post('findOneAndDelete',async(camp)=>{
  if(camp.reviews.length){
     const reviews=await Review.deleteMany({_id:{$in:camp.reviews}})
     console.log(reviews)
  }
})
module.exports=mongoose.model("Campground",CampgroundSchema)

