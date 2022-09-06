import { Button, Center, Box, Input, Text, Checkbox } from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '../../api/api';
import { toast, ToastContainer } from 'react-toastify';
import { updateProduct } from '../../redux/reducers';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export function EditProduct(product_) {
    const { product } = product_;
    const [perishable, setPerishable] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();

    function verifyPerishable(data) {
        var dateManu = data.dateManu;
        var dateExp = data.dateExp || product.dateExp;

        if (dateManu > dateExp || dateManu === dateExp) {
            toast.error('Fora do prazo de validade');
            return false;
        }

        return true;
    }

    async function handleUpdate(data, e) {

        data.id = product.id;
        e.preventDefault();

        if (verifyPerishable(data)) {
            await api.patch(`/products/${product.id}`, data).then(() => {
                dispatch(updateProduct(data));
                toast.success('Produto atualizado com sucesso');
            });
        }
        e.target.reset();
    }

    return (
        <Center>
            <ToastContainer />
            <Box color="white" w="80%" fontSize={'md'}>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <Checkbox
                        fontSize={'md'}
                        fontWeight={'medium'}
                        onChange={() => setPerishable(!perishable)}
                    >
                        Perecível?
                    </Checkbox>
                    <Box>
                        <Text fontSize={'md'} fontWeight={'medium'}>
                            Descrição
                        </Text>
                        <Input
                            type="text"
                            variant="flushed"
                            {...register('description', { required: true })}
                            defaultValue={product.description}
                            placeholder={product.description}
                        />
                    </Box>
                    <Box>
                        <Text fontSize={'md'} fontWeight={'medium'}>
                            Data de Fabricação
                        </Text>
                        <Input
                            {...register('dateManu', { required: true })}
                            defaultValue={product.dateManu}
                            variant="flushed"
                            type="date"
                            max="9999-12-31"
                            size="md"
                        />
                    </Box>
                    <Box>
                        <Text fontSize={'md'} fontWeight={'medium'}>
                            Data de Validade
                        </Text>
                        <Input
                            defaultValue={product.dateExp}
                            disabled={!perishable}
                            {...register(
                                'dateExp',
                                perishable ? { required: true } : {}
                            )}
                            variant="flushed"
                            type="date"
                            max="9999-12-31"
                            size="md"
                        />
                    </Box>
                    <Box>
                        <Text fontSize={'md'} fontWeight={'medium'}>
                            Preço
                        </Text>
                        <Input
                            defaultValue={product.price}
                            {...register('price', { required: true })}
                            variant="flushed"
                            placeholder={'R$' + product.price}
                            type="text"
                        />
                    </Box>
                    <Button
                        mt="5"
                        w="100%"
                        borderRadius={'0'}
                        colorScheme={'green'}
                        type="submit"
                    >
                        Salvar
                    </Button>
                </form>
            </Box>
        </Center>
    );
}
