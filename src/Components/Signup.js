import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
const Signup = (props) => {
    const host = "http://localhost:5000"
    const [credentials, setCredentials] = useState({username: "",email: "", password: "" , cpassword: ""})
    
    let navigate = useNavigate();

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        if(credentials.password !== credentials.cpassword){
           return alert("Password should be matched")
        }

        try {
            const response = await fetch(`${host}/createUser`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({username : credentials.username, email: credentials.email, password: credentials.password }),
            });
            
            const json = await response.json();
            console.log("--------->"+json.authToken)
            if (json.success){
                // Save the auth token and redirect
                localStorage.setItem('token', json.authToken); 
                navigate("/");
                props.showAlert("Accout Created Successfully","success")
    
            }
            else{
                props.showAlert("Try Again With Different Credentials","danger")
            }
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div className=' d-flex justify-content-center' style={{marginTop:'80px'}}>
         <form  onSubmit={handleSignup} style={{margin:'10px', boxShadow:'0 0 7px #676161',borderRadius:'20px',width:'450px', padding:'25px'}}>
         <h4 className='text-center mb-3 fw-bolder'>Signup</h4>
         <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" value={credentials.username} onChange={onChange} id="username" name="username" aria-describedby="emailHelp" required />
                    </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />
                    </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" required />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-primary">Create Account</button>
                
                <Link className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="/login">
                Already have an account
</Link>
                </div>
            </form>
    </div>
  )
}

export default Signup