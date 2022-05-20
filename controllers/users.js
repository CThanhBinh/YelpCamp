const User=require('../models/user')

const users={
  renderRegister:(req,res)=>{
    res.render('user/register')
  },
  register:async (req,res)=>{
        try{
          const {email,username,password}=req.body
         const user=await new User({email,username})
         const newuser=await User.register(user,password)
         req.login(newuser,err=>{
           if(err) return next(err)
            req.flash('success','Welcome to Yelp Camp ')
            res.redirect('/campgrounds')
         })
        }catch(e){
          req.flash('error',e.message)
          res.redirect("/register")
        }   
    },
    renderLogin:(req,res)=>{
      res.render("user/login")
    },
  login:(req,res)=>{
        req.flash('success','Welcome to Yelp-camp')
        const urlRedirect=req.session.returnUrl || '/campgrounds'
        delete req.session.returnUrl
         res.redirect(urlRedirect)  
    },
  logout:(req,res)=>{
        req.logout()
        res.redirect("/login")
   }
}
module.exports=users