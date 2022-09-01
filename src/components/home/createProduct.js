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
import { api } from '../../api/api';
import { ADD_PRODUCT } from '../../redux/actions';

function CreateProductPage() {

    const dispatch = useDispatch();

    const [perishable, setPerishable] = useState(false);
    const { register, handleSubmit } = useForm();

    function verifyPerishable(date) {
        var dateManu = date.dateManu;
        var dateExp = date.dateExp;

        if (dateManu > dateExp || dateManu === dateExp) {
            toast.error('Fora do prazo de validade');
            return false;
        } else {
            return true;
        }
    }

    function handleChange(date) {
        if (verifyPerishable(date)) {
            api.post('/products', date);
            dispatch(ADD_PRODUCT(date));
        }
    }

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
export default CreateProductPage;
