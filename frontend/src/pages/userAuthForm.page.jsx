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

            <button className='btn-dark center mt-19 px-4'>
              { type }
            </button>
        </form>
      </section>
  )
}

export default UserAuthForm;