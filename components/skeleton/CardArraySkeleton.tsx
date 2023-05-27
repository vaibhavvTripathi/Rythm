import { Box, Skeleton } from '@mui/material'
import React from 'react'

const CardArraySkeleton = () => {
  return (
    <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
     <Skeleton
        variant="rounded"
        sx={{ mt: 2}}
        width={"20%"}
        height={200}
      />
       <Skeleton
        variant="rounded"
        sx={{ mt: 2}}
        width={"20%"}
        height={200}
      />
       <Skeleton
        variant="rounded"
        sx={{ mt: 2}}
        width={"20%"}
        height={200}
      />
       <Skeleton
        variant="rounded"
        sx={{ mt: 2}}
        width={"20%"}
        height={200}
      />
    </Box>
  )
}

export default CardArraySkeleton