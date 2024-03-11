import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react';
import notFoundSvg from '../img/notfound.svg';

const NotFound = () => {
  return (
    <Flex
      width={'full'}
      justifyContent={'center'}
      alignItems={'center'}
      direction={'column'}
     >
        <Image src={notFoundSvg} width={{base:500,lg:600}} />
        <Text 
           fontSize={{base:30,lg:40}} fontWeight={'semibold'} fontFamily={'cursive'}>
             Not Found
           </Text>

    </Flex>
  )
}

export default NotFound;
