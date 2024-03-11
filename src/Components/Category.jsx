import { Box, Flex, Tooltip, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import sound from '../audio/Touch.mp3';

const Category = ({data}) => {
  const {colorMode} = useColorMode();
  const bg = useColorModeValue('gray.600', 'gray.300');
  const iconBg = useColorModeValue('gray.300', 'gray.600');
  const [playaudio, setPlayAudio] =useState(0);

  const play = () =>{
    if(!playaudio){
      setPlayAudio(1);
      new Audio(sound).play();
      setPlayAudio(0);
    }
  }
  return (
<Flex cursor={'pointer'} my={'5'} ml={1} p={2} rounded={'12px'} _hover={{bg:iconBg}} onClick={play}>
  <Link to={`/category/${data.name}`}>
     <Tooltip 
        hasArrow 
        placement="right" 
        closeDelay={300} 
        label={data.name} 
        bg={bg}
      >
       <Box fontSize={'xs'}>{data.iconSrc}</Box>
     </Tooltip>
  </Link>


</Flex>
    
  );
}

export default Category;
