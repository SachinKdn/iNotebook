import React, { useContext , useState } from "react";
import noteContext from "../Context/Note/NoteContext";


export default function NoteItem(props) {

  const context = useContext(noteContext);
  const { deleteNode,editNode } = context;

  const {note,updateNote} = props;

  const handleDelete = ()=>{
    deleteNode(props.note._id)
    props.showAlert("Deleted Successfully!","success")
  }


  return (
    <div className="col-md-4 ">
    <div className="card my-3 my-3 shadow-sm  rounded">
      <div className="card-body ">
        <div className="d-flex align-items-baseline ">
        <h5 className="card-title " style={{color: '#212d86',fontWeight:'700',fontFamily: 'Poppins', minWidth: '60%'}}>{note.title}</h5>
      <i className="fa-solid fa-trash mx-2" style={{color:"#0975d4"}} onClick={handleDelete}></i>
      <i className="fa-solid fa-pen-to-square mx-2" style={{color:"#7d7b76"}} onClick={()=>{updateNote(note)}}></i>

        </div>
        <p className="card-text">
          {note.description}
        </p>
        
      </div>
    </div>
    </div>
  );
}
