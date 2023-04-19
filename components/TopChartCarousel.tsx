import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import TopCharts from './TopCharts'
import { Box,Paper} from '@mui/material'
import { colors } from '@/theme/AppThemeProvider'
import FollowedArtistsContainer from './FollowedArtistsContainer'

const TopChartCarousel = ({props}:{props:any}) => {
  return (
    <Paper sx={{width:"70vw",mx:"auto",height:"403px"}}>
     <Carousel autoPlay={true} autoFocus={true} interval={5000} infiniteLoop={true}>
      {props.map((item:any,index:number)=> {
        return (
          <TopCharts key = {index} prop={item}/>
        )
      })}
     </Carousel>
    </Paper>
  )
}

export default TopChartCarousel

// albumGroup
// : 
// "single"
// albumType
// : 
// "single"
// artists
// : 
// Array(2)
// 0
// : 
// external_urls
// : 
// {spotify: 'https://open.spotify.com/artist/0fyeRmbc7XdKio5Fm13LPB'}
// href
// : 
// "https://api.spotify.com/v1/artists/0fyeRmbc7XdKio5Fm13LPB"
// id
// : 
// "0fyeRmbc7XdKio5Fm13LPB"
// name
// : 
// "Reyn"
// type
// : 
// "artist"
// uri
// : 
// "spotify:artist:0fyeRmbc7XdKio5Fm13LPB"
// [[Prototype]]
// : 
// Object
// 1
// : 
// external_urls
// : 
// {spotify: 'https://open.spotify.com/artist/1qid2RAqbRe7NvZ8tCxbOS'}
// href
// : 
// "https://api.spotify.com/v1/artists/1qid2RAqbRe7NvZ8tCxbOS"
// id
// : 
// "1qid2RAqbRe7NvZ8tCxbOS"
// name
// : 
// "DANO"
// type
// : 
// "artist"
// uri
// : 
// "spotify:artist:1qid2RAqbRe7NvZ8tCxbOS"
// [[Prototype]]
// : 
// Object
// length
// : 
// 2
// [[Prototype]]
// : 
// Array(0)
// date
// : 
// "2023-03-17"
// id
// : 
// "3tX0JXoCJx4vIL1acagF70"
// image
// : 
// "https://i.scdn.co/image/ab67616d0000b27390577e4a5a579062b262dd3b"
// name
// : 
// "TA"
// totalTracks
// : 
// 1
// type
// : 
// "album"