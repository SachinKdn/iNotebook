import React, { useContext ,useState,useEffect, useRef } from "react";
import noteContext from "../Context/Note/NoteContext";
import { useLocation,useNavigate } from 'react-router-dom';


const Profile = () => {
    const context = useContext(noteContext);
  const { openProfile, setOpenProfile } = context;
  const ref = useRef(null)
  
    
    const handleClose = ()=>{
        setOpenProfile(false)
    }



    const [isBackdropClicked, setIsBackdropClicked] = useState(false);

  useEffect(() => {
    if(openProfile){
                ref.current.click();   
            }
    function handleBackdropClick() {
      setIsBackdropClicked(true);
        setOpenProfile(false)
    }

    window.addEventListener('click', handleBackdropClick);

    return () => {
      window.removeEventListener('click', handleBackdropClick);
    };
  }, [openProfile]);


  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
    return (
        <div>
            <button ref={ref} className="btn btn-primary d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" style={{minWidth: "250px",width: "20%"}}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Your Profile</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleClose}></button>
                    
                </div>
                <div className="offcanvas-body py-0">
                <hr style={{border:'1px solid black', marginTop: '0px', marginBottom: '5px'}} />
                   <div className="d-flex flex-column justify-content-center align-items-center">
                    <h5>Welcome!</h5>
                   <i class="fa-solid fa-user-tie" style={{fontSize:"50px"}}></i>
                   <h6 className="my-2">Sachin Kadian</h6>
                   <button type="button" onClick={handleLogout} className="btn btn-sm btn-outline-danger my-3">Logout</button>
                   
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Profile