import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    Center,
    Button,
    Text,
    InputRightElement,
    InputGroup,
    Image,
} from '@chakra-ui/react';

import { toast, ToastContainer } from 'react-toastify';

import Hox from '../assets/hox.svg';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useState } from 'react';

import checkUser from '../authentication';

function Login() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit() {
        const response = await checkUser(email, password);
        if (response !== null) {
            localStorage.setItem('token', response);
            window.location.href = '/';
        }
        toast.error('Usuário ou senha inválidos');
    }

    return (
        <Flex justify="center" bg="black" align="center" h="100vh">
            <Center bg="white" h="70vh" px="2em" borderRadius={'2xl'}>
                <ToastContainer />
                <FormControl>
                    <Center>
                        <Image src={Hox} w="70px" h="70px" alt="hox" />
                    </Center>
                    <Center mb="3em">
                        <Text
                            fontSize="3xl"
                            textTransform={'capitalize'}
                            fontWeight={'bold'}
                        >
                            welcome to hox
                        </Text>
                    </Center>
                    <FormLabel> Email</FormLabel>
                    <Input
                        isRequired
                        type="email"
                        _hover={{ borderColor: 'black' }}
                        focusBorderColor="black"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormLabel> Password </FormLabel>

                    <InputGroup>
                        <Input
                            _hover={{ borderColor: 'black' }}
                            focusBorderColor="black"
                            pr="4.5rem"
                            type={show ? 'text' : 'password'}
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button
                        bg="black"
                        w="100%"
                        mt="3"
                        _focus={{ bg: 'black' }}
                        _hover={{
                            boxShadow: '0 5px 20px 0px rgb(0,0,0,0.5)',
                        }}
                        onClick={handleSubmit}
                    >
                        <FormLabel m="0" color="white" fontWeight={'bold'}>
                            Login
                        </FormLabel>
                        
                    </Button>
                </FormControl>
            </Center>
        </Flex>
    );
}
export default Login;