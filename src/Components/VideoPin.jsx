import { Flex, Image, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserInfo } from '../utils/fetchData';
import { getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../firebase-config';
import moment from 'moment/moment';
import sound from '../audio/modern-select.wav';

const VideoPin = ({data}) => {

  const firestoreDb = getFirestore(firebaseApp);

//   const {colorMode, toggleColorMode} = useColorMode();
  const bg = useColorModeValue('blackAlpha.700', 'gray.900');
  const textColor = useColorModeValue('gray.100', 'gray.100');

  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [playaudio, setPlayAudio] = useState(0);

  const play = () =>{
    if(!playaudio){
      setPlayAudio(1);
      new Audio(sound).play();
      setPlayAudio(0);
    }
    
  }

  useEffect(()=>{
    if(data) setUserId(data.userId);
    if(userId) getUserInfo(firestoreDb,userId).then((data) =>{
         setUserInfo(data);
    });
  },[userId]);

  return (
    <Flex
       justifyContent={'space-between'}
       alignItems={'center'}
       cursor={'pointer'}
       shadow={'lg'}
       _hover={{shadow: 'xl'}}
       rounded={'md'}
       overflow={'hidden'}
       position={'relative'}
       maxWidth={{base:'400px',lg:'280px',xl:'300px'}}
       height={'auto'}
    >

        <Link to={`/videoDetail/${data?.id}`}>
         {data.videoUrl && (
          <video
              autoPlay={false}
              src={data.videoUrl} 
              muted 
              onMouseOver={(e)=>{ if(data.videoUrl && e.target.play()!== true) {e.target.play();}}}
              onMouseOut={(e)=>{if(e.target.pause() !== true) {e.target.pause();}}}
              onClick={play}
           />)}
        </Link>
        <Flex 
           position={'absolute'}
           bottom={0}
           left={0}
           p={2}
           bg={bg}
           width={'full'}
           direction={'column'}
        >
            <Flex
               width={'full'}
               justifyContent={'space-between'}
               alignItems={'center'}
            >
              <Text 
                  color={textColor} 
                  isTruncated              
                  fontSize={15}
              >{data.title}</Text>

              <Link to={`/userDetail/${userId}`}>
                 <Image
                    src={userInfo?.photoURL}
                    rounded={'full'}
                    width={'50px'}
                    height={'50px'}
                    border={'2px'}
                    borderColor={bg}
                    mt={-10}
                    minHeight={'50px'}
                    minWidth={'50px'}
                    onClick={play}
                 />
              </Link>
            </Flex>

            {/* moment */}
             <Text fontSize={12} color={textColor} ml={'auto'}>
               {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}
             </Text>

        </Flex>

    </Flex>
  )
}

export default VideoPin;
