const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI

async function mongoConnect() {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = mongoConnect;