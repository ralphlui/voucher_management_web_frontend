"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const LogOut = () => {
  return (
    <>
    <button onClick={() =>  signOut({ callbackUrl: '/' })}> Log Out</button>
    </>
  )
}

export default LogOut
