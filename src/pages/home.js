import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import {
    Flex,
    FormControl,
    Text,
    Input,
    Center,
    Checkbox,
    InputGroup,
    InputLeftAddon,
} from '@chakra-ui/react';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';

function Home() {
    const dispatch = useDispatch();
    const [perishable, setPerishable] = useState(false);
    const { register, handleSubmit } = useForm();

    function handleChange(data) {
        var dateManu = data.dateManu;
        var dateExp = data.dateExp;
        
        if (perishable) {
            if (dateManu > dateExp) {
                toast.error('Fora do prazo de validade');
            } else if (dateManu === dateExp) {
                toast.warning('Produto se vence hoje');
            }
        }
    }
    const product = useSelector((state) => state.product);

    return (
        <Flex justify="center" bg="black" align="center" h="100vh">
            <Center bg="white" h="70vh" px="2em" borderRadius={'2xl'}>
                <ToastContainer />
                <form onSubmit={handleSubmit(handleChange)}>
                    <FormControl>
                        <Checkbox
                            fontSize={'md'}
                            fontWeight={'medium'}
                            onChange={() => setPerishable(!perishable)}
                        >
                            Perecível
                        </Checkbox>

                        <Text fontSize={'md'} fontWeight={'medium'}>
                            Descrição
                        </Text>
                        <Input
                            {...register('description')}
                            placeholder="Nome do Produto"
                        />
                        <Text fontSize={'md'} fontWeight={'medium'}>
                            Data de Fabricação
                        </Text>
                        <Input
                            {...register('dateManu')}
                            size="md"
                            type="datetime-local"
                        />
                        <Text
                            fontSize={'md'}
                            fontWeight={'medium'}
                            disabled={!perishable}
                        >
                            Data de Validade
                        </Text>
                        <Input
                            disabled={!perishable}
                            {...register('dateExp')}
                            size="md"
                            type="datetime-local"
                        />

                        <Text fontSize={'md'} fontWeight={'medium'}>
                            Preço
                        </Text>
                        <InputGroup>
                            <InputLeftAddon children="R$" />
                            <Input {...register('price')} type="number" />
                        </InputGroup>
                        <Input
                            mt="2"
                            bg="black"
                            color="white"
                            fontWeight={'bold'}
                            borderColor="black"
                            _hover={{
                                boxShadow:
                                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)',
                            }}
                            type="submit"
                        />
                    </FormControl>
                </form>
            </Center>
        </Flex>
    );
}
export default Home;
