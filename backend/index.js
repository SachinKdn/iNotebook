const connectToMongo = require('./db');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var cors = require('cors')
const secKey = "jaibabaki";
const {body,validationResult} = require('express-validator')
const User = require('./models/User');
const fetchuser = require('./middleware/fatchuser');
// now you have to install
// run 'npm i -D nodemon' // here -D is used to make separate from dependencies
connectToMongo();
// to run this application
// npm install -g nodemon      
// 'nodemon .\node.js'  ---> ye sync working krta h save krte hee update ho jaati h + refresh bhi
//  'node .\node.js --> ye refresh nhi hota connection remove krke dubara connect krna pdta h

var app = express()

app.use(cors())
const port = 5000
app.use(cors(
  {
  origin: ["https://i-notebook-frontend-ten.vercel.app/"], 
  methods: ["POST", "GET"],
  credentials: true
  }
));
    
    
app.use(express.json())
app.use('/dil',require('./routes/auth'))
app.use('/user',require('./routes/note'))
// app.get('/', (req, res) => {
//   obj = {
//     name : 'mera dil'
// }
// res.json(obj)
//   res.send(req.body)
//   res.send('Hello Sachin Kadian Ji!')
// })
app.get('/hello', (req, res) => {
  res.send(`Hello, ${req.query.person}! from index.js`);
});
app.post('/createUser',
[
  body('username',"Bhai Naam Pura Bta").isLength({min: 3}),
  body('email',"Bhai email to sahi de de").isEmail(),
  body('password',"Chl m na dekh rha, aur password bna le").isLength({min: 5})
]
,
async (req,res)=>{
  
  let success = false;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      // error: 'An error occurred while creating the user.'
      errors:errors.array()
    });
  }
  try{
    // const user = await User.create({
      // name: req.body.name,
      // email: req.body.email,
      // password: req.body.password
    // });
    // res.json(user);

    // or 
    
    // -->finding user already exist with the same email or not
    const user1 = await User.findOne({email : req.body.email });
    if(user1){
     return res.status(400).json({error : "Already exists!!"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashValue = await bcrypt.hash(req.body.password,salt
    //   ,function (error,hash){
    //   if(error){
    //     console.error(error);
    //   }else{
    //     hashValue = hash;
    //     console.log('Hashed Password:', hash);
    //   }
    // }
    );
    
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashValue
    }).then(
      // user => 
      // res.json(user)
    ).catch(err =>{
      console.error(err);
      res.json({
        error : "Please enter again !!!",
        message : err.message
      })
    })

    const data = {
      user:{
        id: user._id
      }
    }
    console.log(data + "---" + user._id + "******" + user)
    success = true;
      const authToken = jwt.sign(data,secKey);
      res.json({success,authToken})


  //   const user = new User(req.body);
  //   await user.save()
  // // res.send(req.body)
  // res.send(req.query.email + "nfank")
  }catch(error){
    console.error(error);
    res.send("ooo teri.....");
  }
});


app.post('/login',
[
  body('email',"Bhai email to sahi de de").isEmail(),
  body('password',"Chl m na dekh rha, aur password bna le").isLength({min: 5})
]
,async (req,res)=>{
  let success = false;
  try{
    const {email,password} = req.body;
    // const user = await User.findOne({email : req.body.email });
    const user = await User.findOne({ email });
    if(!user){
     return res.status(400).json({error : "Please enter a valid email"})
    }

    const compare = await bcrypt.compare(req.body.password,user.password);//it return true/false
    // res.json(compare);
    if(!compare){
      return res.status(400).json({error : "Please enter a valid email"})
    }

    const data = {
      user:{
        id: user.id
      }
    }
    console.log(data + "---" + user.id)
      success = true;
      const authToken = jwt.sign(data,secKey);
      res.json({success,authToken})
    

  }catch(error){
      console.error(error);
      res.send("Internal Errorororororroror")
  }
})


app.post('/getuser',fetchuser,async (req,res)=>{
  try{
    const userId = req.user.id;
    //"sachinnnn"
    const user = await User.findById(userId).select("-password");

    res.send({user})
  }catch(error){
      console.error(error);
      res.send("Internal Errorororororroror")
  }
})




// app.get('/users' , async (req, res) => {
//   // try {
//     console.log("lets try---" + req.body)
     
//     const { username, email, password } = req.body;

//     console.log("----" + username)
//     // // Create a new user document using the User model
//     // const newUser = new User({ username, email, password });

//     // // Save the new user to the database
//     // await newUser.save();

//     // res.send('Hello Sachin Kadian Ji!')
//     res.send(req.body)
//     // res.status(201).json(newUser);
//     // res.send(req.body)
//   // } catch (error) {
//   //   res.status(500).json({ error: 'An error occurred while creating the user.' });
//   // }



// })

// app.get('/users', async (req,res)=>{
  // const user = new User(req.body);
//   try {
  //   await user.save()
  // res.send(req.body)
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ error: 'An error occurred while creating the user.' });
//   }
// })


app.listen(port, () => {
  console.log(`Example app a listening on port-- http://localhost:${port}`)
})