import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import {NavBar, Category, Create, VideoPin, Search,Feed, UserProfile} from "../Components";
import { Route, Routes } from 'react-router-dom';
import data, { categories } from '../data';
import VideoPinDetail from '../Components/VideoPinDetail';
import Error from './Error';
// import {getFirestore} from 'firebase/firestore';
// import { firebaseApp } from '../firebase-config';
// import { getAllFeeds } from '../utils/fetchData';
// import Spinner from '../Components/Spinner';


const Home = ({ user }) => {

  return (
  <>
  <NavBar user={user} />
  <Flex width={'100vw'} flexDirection={'column'} gap={10}>
  <Flex 
  direction={'row'} 
  justifyContent={'space-evenly'} 
  alignItems={'center'} 
  width={'95%'}
  margin={'auto'}
  rounded={'12px'}
  boxShadow={'dark-lg'}>
    {categories && categories.map(data => <Category key={data.id} data = {data}/>)}
  </Flex>

  <Flex 
  width={'100%'}
  justifyContent={'center'}
  alignItems={'center'}
  px={4}
  >
    <Routes>
      <Route path='/' element = {<Feed/>} />
      <Route path='/*' element={<Error/>} />
      <Route path='/category/:categoryId' element = {<Feed/>} />
      <Route path='/create' element = {<Create/>} />
      <Route path='/videoDetail/:videoId' element = {<VideoPinDetail/>} />
      <Route path='/search' element = {<Search/>} />
      <Route path='/userDetail/:userId' element = {<UserProfile/>} />
    </Routes>
  </Flex>
  </Flex>
  </>
  );
}

export default Home;


