import React from 'react'
import { useState } from "react";
import { useHistory } from 'react-router-dom';
export default
 function Test2()
{ 
    let history=useHistory()

    return (
    
    <div>
        <h1>test2</h1>
        <button onClick={()=>{
            history.push("/test")
          }}>go to test</button>
         </div>
    )
;}