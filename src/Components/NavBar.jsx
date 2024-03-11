import React, { useState } from 'react';
// import logo from "../img/logo.png";
// import logo_dark from "../img/logo_dark.png";
// import fire_logo from "../img/fire-styled-logo-removebg-preview.png";
import DJ_logo from '../img/DJ.png';
import { Link, useNavigate} from 'react-router-dom';
import { Button, Flex, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text, border, useColorMode, useColorModeValue } from '@chakra-ui/react';
import {IoAdd, IoLogOut, IoMoon, IoSearch, IoSunny} from 'react-icons/io5';
import { color } from 'framer-motion';
import { getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../firebase-config';
import sound from '../audio/Touch.mp3';
import switchAudio from '../audio/switch.mp3';
import stopAudio from '../audio/stop.mp3';


const NavBar = ({user}) => {
  const {colorMode, toggleColorMode} = useColorMode();
  const bg = useColorModeValue('gray.600', 'gray.300');
  const navigate = useNavigate();
  const [playaudio, setPlayAudio] = useState(0);

  // const [search,setSearch] = useState("");
  // const firestoreDb = getFirestore(firebaseApp);
  // const [feeds, setFeeds] = useState(null);
  // const [loading, setLoading] = useState(false);

  const clearCacheData = () => {
    caches.keys().then((names) => {
        names.forEach((name) => {
            caches.delete(name);
        });
    });
    // alert('Complete Cache Cleared')
   };

  //  const handleSearch =(e)=>{
  //     e.preventDefault();
  //     searchFeed(firestoreDb,title).then((data)=>{
  //       setFeeds(data);
  //     }); 
  //   }

  const play = () =>{
    if(!playaudio){
      setPlayAudio(1);
      new Audio(sound).play();
      setPlayAudio(0);
    }
  }
  const playSwitch = () =>{
    if(!playaudio){
      setPlayAudio(1);
      new Audio(switchAudio).play();
      setPlayAudio(0);
    }
  }
  const playStop = () =>{
    if(!playaudio){
      setPlayAudio(1);
      new Audio(stopAudio).play();
      setPlayAudio(0);
    }
  }

  return (
  <Flex justifyContent={'space-between'}
  alignItems={'center'}
  width={'100vw'}
  flexDirection={{base:'column', lg:'row',xl:'row'}}
  p={4}>
    <Link to={'/'}>
      <Flex direction={'row'} textAlign={'center'} onClick={playSwitch}>
      <Image src={colorMode == 'light' ? DJ_logo: DJ_logo} width={{base:'80px',lg:'100px', xl:'130px'}} />
      <Text fontSize={{base:25,lg:35}} mt={{base:4,lg:8}} fontFamily={'Nosifer ,cursive'} ml={-2}>Rhythm</Text>
      </Flex>
    </Link>

    <InputGroup mx={6} width={{base:'90vw',lg:'60vw'}}>
    <InputLeftElement 
    pointerEvents='none'
    children = {<IoSearch fontSize={25} />}>
    </InputLeftElement>
    <Input
    //  onChange={(e)=>{setSearch(e.target.value)}}
    type='text' 
    placeholder='Search...' 
    fontSize={{base:15,lg:18}} 
    fontWeight={'medium'} 
    variant={'filled'} 
    />
    <Button mx={{base:1,lg:2}} fontSize={{base:15,lg:18}} bg={bg} textColor={(bg =='gray.300') ? 'blackAlpha.900' : 'AliceBlue'}
    >Search</Button>
  </InputGroup>

  <Flex 
  justifyContent={'center'}
  alignItems={'center'}
  mt={5}
  >
    <Flex 
    width={'40px'} 
    height={'40px'} 
    justifyContent={'center'}
    alignItems={'center'}
    cursor={'pointer'}
    borderRadius={'5px'}
    onClick={toggleColorMode}
    >
      {colorMode == 'light' ? 
      <IoMoon fontSize={25} onClick={play} /> : <IoSunny fontSize={25} onClick={play} />}

    </Flex>
  {/* Create Button */}
      <Link to={'/create'}> 
        <Flex 
        justifyContent={'center'} 
        alignItems={'center'} 
        bg={bg} 
        width={{base:'25px',lg:'40px'}} 
        height={{base:'25px',lg:'40px'}} 
        borderRadius={'5px'}
        mx={6}
        cursor={'pointer'}
        _hover={{shadow: "md"}}
        transition="ease-in-out"
        transitionDuration={"0.3s"}
        onClick={playSwitch}
        >
          <IoAdd fontSize={25} color={`${colorMode == "dark" ? "#111" : "#f1f1f1"}`} />
        </Flex>
      </Link>

      {/* Profile menu */}
        <Menu>
          <MenuButton onClick={playStop}>
            <Image
               src={user ?.photoURL}
               width={'40px'} 
               height={'40px'} 
               rounded={'full'}
            />
          </MenuButton>
          <MenuList shadow={'lg'}>
            <Link to={`/userDetail/${user?.uid}`}>
              <MenuItem onClick={play}>My Account</MenuItem>
            </Link>
            <MenuItem 
               flexDirection={'row'} 
               alignItems={'center'} 
               gap={4}
               onClick={()=>{
                  localStorage.clear();
                  navigate('/login', {replace: true});
                  clearCacheData();
                  playSwitch();
               }}>
              Logout <IoLogOut fontSize={20} /></MenuItem>
          </MenuList>
        </Menu>
    </Flex>
  </Flex>
  );
}

export default NavBar;
