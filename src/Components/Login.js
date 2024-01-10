import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';

const Login = (props) => {
    // const host = "http://localhost:5000"
    const host = "https://i-notebook-backend-puce.vercel.app"
    const [credentials, setCredentials] = useState({email: "", password: ""})
    
    let navigate = useNavigate();
    
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${host}/login`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });
            
            const json = await response.json();
            console.log("--------->"+ json.authToken)
            if (json.success){
                // Save the auth token and redirect
                localStorage.setItem('token', json.authToken); 
                props.showAlert("Logged-in successfully","success")
                navigate("/");
            }
            else{
                props.showAlert("Invalid Credentials","danger")
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className=' d-flex justify-content-center' style={{marginTop:'80px'}}>
            <form className='' onSubmit={handleLogin} style={{margin:'10px', boxShadow:'0 0 7px #676161',borderRadius:'20px',width:'350px', padding:'25px'}}>
                <h4 className='text-center mb-3 fw-bolder'>Login</h4>
                <div className="mb-3 ">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />
                   </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-primary">Login</button>
                
                <Link className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="/signup">
                Create a new account
</Link>
                </div>
            </form>
        </div>
    )
}

export default Login