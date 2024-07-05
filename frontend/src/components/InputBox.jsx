import React from 'react'

function InputBox({name, type, id, value, placeholder}) {
  return (
    <div>
        <input 
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            id={id}
            className='input-box'
        />

        <i class="fi fi-rr-user input-icon"></i>
    </div>
  )
}

export default InputBox