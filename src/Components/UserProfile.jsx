import React from 'react'
import { useState } from 'react';
import Spinner from './Spinner';
import { Flex, Image, Text } from '@chakra-ui/react';
import { firebaseApp } from '../firebase-config';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserInfo, userUploadedVideos } from '../utils/fetchData';
import { getFirestore } from 'firebase/firestore';
import RecommendedVideo from './RecommendedVideo';

const UserProfile = () => {

  const [isLoading, setIsLoading] = useState(false);
  const {userId} = useParams();
  const [userInfo, setUserInfo ] = useState(null);
  const [feeds, setFeeds] = useState(null);

  const firestoreDb = getFirestore(firebaseApp);
  const randomImage = "https://source.unsplash.com/1600x900/?nature,photography,technology";
  
  useEffect(()=>{
    setIsLoading(true);
    if(userId){
      getUserInfo(firestoreDb,userId).then((user)=>{
        setUserInfo(user);
      })
      userUploadedVideos(firestoreDb,userId).then((feed)=>{
          setFeeds(feed);
      });
      setIsLoading(false);
    }
  },[userId]);
  
  if(isLoading) return <Spinner/>

  return (
    <Flex 
      alignItems={'center'}
      justifyContent={'center'}
      width={'full'}
      height={'auto'}
      p={2}
      direction={'column'}
    >
       <Flex 
         alignItems={'center'}
         justifyContent={'center'}
         width={'full'}
         height={'auto'}
         p={2}
         direction={'column'}
       >

         <Image
            src={randomImage}
            height={'320px'}
            width={'full'}
            objectFit={'cover'}
            borderRadius={'md'}
          />

         <Image
            src={userInfo?.photoURL}
            height={'120px'}
            objectFit={'cover'}
            border={'2px'}
            borderColor={'gray.100'}
            rounded={'full'}
            mt={-16}
          />
          <Text textAlign={'center'} bg={'#CCF2FF'} p={3} roundedTopRight={'40px'} roundedBottomLeft={'40px'} boxShadow={'dark-md'} textColor={'blackAlpha.900'} my={4} fontSize={25} fontWeight={'semibold'}>
              {userInfo?.displayName}
          </Text>
       </Flex>

       { feeds && (
            <Flex direction={'column'} width={'full'} my={6}>
              <Text textAlign={'center'} my={4} fontSize={25} fontWeight={'semibold'}>
                Uploaded Videos
              </Text>
              <RecommendedVideo feeds = {feeds} />
            </Flex>
          )}
    </Flex>
  )
}

export default UserProfile;
