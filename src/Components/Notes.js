import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/Note/NoteContext";
import NoteItem from "./NoteItem";


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom';

export default function Notes(props) {
  const a = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes ,editNote} = a;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate("/login");
    }
  }, []);
  const ref = useRef(null)
  // const updateNote = (note) => {
  //   ref.current.click()
  // };
  const updateNote = (currentNote) => {
    console.log("update Clicked" + currentNote.title)
    setNote({eid :currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    ref.current.click();
    // setNote({etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
  }
  const [show, setShow] = useState(false);
  const [note, setNote] = useState({ eid : "" ,etitle: "", edescription: "", etag: "" })
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (e) => {
    console.log("Updating the note...", note)
    setShow(false)
    editNote(note.eid,note.etitle,note.edescription,note.etag)
    e.preventDefault();
    props.showAlert("Updated Successfully!","success")

  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>

      <Button ref={ref} variant="primary" onClick={handleShow} className="d-none">
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
          <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        </Modal.Header>
        <Modal.Body>Woohoo, you are updating this note!

          <form className="my-3">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
            </div>

          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick} disabled={note.etitle.length < 1 || note.edescription.length < 1 || note.etag.length < 1}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row">
        <h4>Your Notes</h4>
        {notes.length === 0 && 
        <div className="d-flex justify-content-center container">
          <h5 style={{margin: '0 auto'}}>There is no notes !!</h5>
        </div>
        }
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
          );
          // note.title;
        })}
      </div>
    </>
  );
}
