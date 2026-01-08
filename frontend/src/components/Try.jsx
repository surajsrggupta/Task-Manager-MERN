import React from 'react'
import { useState,useEffect, useEffectEvent } from 'react';

const Try = () => {

    const [message, setMessage] = useState("");

   // create a stable event that always sees latest state
  const effectEventFetchData = useEffectEvent(async () => {
    try {
      const res = await fetch("http://localhost:3000/");
      const data = await res.text();
      setMessage(data);
    } catch (error) {
      console.log("we got an", error);
    }
  });

  useEffect(() => {
    effectEventFetchData(); // call inside an effect
  }, []); // only once on mount



  return (
    <div>
      <h1>MERN Task Manager</h1>
      <h3>Backend Status: {message?<span>{message}</span>:"Connecting..."}</h3>
    </div>
  )
}

export default Try
