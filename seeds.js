const mongoose = require("mongoose");
const Product = require("./models/Product.model");
const User = require("./models/User.model");
const axios = require("axios")

const clientId= process.env.CLIENT_ID

const api= `https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&client_id=${clientId}`
console.log(api)

const MONGO_URI = process.env.MONGODB_URI;

async function createSeeds() {
  try{
    await mongoose.connect(MONGO_URI)
    const response = await axios.get(api)
    const data =  response.data.games;
    console.log(data.length)

     await data.forEach((game) => {  Game.create({
      name: game.name,
      price: game.price,
      min_players: game.min_players,
      max_players: game.max_players,
      rating: game.average_user_rating,
      description: game.description,
      min_playtime: game.min_playtime,
      min_age: game.min_age,
      image_url: game.image_url
     })
    })
      await Game.count((err, count) => {
      if (err) console.log(err)
      else console.log("Count:", count)
    })
   return mongoose.connection.close()
  } catch(err) {
    console.log(err)
  }
}


createSeeds()
