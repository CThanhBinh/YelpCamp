const Campground=require('../models/campground')
const {cloudinary}=require("../cloudinary/index")

const campgrounds={
    index:async (req,res)=>{
        const campgrounds=await Campground.find({})
       res.render("campgrounds/index",{campgrounds})
     },
     newCampground:(req,res)=>{
        res.render("campgrounds/new")
    },
    showCampground:async(req,res)=>{
        const {id}=req.params
        const campground=await Campground.findById(id).populate('reviews').populate('author').populate({path:'reviews',populate:'author'})
        if(!campground){
          req.flash('error','campground is not defind')
          return res.redirect('/campgrounds')
        }
        res.render("campgrounds/show",{campground})
    },
    createCampground:async(req,res,next)=>{
      const campground= new Campground(req.body)
      campground.images=req.files.map(file=>({url:file.path,filename:file.filename}))
      campground.author=req.user._id
      await campground.save()
      req.flash('success','success create a new Campground!!')
      res.redirect(`/campgrounds/${campground._id}`)
      },
    editCampground:async(req,res)=>{
        const{id}=req.params
        const campground=await Campground.findById(id)
        if(!campground.author.equals(req.user._id)){
           req.flash('error','you are not author')
           return res.redirect(`/campgrounds/${id}`)
    }
        res.render('campgrounds/edit',{campground})
      },
    updateCampground:async(req,res)=>{
        const {id}=req.params
        const campground=await Campground.findByIdAndUpdate(id,req.body)
        const img=req.files.map(file=>({url:file.path,filename:file.filename}))
        campground.images.push(...img)
        await campground.save()
        if(req.body.deleteImage){
          for(let filename of req.body.deleteImage){
              await cloudinary.uploader.destroy(filename)
          }
        await campground.updateOne({$pull:{images:{filename:{$in : req.body.deleteImage}}}})
        }
        req.flash('success',' updated')
        res.redirect(`/campgrounds/${id}`)
      },
    deleteCampground:async(req,res)=>{
        const{id}=req.params
         await Campground.findByIdAndDelete(id)
         req.flash('success','deleted')
         res.redirect("/campgrounds")
    }

}
module.exports=campgrounds