import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Error = () => {

    const bg = useColorModeValue('gray.600', 'gray.300');
  return (
    <Flex
       justifyContent={'center'}
       alignItems={'center'}
       height={'100vh'}
       textAlign={'center'}
       direction={'column'}
       mt={'-20vh'}
       fontFamily={'Poppins'}
       fontWeight={'bold'}
       gap={3}
       >
        <Text fontSize={{base:30 ,lg:45}}>Error 404</Text>
        <Text fontSize={25} mt={10}>Page Not Found</Text>
        <Link to={'/'}>
            <Flex direction={'row'} color={bg} mt={5} fontSize={20} p={3} gap={2} rounded={'12px'} _hover={{boxShadow:'dark-lg'}}>Go to Homepage<FaHome color={'orange'} fontSize={25} /> </Flex>
        </Link>


    </Flex>
  )
}

export default Error
