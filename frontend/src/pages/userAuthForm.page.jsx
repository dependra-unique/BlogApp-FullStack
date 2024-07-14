import { Link, Navigate } from 'react-router-dom';
import InputBox from '../components/InputBox.jsx';
import googleIcon from "../imgs/google.png";
import PageAnimationWrapper from '../common/PageAnimationWrapper.jsx';
import { useContext, useRef } from 'react';
import {Toaster, toast} from "react-hot-toast"
import axios from 'axios';
import conf from "../conf/conf.js";
import { storeInSession } from '../common/session.jsx';
import { UserContext } from '../App.jsx';
import { authWithGoogle } from '../common/Firebase.jsx';


function UserAuthForm({ type }) {

  // const authForm = useRef();

  const { userAuth:{ accessToken }, setUserAuth } = useContext(UserContext);

  console.log(accessToken);

  const userAuthThroughServer = (serverRoute, formData) => {

    // console.log(conf.SERVER_DOMAIN + serverRoute);

    axios.post(conf.SERVER_DOMAIN + serverRoute, formData)
    .then(({data}) => {
      storeInSession("user", JSON.stringify(data));
      // console.log(sessionStorage);
      setUserAuth(data)
    })
    .catch(({response}) => {
        toast.error(response.data.error);
    })
    
  }

  const handleSubmit = (e) => {

      e.preventDefault();

      const serverRoute = type == "sign-in" ? "/signin" : "/signup";

      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   //regex for email
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;    //regex for password

      //formData
      let form = new FormData(formElement);
      let formData = {};
      
      for(let [key, value] of form.entries()){
        formData[key] = value;
      }
      // console.log(formData);


      //form validation
      const {fullname, email, password} = formData;

      if(fullname){
        if(fullname.length < 3){
          return toast.error("fullname must be atleast 3 character long");
      }
      }
      if(!email.length){
          return toast.error("email is required");
      }
      if(!emailRegex.test(email)){
          return toast.error("email invalid");
      }
      if(!passwordRegex.test(password)){
          return toast.error("password should be at least 6 to 20 characters with long a numeric, 1 lowercase and 1 uppercase")
      }

      userAuthThroughServer(serverRoute, formData);
  }


  const handleGoogleAuth = (e) => {
    e.preventDefault();

    authWithGoogle()
    .then(user => {
      console.log(user);
    })
    .catch(err => {
      toast.error('trouble login with google');
      console.log(err);
    })
  }


  return (

    accessToken ?
      <Navigate to="/" />
    :
    <PageAnimationWrapper keyValue={ type }>
        <section className='h-cover flex items-center justify-center'>
          <Toaster />
          <form id='formElement' className='w-[80%] max-w-[400px]'>
            <h1 className='text-4xl font-gelasio capitalize text-center mb-24'> 
              {type == "sign-in" ? "Welcome Back" : "Join Us Today"}
            </h1>

            {
              type != "sign-in" ?  
              <InputBox 
                name="fullname"
                type="text"
                placeholder="Full Name"
                icon="fi-rr-user"
              /> : 
              ""
            }

              <InputBox 
                name="email"
                type="email"
                placeholder="Email"
                icon="fi-tr-envelopes"
              />    
              <InputBox 
                name="password"
                type="password"
                placeholder="Password"
                icon="fi-rr-key"
              />        

              <button className='btn-dark center mt-19 px-4'
                type='submit'
                onClick={handleSubmit}
              >
                { type.replace("-", " ")}
              </button>

              <div className='relative w-full flex items-center gap-2 my-10 opacity-20 uppercase text-black font-bold'>
                  <hr className='w-1/2 border-black' />
                  <p>or</p>
                  <hr className='w-1/2 border-black' />
              </div>

              <button className='btn-dark px-5 flex items-center justify-center gap-4 w-[90%] center'
              
                onClick={handleGoogleAuth}
              >
                  <img src={googleIcon} className='w-5'/>
                  continue with google
              </button>

              {

                  type == "sign-in" ? 
                  <p className='mt-6 text-dark-grey text-xl text-center'>
                    Don't have an account ?
                    <Link to="/signup" className=' underline text-center text-xl ml-1 hover:no-underline'>
                      join us today
                    </Link>
                  </p>
                  :
                  <p className='mt-6 text-dark-grey text-xl text-center'>
                  Already a member ?
                  <Link to="/signin" className=' underline text-center text-xl ml-1 hover:no-underline'>
                    sign in here.
                  </Link>
                </p>
              }
          </form>
        </section>
    </PageAnimationWrapper>
    
  )
}

export default UserAuthForm;