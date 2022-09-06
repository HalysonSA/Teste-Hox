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

import { useForm } from 'react-hook-form';

import checkUser from '../authentication';

function Login() {
    const { register, handleSubmit } = useForm();

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    async function handleChange(data) {
        const response = await checkUser(data.email, data.password);
        if (response !== null) {
            localStorage.setItem('token', response);
            window.location.href = '/';
        } else {
            toast.error('Usuário ou senha inválidos');
        }
    }

    return (
        <Flex justify="center" bg="black" align="center" h="100vh">
            <Center bg="white" h="70vh" maxH="500px" px="2em" borderRadius={'2xl'}>
                <ToastContainer />
                <form onSubmit={handleSubmit(handleChange)}>
                    <FormControl>
                        <Center>
                            <Image src={Hox} w="70px" h="70px" alt="hox" />
                        </Center>
                        <Center mb="3em">
                            <Text fontSize="3xl" fontWeight={'bold'}>
                                Bem Vindo
                            </Text>
                        </Center>
                        <FormLabel> Email</FormLabel>
                        <Input
                            isRequired
                            type="email"
                            {...register('email')}
                            _hover={{ borderColor: 'black' }}
                            focusBorderColor="black"
                            placeholder="Digite seu email"
                        />
                        <FormLabel> Senha </FormLabel>

                        <InputGroup>
                            <Input
                                _hover={{ borderColor: 'black' }}
                                focusBorderColor="black"
                                pr="4.5rem"
                                type={show ? 'text' : 'password'}
                                {...register('password')}
                                placeholder="********"
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleClick}
                                >
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
                                boxShadow:
                                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)',
                            }}
                            type="submit"
                        >
                            <FormLabel m="0" color="white" fontWeight={'bold'}>
                                Login
                            </FormLabel>
                        </Button>
                    </FormControl>
                </form>
            </Center>
        </Flex>
    );
}
export default Login;
