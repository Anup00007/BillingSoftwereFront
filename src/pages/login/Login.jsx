import { useContext, useState } from 'react';
import './Login.css';
import toast from 'react-hot-toast';
import { login } from '../../service/AuthService';
import { Navigate, useNavigate } from 'react-router-dom';

import { AppContext } from '../../contect/AppContext';
const Login = () => {
    const {setAuthData}=useContext(AppContext);
    const Navigate=useNavigate();
    const[loading,setLoading]=useState(false);
    const[data,setData]=useState({
email : "",
password :"",
    }
    );
    const onChangeHandler=(e)=>{
const name=e.target.name;
const value=e.target.value;
setData((data)=>({...data,[name]:value}));
    }
    const onSubmitHandler= async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
const response=await login(data);
if(response.status===200){      
    toast.success("Login successful");
    localStorage.setItem("token",response.data.token);  
    localStorage.setItem("role",response.data.role);
    setAuthData(response.data.token,response.data.role);
    Navigate("/dashboard");
}
        }catch(error){
            console.error("Login error:", error);
           toast.error("Something went wrong, please try again later");
        }finally{           
            setLoading(false);
        }}

    return (
        <div className="bg-light d-flex align-items-center jtify-content-center vh-00 login-background">
            <div className='card shadow-lg w-100' style={{ maxWidth: '480px' }}>
                <div className='text-center'>
                    <h1 className='card-title'>Sign in</h1>
                    <p className='card-text text-muted'>Sign in below to access your account</p>

                </div>
                <div className="mt-4">
                    <form action="" onSubmit={onSubmitHandler} className="mx-3 padding-3">

                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" name="email" id="email" className="form-control" placeholder=" yoname@example.com" value={data.email} onChange={onChangeHandler}></input>
                        </div>
                        <div mb-4>
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" id="pasword" className="form-control" placeholder=" yoname@example.com" value={data.password} onChange={onChangeHandler}></input>
                        </div>
                        <br />
                        <div className='d-grid mb-3'>
                            <button type="submit" className="btn btn-dark" disabled={loading}>{loading ? "Loading...":"Sign in"}</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    )

}
export default Login;