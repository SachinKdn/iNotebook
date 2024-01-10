import React, { useContext , useState } from "react";
import noteContext from "../Context/Note/NoteContext";

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const handleClick = (e) => {
    e.preventDefault();
    if(note.title.trim().length === 0 || note.description.trim().length === 0){
      return;
    }                                   
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "default",
    })
    props.showAlert("New Note Added Successfully!","success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
}
  return (
    <div className="container my-3">
      <form className="container shadow p-3 mb-5 bg-body-tertiary rounded">
        <h4 className="text-center" style={{color: '#212d86',fontWeight:'700',fontFamily: 'Poppins'}}>Let's add a new one!</h4>
        <div className="container my-2">
          <label htmlFor="title" className="form-label">
            Note
          </label>
          <input type="text" required className="form-control" name="title" id="title" onChange={onChange} value={note.title} />
        </div>
        <div className="container my-2">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input type="text" required className="form-control" name="description" id="description" onChange={onChange} value={note.description} />
        </div>
        <div className="container my-3 ">
          <button type="submit" onClick={handleClick} className="btn btn-primary">
            Save Your Note
          </button>
        </div>
      </form>
    </div>
  );
}
