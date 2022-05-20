const express=require('express')
const router=express.Router()
const ExpressError=require("../utils/ExpressError")
const catchAsync=require("../utils/catchAsync")
const {isLoggedIn,validateCampground}=require("../middleware")
const campgrounds=require('../controllers/campgrounds')
const multer=require('multer')
const {storage}=require('../cloudinary/index')
const upload=multer({storage})

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(upload.array('image'),validateCampground,catchAsync(campgrounds.createCampground))

router.get("/new",isLoggedIn,campgrounds.newCampground)

router.route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn,upload.array('image'),validateCampground,catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn,catchAsync(campgrounds.deleteCampground))

router.get("/:id/edit",isLoggedIn,catchAsync(campgrounds.editCampground))


module.exports=router