import React, { useEffect, useState } from 'react';
import { getAllFeeds } from '../utils/fetchData';
import Spinner from '../Components/Spinner';
import { Box, SimpleGrid } from '@chakra-ui/react';
import VideoPin from './VideoPin';

const RecommendedVideo = ({feeds}) => {
  return (
    <SimpleGrid 
        minChildWidth='300px' 
        spacing='15px' 
        autoColumns={'max-content'} 
        width={'full'}
        px={2}
        overflowX={'hidden'}
    >
          {feeds && feeds.map((data) => (
            <VideoPin key={data.id} maxWidth = {420} data={data} height='80px'/>
          ))}
     </SimpleGrid>
  )
}

export default RecommendedVideo;
