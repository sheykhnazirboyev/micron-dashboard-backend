const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

module.exports = function(){
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("Successfully connected to db"))
      .catch(err => console.log(err));
}

