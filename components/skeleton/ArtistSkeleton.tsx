import { Container, Skeleton } from '@mui/material'
import React from 'react'

const ArtistSkeleton = () => {
  return (
    <>
      <Container>
      <Skeleton variant="circular" sx={{mx:"auto"}} width={150} height={150} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:2}} width={150} height={30} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={100} height={20} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={100} height={20} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={100} height={20} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={100} height={20} />
      <Skeleton variant="rounded" sx={{mt:5,mb:3}} width={"100%"} height={50} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={"100%"} height={20} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={"100%"} height={20} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={"100%"} height={20} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={"100%"} height={20} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={"100%"} height={20} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={"100%"} height={20} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={"100%"} height={20} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={"100%"} height={20} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={"100%"} height={20} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={"100%"} height={20} />
      <Skeleton variant="rounded" sx={{mx:"auto",mt:1}} width={"100%"} height={20} />
      </Container>
    </>
  )
}

export default ArtistSkeleton