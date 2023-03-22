import React from 'react'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=757d949713674b90a63a6b27ba555f82&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%user-top-read%20user-library-read%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


const Def = () => {
  return (
    <>
       <div>Something went wrong</div>
       <a href={AUTH_URL}>Login again</a>
    </>
   
  )
}

export default Def