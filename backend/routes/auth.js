const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
router.get('/kadian',(req,res)=>{
    obj = {
        name : 'sachin kadian'
    }
    res.json(obj)
})
router.get('/',(req,res)=>{
    obj = {
        name : 'sachin'
    }
    res.json(obj)
})
router.get('/hello0',[
    body('person1',"enter full name...").isLength({min:3})
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // res.send(errors);
        return res.status(400).json({
          // error: 'An error occurred while creating the user.dadkalkd'
          errors:errors.array()
        });
      }
    // const price = req.query.person;
    // res.json({ price });
    // res.send(`Hello, ${req.query.person}! from auth.js`);
  //   const person = req.query.person;
  //   // const person = parseInt(req.query.person, 10); 
  // const greeting = `Hello, ${person}! from auth.js2132`;
  // const responseData = { person , greeting };

  // res.json({ person , greeting });
  });
module.exports = router;