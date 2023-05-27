import React, { useState } from 'react'
import PlaylistPopup from '@/Layout/PlaylistPopup'
import { Button } from '@mui/material'
import ArtistSkeleton from '@/components/skeleton/ArtistSkeleton'
import AlbumSkeleton from '@/components/skeleton/AlbumSkeleton'
import IndexSkelton from '@/components/skeleton/IndexSkeleton'

const Libraries = () => {
  const[isOpen,setIsOpen] = useState<boolean>(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <PlaylistPopup isOpen={isOpen} toggle={(newVal:boolean)=>setIsOpen(newVal)}/>
      <IndexSkelton/>
    </>

  )
}

export default Libraries