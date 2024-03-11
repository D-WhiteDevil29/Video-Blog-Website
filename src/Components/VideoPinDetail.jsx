import { Box, Button, ButtonGroup, Flex, Grid, GridItem, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { IoHome, IoPause, IoPlay, IoTrash } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from './Spinner';
import { firebaseApp } from '../firebase-config';
import { deleteVideo, getSpecificVideo, getUserInfo, recommendedFeed } from '../utils/fetchData';
import { getFirestore } from 'firebase/firestore';
import ReactPlayer from 'react-player';
import { MdFullscreen, MdOutlineForward10, MdOutlineReplay, MdOutlineReplay10, MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import logo from '../img/logo.png';
import DJ from '../img/DJ.png'
import { useRef } from 'react';
import screenfull from 'screenfull';
import {FcApproval} from 'react-icons/fc';
import moment from 'moment/moment';
import { fetchUser } from '../utils/fetchUser';
import HTMLReactParser from 'html-react-parser';
import RecommendedVideo from './RecommendedVideo';
import buzzer from '../audio/wrong-buzzer.wav';
import Mselect from '../audio/modern-select.wav';
import switchAudio from '../audio/switch.mp3';
import Touch from '../audio/Touch.mp3';

const format = (seconds) =>{
  if(isNaN(seconds)){
    return "00:00";
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2,"0");

  if(hh){
    return `${hh}:${mm.toString().padStart(2,"0")} : ${ss}`;
    // 01:02:32
  }

  return `${mm}:${ss}`;
  //02:35
}

const VideoPinDetail = () => {
  const { videoId } = useParams();
  const textColor = useColorModeValue('gray.900','gray.50');

  //firebase database instance
  const firestoredb = getFirestore(firebaseApp);

  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [feeds, setFeeds] = useState(null);

  const [localUser] = fetchUser();
  const navigate = useNavigate();
  
  //custom reference
  const playerRef = useRef();
  const playerContainer = useRef();

  const play = () =>{
    new Audio(Mselect).play();
  }
  const playSwitch = () =>{
    new Audio(switchAudio).play();
  }
  const playBuzzer = () =>{
    new Audio(buzzer).play();
  }
  const playTouch = () =>{
    new Audio(Touch).play();
  }


  useEffect(()=>{
    if(elapsedTime === totalDuration){
      setIsPlaying(false);
    }
  },[muted, volume, played]);

  const onvolumechange = (e) =>{
     setVolume(parseFloat(e/100));
     
     e === 0 ? setMuted(true) : setMuted(false);
  };

  const handleFastRewind = () =>{
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };
  const handleFastForward = () =>{
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) =>{
    if(!seeking){
      setPlayed(parseFloat(changeState.played / 100) * 100);
    };
  };

  const handleSeekChange = (e) =>{
    setPlayed(parseFloat(e/100));
  };

  const onSeekMouseDown = (e) =>{
    setSeeking(true);
  };

  const onSeekMouseUp = (e) =>{
    setSeeking(false);
    playerRef.current.seekTo(e/100);
  };

  const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : "00:00";

  const duration = playerRef.current ? playerRef.current.getDuration(): "00:00";

  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);

  useEffect(()=>{
    if(videoId){
       setIsLoading(true);
       getSpecificVideo(firestoredb,videoId).then(data=>{
          setVideoInfo(data);

          recommendedFeed(firestoredb,data.category, videoId).then((feed)=>{
              setFeeds(feed);
          });

          getUserInfo(firestoredb,data.userId).then((user)=>{
            setUserInfo(user);
        });
        setIsLoading(false);
      });
    };
  },[videoId]);
  
  

  const deleteTheVideo = (videoId) =>{
    setIsLoading(true);
    deleteVideo(firestoredb, videoId);
    playBuzzer();
    navigate("/",{replace: true});
  }

  if(isLoading) return <Spinner/>

  return (
    <Flex
       width={'full'}
       height={'auto'}
       justifyContent={'center'}
       alignItems={'center'}
       direction={'column'}
       py={2}
       px={{base:2,lg:4,xl:4}}
    >

       <Flex alignItems={'center'} width={'full'} my={4}>
          <Link to={'/'}>
            <IoHome fontSize={{base:15,lg:25,xl:25}} />
          </Link>
          <Box width='1px' height={'25px'} bg={'gray.500'} mx={2}></Box>
          <Text
             isTruncated
             color={textColor}
             fontWeight={'semibold'}
             width={'100%'}
          >
            {videoInfo?.title}
          </Text>
       </Flex>

       {/* Main Grid for video */}
       <Grid
          templateColumns={{base:'repeat(1,1fr)', lg:'repeat(2,1fr)',xl:'repeat(4,1fr)'}}
          gap={{base:0.8,lg:2,xl:2}}
          width={'100%'}
       >
         <GridItem width={'100%'} colSpan={{base:1,lg:3,xl:3}} >
            <Flex 
              width={'full'}
              bg={'black'}
              position={'relative'}
              ref={playerContainer}
            >
              <ReactPlayer 
                 ref={playerRef}
                 url={videoInfo?.videoUrl}
                 width={'100%'}
                 height={'100%'}
                 playing={isPlaying}
                 muted = {muted}
                 volume={volume}
                 onProgress={handleProgress}
              />
              {/* Controls for video player */}
              <Flex
                position={'absolute'}
                top={0}
                left={0}
                right={0}
                bottom={0}
                direction={'column'}
                justifyContent={'space-between'}
                alignItems={'center'}
                zIndex={1}
                cursor={'pointer'}
              >
                 
                 {/* play icon */}
                 <Flex 
                    alignItems={'center'} 
                    justifyContent={'center'}
                    onClick={()=>{
                      setIsPlaying(!isPlaying);
                    }}
                    width={'full'}
                    height={'full'}
                 >
                    {!isPlaying && (
                       <IoPlay fontSize={{base:'20px',lg:'60px'}} color='#f2f2f2' cursor={'pointer'}/>
                    )}
                 </Flex>

                 {/* Progress controls */}
                 <Flex
                   width={'full'}
                   alignItems={'center'}
                   direction={'column'}
                   px={{base:2,lg:4}}
                   bgGradient={'linear(to-t,blackAlpha.900,blackAlpha.500, blackAlpha.50'}
                 >

                      <Slider 
                         aria-label='slider-ex-1' 
                         min={0}
                         max={100}
                         value={played * 100}
                         transition={'ease-in-out'}
                         transitionDuration={'0.2'}
                         onChange={handleSeekChange}
                         onMouseDown={onSeekMouseDown}
                         onChangeEnd={onSeekMouseUp}
                      >
                        <SliderTrack bg={'teal.50'}>
                          <SliderFilledTrack bg={'teal.300'}/>
                        </SliderTrack>
                        <SliderThumb boxSize={3} bg={'teal.300'} transition={'ease-in-out'}
                         transitionDuration={'0.2'} />
                      </Slider>


                      {/* Other Slider Controls */}
                      <Flex 
                         width={'full'}
                         alignItems={'center'}
                         my={{base:2, lg:2, xl:2}}
                         gap={{base:1,lg:10,xl:10}}
                      >
                          <MdOutlineReplay10 
                             fontSize={{base:10,lg:30,xl:30}} 
                             color={'#f1f1f1'} 
                             cursor={'pointer'}
                             onClick={handleFastRewind} 
                          />

                          <Box onClick={()=>{setIsPlaying(!isPlaying);}}>
                            {!isPlaying ? (
                              <IoPlay 
                                 fontSize={{base:8,lg:30,xl:30}}
                                 color='#f2f2f2' 
                                 cursor={'pointer'}
                              />
                            ) : (
                              <IoPause 
                                 fontSize={{base:8,lg:30,xl:30}}
                                 color='#f2f2f2' 
                                 cursor={'pointer'}/>
                            )}
                          </Box>

                          <MdOutlineForward10
                             fontSize={{base:10,lg:30,xl:30}}
                             color={'#f1f1f1'} 
                             cursor={'pointer'}
                             onClick={handleFastForward} 
                          />

                          {/* Volume Controls */}
                          <Flex alignItems={'center'}>
                            <Box onClick={()=> setMuted(!muted)}>
                              {!muted ? (
                                 <MdVolumeUp 
                                   fontSize={{base:10,lg:30,xl:30}}
                                   color='#f1f1f1'
                                   cursor={'pointer'}
                                 /> ):(
                                 <MdVolumeOff
                                   fontSize={{base:10,lg:30,xl:30}}
                                   color='#f1f1f1'
                                   cursor={'pointer'}
                                 />
                                 )
                              }
                            </Box>

                            <Slider 
                              aria-label='slider-ex-1' 
                              defaultValue={volume * 100} 
                              min={0}
                              max={100}
                              size={'sm'}
                              width={{base:8,lg:16,xl:16}}
                              mx={2}
                              onChangeStart={onvolumechange}
                              onChangeEnd={onvolumechange}
                            >
                              <SliderTrack bg={'teal.50'}>
                                <SliderFilledTrack bg={'teal.300'}/>
                              </SliderTrack>
                              <SliderThumb boxSize={2} bg={'teal.300'} />
                           </Slider>
                          </Flex>

                          {/* Duration of video */}
                          <Flex alignItems={'center'} gap={2}>
                             <Text fontSize={{base:8,lg:16,xl:16}} color={'whitesmoke'}>
                               {elapsedTime}
                             </Text>
                             <Text fontSize={{base:8,lg:16,xl:16}} color={'whitesmoke'}>
                               /
                             </Text>
                             <Text fontSize={{base:8,lg:16,xl:16}} color={'whitesmoke'}>
                               {totalDuration}
                             </Text>
                          </Flex>

                          <Image src={DJ} width={{base:'20px',lg:'60px',xl:'60px'}} ml={'auto'}/>
                          <Text fontSize={{base:'8px',lg:'30px',xl:'30px'}} fontFamily={'Nosifer, cursive'} ml={{base:-1,lg:-5,xl:-10}} textColor={'#f1f1f1'}>Rhythm</Text>

                          <MdFullscreen 
                             fontSize={{base:15,lg:30,xl:30}}
                             color='#f1f1f1' 
                             cursor={'pointer'}
                             onClick={()=>{
                              screenfull.toggle(playerContainer.current);
                              playSwitch();
                             }}
                          />
                      </Flex>
                </Flex>
              </Flex>
            </Flex>

            {/* Video Description */}
            {
               videoInfo?.description && (
                <Flex
                  my={6}
                  direction={'column'}
                >
                   <Text my={2} fontSize={25} fontWeight={'semibold'}>Description</Text>
                   {HTMLReactParser(videoInfo?.description)}
                </Flex>
               )
            }
         </GridItem>
         <GridItem width={'100%'} colSpan={'1'} >
            {userInfo && (
              <Flex direction={'column'} width={'full'}>
                <Flex alignItems={'center'} width={'full'} cursor={'pointer'} onClick={()=>navigate(`/userDetail/${userInfo.uid}/`)}>
                   <Image
                     src={userInfo?.photoURL}
                     rounded={'full'}
                     width={'60px'}
                     height={'60px'}
                     minHeight={'60px'}
                     minWidth={'60px'}
                   />

                   <Flex direction={'column'} ml={3} onClick={playTouch}>
                      <Flex alignItems={'center'}>
                        <Text 
                            isTruncated
                            color={textColor}
                            fontWeight={'semibold'}
                        >
                           {userInfo?.displayName}
                        </Text>
                        <FcApproval />
                      </Flex>

                      {videoInfo?.id && (
                        <Text fontSize={12}>
                          {moment(new Date(parseInt(videoInfo.id)).toISOString()).fromNow()}
                        </Text>
                      )}
                   </Flex>
                </Flex>

                {/* Action Buttons */}
                <Flex justifyContent={'space-around'} mt={6}>
                   {
                      userInfo?.uid === localUser.uid && (
                        <Popover closeOnEsc>
                          <PopoverTrigger>
                            <Button
                              colorScheme={'red'}
                              onClick={play}>
                                <IoTrash fontSize={{base:15,lg:20}} color='#fff' />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                             <PopoverArrow />
                             <PopoverCloseButton />
                             <PopoverHeader>Confirmation!</PopoverHeader>
                             <PopoverBody>Are you sure you want delete this video?</PopoverBody>
                             <PopoverFooter display='flex' justifyContent='flex-end'>
                                <ButtonGroup size='sm'>
                                <Button colorScheme='red' onClick={()=>deleteTheVideo(videoId)}>Yes</Button>
                                </ButtonGroup>
                                </PopoverFooter>
                          </PopoverContent>
                         </Popover>
                      )
                   }

                   <a href={videoInfo.videoUrl} download onClick={(e)=> e.stopPropagation()}>
                    <Button
                       colorScheme='whatsapp'
                       rounded={'full'}
                       my={2}
                       mt={0}
                       onClick={playTouch}
                    >Download</Button>
                   </a>
                </Flex> 
              </Flex>
            )}
         </GridItem>
       </Grid>

        { feeds && (
            <Flex direction={'column'} width={'full'} my={6}>
              <Text my={4} fontSize={25} fontWeight={'semibold'}>
                Recommended Videos
              </Text>
              <RecommendedVideo feeds = {feeds} />
            </Flex>
          )}
    </Flex>
  );
};

export default VideoPinDetail;
