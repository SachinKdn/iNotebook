const express = require('express');
const router = express.Router();
const {body,validationResult} = require('express-validator')
const Note = require('../models/Note');
const fetchuser = require('../middleware/fatchuser');
const app = express()
app.use(express.json())

//1. fetch all notes here
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    const notes = await Note.find({user : req.user.id});
    res.send(notes);
})

// 2. add notes in db
router.post('/addnotes',
fetchuser,
[
    body('title',"Bhai Naam Pura Bta").isLength({min: 1}),
  body('description',"Bhai email to sahi de de").isLength({min: 1}),
],
async (req,res)=>{
    try{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      errors:errors.array()
    });
  }
        const { title,description, tag } = req.body;
//         console.log("req.body")
//     // const user = req.user;
//     // const note = Note.create({

//     // })
    const note = new Note({
        title,description,tag, user:req.user.id
    })
    console.log("current user id "+ req.user.id)
    const saveNote = await note.save();
    res.json(saveNote)
//     const note1 = await note.save()
//     res.json(note1)
//     // console.log(notes)

}catch(error) {
    console.error(error);
}
})


// 3. Update the note
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
  const {title,description,tag} = req.body;
//find your note
  let note = await Note.findById(req.params.id);
  if(!note){
    return res.status(404).send("Not Found!!")
  }
  // res.send(note.user)

  const newnote = {}
    if(title){newnote.title = title};
    if(description){newnote.description = description};
    if(tag){newnote.tag = tag};
  

  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed")
  }
  note = await Note.findByIdAndUpdate(req.params.id,
    // {title : title}
    {$set : newnote}
    // {newnote} gives us error.......
    , {new : true})
  res.json(note);
  console.log("the update called successfull")
})

// 4. Delete the note
router.delete('/deletenode/:id',fetchuser,async (req,res)=>{
//find your note
  let note = await Note.findById(req.params.id);
  if(!note){
    return res.status(404).send("Not Found!!")
  }

  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed")
  }

  note = await Note.findByIdAndDelete(req.params.id)
  res.json(note);


})

module.exports = router;