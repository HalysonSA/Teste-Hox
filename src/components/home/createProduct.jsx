import { useDispatch } from 'react-redux';
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
    Button,
} from '@chakra-ui/react';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { api } from '../../api/api';
import { addProduct } from '../../redux/reducers';

function CreateProductPage() {
    const dispatch = useDispatch();

    const [perishable, setPerishable] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    function verifyPerishable(data) {
        var dateManu = data.dateManu;
        var dateExp = data.dateExp;

        const { description, price } = data;

        if (dateManu > dateExp || dateManu === dateExp) {
            toast.error('Fora do prazo de validade');
            return false;
        } else if (description === '' || price === '') {
            return false;
        } else {
            return true;
        }
    }

    async function handleCreate(data, e) {
        e.preventDefault();
        
        const verify = verifyPerishable(data);

        try {
            if (verify) {
                await api.post('/products', data).then((response) => {
                    dispatch(addProduct(response.data));
                });
                
                toast.success('Produto cadastrado com sucesso');
            }
        } catch (err) {
            toast.error('Erro ao cadastrar produto');
        }
        e.target.reset();
    }

    return (
        <Flex justify="center" bg="black" align="center" h="80vh">
            <Center bg="white" h="70vh" px="2em" borderRadius={'md'}>
                <ToastContainer />
                <form onSubmit={handleSubmit(handleCreate)}>
                    <FormControl>
                        <Center mb="3">
                            <Text fontSize="2xl" fontWeight="bold">
                                Cadastro de Produtos
                            </Text>
                        </Center>
                        <Checkbox
                            fontSize={'md'}
                            fontWeight={'medium'}
                            onChange={() => setPerishable(!perishable)}
                        >
                            Perecível?
                        </Checkbox>

                        <Text fontSize={'md'} fontWeight={'medium'}>
                            Descrição
                        </Text>
                        <Input
                            {...register('description', { required: true })}
                            placeholder="Nome do Produto"
                        />
                        <Text fontSize={'md'} fontWeight={'medium'}>
                            Data de Fabricação
                        </Text>
                        <Input
                            type="date"
                            max="9999-12-31"
                            {...register('dateManu', { required: true })}
                            size="md"
                        />
                        <Text
                            fontSize={'md'}
                            fontWeight={'medium'}
                            disabled={!perishable}
                        >
                            Data de Validade
                        </Text>
                        <Input
                            type="date"
                            max="9999-12-31"
                            disabled={!perishable}
                            {...register(
                                'dateExp',
                                perishable ? { required: true } : {}
                            )}
                            size="md"
                        />

                        <Text fontSize={'md'} fontWeight={'medium'}>
                            Preço
                        </Text>
                        <InputGroup>
                            <InputLeftAddon children="R$" />
                            <Input
                                {...register('price', { required: true })}
                                type="text"
                            />
                        </InputGroup>
                        <Button
                            w="100%"
                            mt="2"
                            bg="black"
                            color="white"
                            fontWeight={'bold'}
                            borderColor="black"
                            _focus={{ bg: 'black' }}
                            _hover={{
                                boxShadow:
                                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)',
                            }}
                            type="submit"
                        >
                            Cadastrar
                        </Button>
                    </FormControl>
                </form>
            </Center>
        </Flex>
    );
}
export default CreateProductPage;
