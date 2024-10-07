'use client'
import { signOut } from '@/app/lib/auth'
import React from 'react'

const Btn = () => {
  return (
    <button onClick={()=>signOut()}>Btn</button>
  )
}

export default Btn