const mongoose = require('mongoose');
const Campground=require("../models/campground")
const cities=require("./cities")
const {descriptors,places}=require("./seedHelpers")
const axios=require('axios')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/yelp-camp');
  console.log("connect Mongoose")
}

// const sample=array=>array[Math.floor(Math.random()*array.length)]
// const seedDB=async()=>{
//     // await Campground.deleteMany({})
//     for(let i=0;i<50;i++){
//       //  const random1000= cities[Math.floor(Math.random()*1000)]
//       //  const price=Math.floor(Math.random()*20)+10
//        const camp= new Campground({
//          location: `${random1000.city},${random1000.state}`,
//          title:`${sample(descriptors)} ${sample(places)}`,
//          image:"https://random.imagecdn.app/500/150",
//          description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit omnis fuga natus doloremque magnam quibusdam odit quos sint nesciunt, consequatur ea voluptate ab autem voluptatibus, nostrum earum? A, vero harum.",
//          price
//         })
//         await camp.save()  
//     }
// }
// seedDB().then(()=>mongoose.connection.close())
