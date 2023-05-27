import { Box, Skeleton } from "@mui/material";
import React from "react";
import CardArraySkeleton from "./CardArraySkeleton";

const IndexSkelton = () => {
  return (
    <>
      <Skeleton
        variant="rounded"
        sx={{ mb: 3 }}
        width={"30%"}
        height={50}
      />
      <Skeleton
        variant="rounded"
        sx={{ mt: 1, mx: "auto" }}
        width={"80%"}
        height={400}
      />
      <Skeleton
        variant="rounded"
        sx={{ mt: 5, mb: 3 }}
        width={"30%"}
        height={50}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        <Skeleton variant="rounded" width={"350px"} height={100} />
        <Skeleton variant="rounded" width={"350px"} height={100} />
        <Skeleton variant="rounded" width={"350px"} height={100} />
        <Skeleton variant="rounded" width={"350px"} height={100} />
        <Skeleton variant="rounded" width={"350px"} height={100} />
        <Skeleton variant="rounded" width={"350px"} height={100} />
      </Box>
      <Skeleton
        variant="rounded"
        sx={{ mt: 5, mb: 3 }}
        width={"30%"}
        height={50}
      />
      <CardArraySkeleton/>
      <Skeleton
        variant="rounded"
        sx={{ mt: 5, mb: 3 }}
        width={"30%"}
        height={50}
      />
      <CardArraySkeleton/>
      <Skeleton
        variant="rounded"
        sx={{ mt: 5, mb: 3 }}
        width={"30%"}
        height={50}
      />
      <CardArraySkeleton/>
    </>
  );
};

export default IndexSkelton;
