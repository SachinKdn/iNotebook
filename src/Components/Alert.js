
import React from 'react'

function Alert(props) {
  const captalize = (word)=>{
    if(word === "danger"){
      word = "error"
    }

      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);

    }

  
  return (
    <div className=''>
      {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
        <strong>{captalize(props.alert.type)}</strong> : {props.alert.msg}
      </div>}
    </div>
  )
}

export default Alert
