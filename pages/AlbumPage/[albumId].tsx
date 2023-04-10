import AlbumBanner from "@/components/AlbumBanner";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AlbumPage = () => {

  const router = useRouter();
  const { artistId } = router.query;

  const[isLoading,setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    
  }, []);
  return (
    <div>
      <AlbumBanner />
    </div>
  );
};

export default AlbumPage;
