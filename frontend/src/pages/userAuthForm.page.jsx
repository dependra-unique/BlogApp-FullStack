import React from 'react'
import InputBox from '../components/InputBox.jsx';

function UserAuthForm({type}) {
  return (
    <section className='h-cover flex items-center justify-center'>
        <form className='w-[80%] max-w-[400px]'>
          <h1 className='text-4xl font-gelasio capitalize text-center mb-24'> 
            {type == "signin" ? "Welcome Back" : "Join Us Today"}
          </h1>

          {
            type != "signin" ?  
            <InputBox 
              name="fullname"
              type="text"
              placeholder="full name"
            /> : 
            ""
          }
        </form>
      </section>
  )
}

export default UserAuthForm;