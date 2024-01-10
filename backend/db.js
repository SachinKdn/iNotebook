// iske ander local mongodb set connect hone ka code likhenge
const mongoose = require('mongoose'); // ye hmne 'mongoose ka bula liya
const mongoURI = 'mongodb://127.0.0.1/mydb' //'mongodb://localhost:27017/local'//mongodb://127.0.0.1/blog
// mongodb://localhost:27017

// now we have to create a function which help to connect with our mongodb (mongoose promises return krta h)
// you can use here promises, but harry like to use async/await method to connect with mongo db

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI, ()=>{ //this is callback function
//         console.log("connect to mongo successfully");
//     })
// };


const connectToMongo=()=>{
    mongoose.connect(mongoURI);
    console.log("connected to mongo");
}


module.exports = connectToMongo;//to export above function
