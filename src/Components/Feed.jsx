import React, { useEffect, useState } from 'react';
import {getFirestore} from 'firebase/firestore';
import { firebaseApp } from '../firebase-config';
import { categoryFeeds, getAllFeeds } from '../utils/fetchData';
import Spinner from '../Components/Spinner';
import {SimpleGrid } from '@chakra-ui/react';
import VideoPin from './VideoPin';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';

const Feed = () => {

  //firestore database instance
  const firestoreDb = getFirestore(firebaseApp);
  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(false);
  const {categoryId} = useParams();

  useEffect(() =>{
    setLoading(true);
    if(categoryId){
       categoryFeeds(firestoreDb, categoryId).then((data)=>{
         setFeeds(data);
         setLoading(false);
        //  onmouseover.disabled = true;
        //  setTimeout(() => {
        //   onmouseover.disabled = false;
        // }, 5000);
       })
    }
    else{
      getAllFeeds(firestoreDb).then(data => {
         setFeeds(data);
         setLoading(false);
        //  onmouseover.disabled = true;
        //  setTimeout(() => {
        //   onmouseover.disabled = false;
        // }, 5000);
      });
    }
  },[categoryId]);

  if(loading) return <Spinner msg={"Loading your feeds..."}/>;
  if(!feeds?.length > 0) return <NotFound/>

  return (
    <SimpleGrid 
        minChildWidth={{base:'240px', lg:'300px', xl:'300px'}} 
        autoColumns={'max-content'}
        spacing={4}
        width={'full'}
        mx={2}
        overflowX={'hidden'}
    >
          {feeds && feeds.map((data) => (
            <VideoPin key={data.id} maxWidth = {440} data={data} height='80px'/>
          ))}
     </SimpleGrid>
  )
}

export default Feed;
