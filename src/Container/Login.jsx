import { Button, Flex,HStack,Image } from '@chakra-ui/react';
import React from 'react';
import MusicBg from '../img/musicbg.jpg';
import {FcGoogle} from 'react-icons/fc';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {firebaseApp} from '../firebase-config.js';
import { useNavigate } from 'react-router-dom';
import {doc, getFirestore, setDoc} from 'firebase/firestore';

const Login = () => {
    const firebaseAuth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    const firebaseDb = getFirestore(firebaseApp);

    const navigate = useNavigate();

    const login = async () =>{
        const {user} = await signInWithPopup(firebaseAuth, provider);
        const {refreshToken, providerData} = user;
        

        localStorage.setItem("user",JSON.stringify(providerData));
        localStorage.setItem("accessToken", JSON.stringify(refreshToken));

        await setDoc(doc(firebaseDb,'users',providerData[0].uid),
        providerData[0]
        );

        navigate('/',{replace: true});
    };

  return (
    <Flex 
    justifyContent={"center"} 
    alignItems={"center"} 
    width={"100vw"} 
    height={"100vh"} 
    position={"relative"}>

        <Image src={MusicBg} objectFit="cover" width={"full"} height={"full"} />
        <Flex position={'absolute'} 
        width={"100vw"}
        height={"100vh"}
        bg={'blackAlpha.600'}
        top={0}
        left={0}
        justifyContent={"center"}
        alignItems={"center"}
        >

            <HStack>
                <Button 
                leftIcon={<FcGoogle fontSize={25}/>}
                colorScheme={'whiteAlpha'} 
                textColor={'whiteAlpha.900'}
                shadow={'lg'}
                onClick={()=>login()}>
                    Sign in with Google
                </Button>
            </HStack>
        </Flex>
    </Flex>
    
  )
}

export default Login
