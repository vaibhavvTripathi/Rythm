import { Container, Skeleton } from '@mui/material'
import React from 'react'

const AlbumSkeleton = () => {
  return (
    <Container>
    
    <Skeleton variant="rounded" sx={{mt:1}} width={"100%"} height={300} />
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
  )
}

export default AlbumSkeleton