import React, { useEffect, useState } from 'react'
import axios from 'axios'
axios.defaults.withCredentials=true

const User = () => {

    const [user,setUser]=useState();

    useEffect(()=>{
        sendRequest().then((data)=>setUser(data.user))
        console.log("users",user)
    },[])

    const sendRequest=async()=>{
        const res=await axios.get('http://www.localhost:8080/auth/user',{
            withCredentials:true,
        }).catch((err)=>{
            console.log(err)
        })
        const data=await res?.data;
        console.log("==========",data)
        return data;
    }
  return (
    <div>
        {user &&  <h1>{user.name}</h1> }
    </div>
  )
}

export default User