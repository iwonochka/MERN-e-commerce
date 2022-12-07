const mongoose = require("mongoose");
const Product = require("./models/Product.model");
const User = require("./models/User.model");


const api = new URL('https://api.99spokes.com/v1/bikes');
api.searchParams.set('category', 'urban');
api.searchParams.set('limit', 200);
require("dotenv").config();


const images = ["https://d2yn9m4p3q9iyv.cloudfront.net/orbea/2023/vibe-h30-eq-20mph/thumbs/1000/9cf68.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/scott/2023/contessa-spark-920/thumbs/1000/e28ca.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/scott/2023/spark-950/thumbs/1000/757ab.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/scott/2023/spark-930/thumbs/1000/faae3.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/scott/2023/spark-970/thumbs/1000/0a1b3.webp",
"https://d2yn9m4p3q9iyv.cloudfront.net/scott/2023/spark-st-900-tuned/thumbs/1000/7e2f9.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/scott/2023/spark-900-ultimate/thumbs/1000/935fd.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/scott/2021/spark-600/thumbs/1000/ad87c.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/scott/2022/spark-rc-team-issue/thumbs/1000/461bf.webp", "https://d2yn9m4p3q9iyv.cloudfront.net/scott/2022/spark-rc-comp/thumbs/1000/a668b.webp"]
const colors = ["red", "blue", "green", "black", "gray", "white"]
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
      price: getRandomInt(1000, 4000),
      gears: getRandomInt(7, 16),
      image: images[getRandomInt(0, images.length)],
      colors: [...colors].sort(() => Math.random() - 0.5).slice(0, getRandomInt(1,4)),
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
