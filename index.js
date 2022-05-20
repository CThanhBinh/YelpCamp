if(process.env.NODE_ENV!=='production'){
  require('dotenv').config()
}


const express=require('express')
const path=require('path')
const app=express()
const ejsMate=require("ejs-mate")
const ExpressError=require("./utils/ExpressError")
const methodOverride = require('method-override')
const session=require("express-session")
const flash=require('connect-flash')
const passport=require('passport')
const localStrategy=require('passport-local')
const mongoose = require('mongoose');
const User=require("./models/user")
const MongoStore = require('connect-mongo');
const dbUrl=process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp'

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
  console.log("connect Mongoose")
}


const campgroundsRoutes=require('./routes/campgrounds')
const reviewsRoutes=require('./routes/reviews')
const userRoutes=require("./routes/user")

app.engine("ejs",ejsMate)
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,"public")))
const store=MongoStore.create({
  mongoUrl:dbUrl,
  touchAfter:24*3600
})
const secret=process.env.SECRET ||"thisismysecret"
const mySecret={
  store,
  secret,
  resave:false,
  saveUninitialized:false,
  expires:Date.now()+1000*60*60*24*7,
  maxAge:1000*60*60*24*7
}
app.use(session(mySecret))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
 
app.use((req,res,next)=>{
  res.locals.currentUser=req.user
  res.locals.success=req.flash('success')
  res.locals.error=req.flash('error')
  next()
})

app.use("/",userRoutes)
app.use("/campgrounds",campgroundsRoutes)
app.use("/campgrounds/:id/reviews",reviewsRoutes)

app.get("/",(req,res)=>{
  res.render("home")
})
app.get("*",(req,res,next)=>{
  next(new ExpressError("Page not Found",404))
})

app.use((err,req,res,next)=>{
    const{status=500}=err
    if(!err.message) err.message="smt went wrong"
    res.status(status).render("error",{err})
})

const port=process.env.PORT || 3000
app.listen(port,()=>{
  console.log(`SERVER RUN IN PORT ${port}`)
})
