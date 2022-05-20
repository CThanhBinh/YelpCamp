const joi=require("joi")

module.exports.schema=joi.object({
    title:joi.string().required(),
    location:joi.string().required(),
    // images:joi.string().required(),
    price:joi.number().required().min(0),
    description:joi.string().required(),
    deleteImage:joi.array()
  });

module.exports.reviewSchema=joi.object({
  body:joi.string().required(),
  rating:joi.number().min(1).max(5).required()
})
