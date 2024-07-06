import React, { useState } from 'react'

function InputBox({name, type, id, value, placeholder, icon}) {

  // // password hide or visible functionality
  // const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className='relative mb-4'>
        <input 
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            id={id}
            className='input-box'
        />

        <i className={`fi ${icon} input-icon`}></i>

        {/* {
          //password par hide and unhide wali functionality lagane ke lia

          type == "password" ?
          <i class="fi fi-rr-eye-crossed input-icon left-[auto] right-4"
          
          onClick={() => setPasswordVisible(currentVal => !currentVal)}
          ></i>
          : ""
        } */}
    </div>
  )
}

export default InputBox