import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) =>{
    // const host = "http://localhost:5000"
    const host = "https://i-notebook-backend-puce.vercel.app"
    const initalnotes = []
    const [notes,setNotes] = useState(initalnotes);

    const [openProfile,setOpenProfile] = useState(false)

// get all note
const getNotes = async ()=>{

  const response = await fetch(`${host}/user/fetchallnotes`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "auth-token" : localStorage.getItem('token')
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjk4NDI5MjMzfQ.AUsEOgKSjnSWRGG-fO048q2IAkp2b_94O0PNZ7RMwTQ"
    }
  });
  const json = await response.json();
  console.log(json)
  setNotes(json)
}

    // Add A Note
    const addNote = async (title,description,tag)=>{

      const response = await fetch(`${host}/user/addnotes`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjk4NDI5MjMzfQ.AUsEOgKSjnSWRGG-fO048q2IAkp2b_94O0PNZ7RMwTQ"
        },body: JSON.stringify({title,description,tag}),
      });
      const json = await response.json();
      console.log(json)

      // const note = {
      //   "_id": "65320849623e3d499dff42b6",
      //       "user": "6530b82e00902ff9274d166c",
      //       "title": title,
      //       "description": description,
      //       "tag": tag,
      //       "date": "1697777737354",
      //       "__v": 0
      // }
      setNotes(notes.concat(json))
    }

    const deleteNode =async (key)=>{
      
      const response = await fetch(`${host}/user/deletenode/${key}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMGI4MmUwMDkwMmZmOTI3NGQxNjZjIn0sImlhdCI6MTY5NzcxMTExOH0.4_7R6PFmjW0gtAoJvRkuo8HSkLulNS443EZuOHattac"
        }
      });
      const json = await response.json();
      console.log(json + "This is deleted...")


      // const newArray =  notes.filter(note => note._id !== key);
      setNotes(notes.filter(note => note._id !== key))
     
    }
    
    const editNote = async (id,title,description,tag)=>{  
      console.log("editNote called/////")   
      try{
      const response = await fetch(`${host}/user/updatenote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMGI4MmUwMDkwMmZmOTI3NGQxNjZjIn0sImlhdCI6MTY5NzcxMTExOH0.4_7R6PFmjW0gtAoJvRkuo8HSkLulNS443EZuOHattac"
        },body: JSON.stringify({title,description,tag}),
      });

      const json =  response.json();
      console.log(json)
      // logic to edit note
      // let newNotes = JSON.parse(JSON.stringify(notes))
      const newNotes = Array.from(notes);
      for(let index=0;index < notes.length;index++){
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes)
    }catch(error){
      console.error(error)
    }
      
    }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNode,editNote,getNotes,openProfile,setOpenProfile}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;



