const mongoose = require("mongoose");
const Product = require("./models/Product.model");
const User = require("./models/User.model");


const api = new URL('https://api.99spokes.com/v1/bikes');
api.searchParams.set('category', 'urban');
api.searchParams.set('limit', 200);
require("dotenv").config();


const images = ["https://d2yn9m4p3q9iyv.cloudfront.net/giant/2022/escape-city-disc-2/thumbs/1000/83175.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/giant/2021/escape-2-city-disc/thumbs/1000/67634.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/giant/2020/escape-2-city-disc/thumbs/1000/662d5.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/giant/2020/escape-3/thumbs/1000/badb3.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/giant/2020/escape-3-disc/thumbs/1000/2e91d.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/giant/2020/escape-2-disc/thumbs/1000/b234a.webp",
 "https://d2yn9m4p3q9iyv.cloudfront.net/giant/2020/escape-1-disc/thumbs/1000/31a14.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/giant/2019/escape-jr-24/thumbs/1000/b098b.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/giant/2019/escape-2-disc/thumbs/1000/f57dd.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/giant/2019/escape-1-disc/thumbs/1000/1592c.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/merida/2022/crossway-l-10-v/thumbs/1000/f65d1.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/merida/2022/crossway-l-300/thumbs/1000/97198.webp",
"https://d2yn9m4p3q9iyv.cloudfront.net/merida/2020/crossway-600/thumbs/1000/d0753.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/merida/2022/crossway-l-20-d/thumbs/1000/f0831.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/specialized/2023/sirrus-3.0-eq/thumbs/1000/1215c.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/specialized/2023/sirrus-2.0/thumbs/1000/8be9a.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/specialized/2023/sirrus-x-3.0-step-through-eq/thumbs/1000/c4367.webp","https://d2yn9m4p3q9iyv.cloudfront.net/specialized/2023/sirrus-x-4.0-eq/thumbs/1000/2406f.webp",
"https://d2yn9m4p3q9iyv.cloudfront.net/specialized/2023/sirrus-3.0-step-through-eq/thumbs/1000/a4342.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/specialized/2022/sirrus-2.0-step-through-eq/thumbs/1000/cfcf1.webp"]
const colors = ["red", "blue", "green", "black", "gray", "white"]
const sizes = ["S", "M", "L"]
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createSeeds() {
  try{
    // Get API response
    const response = await fetch(api.href, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    })
    const responseJSON = await response.json();
    const data = responseJSON.items;
    // Create data
    await mongoose.connect(process.env.MONGODB_URI)
    await data.forEach((product) => { Product.create({
      brand: product.maker,
      model: product.model,
      category: product.category,
      subcategory: product.subcategory,
      isEbike: product.isEbike,
      price: getRandomInt(700, 2500),
      gears: getRandomInt(7, 16),
      images: [...images].sort(() => Math.random() - 0.5).slice(0, getRandomInt(3, 3)),
      colors: [...colors].sort(() => Math.random() - 0.5).slice(0, getRandomInt(1,4)),
      sizes: [...sizes].sort(() => Math.random() - 0.5).slice(0, getRandomInt(1,3)),
      isAvailable: true,
      quantity: getRandomInt(1,50)
     })
    })
    await Product.count((err, count) => {
      if (err) console.log(err)
      else console.log("Products in db:", count)
    })
     return mongoose.connection.close()
  } catch(err) {
    console.log(err)
  }
}

createSeeds()
