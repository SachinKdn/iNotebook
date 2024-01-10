const jwt = require('jsonwebtoken')
const secKey = "jaibabaki";

const fetchuser = (req,res,next)=>{

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "this is fatchuser error....."})
    }

    try{
        const data = jwt.verify(token,secKey);
        req.user = data.user;
        console.log("fatchuser called " + data.user.id)
        next()

    }catch(error){
        console.error(error);
      res.send("Internal Errorororororroror")
    }

}

module.exports = fetchuser;