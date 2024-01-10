import React from 'react'
import AddNote from './AddNote'
import Notes from './Notes'
import Profile from './Profile'

export const Home = (props) => {
  return (
    <div className='container my-5'>
        <AddNote showAlert={props.showAlert}/>
        <Profile/>
        <Notes showAlert={props.showAlert} />

    </div>
  )
}
