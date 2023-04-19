import React, { useState } from 'react'
import PlaylistPopup from '@/Layout/PlaylistPopup'
import { Button } from '@mui/material'

const Libraries = () => {
  const[isOpen,setIsOpen] = useState<boolean>(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <PlaylistPopup isOpen={isOpen} toggle={(newVal:boolean)=>setIsOpen(newVal)}/>
      <Button onClick = {toggle}>Click me</Button>
    </>

  )
}

export default Libraries