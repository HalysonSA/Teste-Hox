import { Button, Center, Box, Input, Text, Checkbox } from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '../../api/api';
import { toast, ToastContainer } from 'react-toastify';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export function EditProduct(product_) {
    const { product } = product_;
    const [perishable, setPerishable] = useState(false);
    const { register, handleSubmit } = useForm();
    useEffect(() => {
        product.dateExp != '1111-11-11' ? setPerishable(true) : setPerishable(false);
    }, [perishable]);

    function verifyPerishable(data) {
        var dateManu = data.dateManu;
        var dateExp = data.dateExp || product.dateExp;

        if (dateManu > dateExp || dateManu === dateExp) {
            toast.error('Fora do prazo de validade');
            return false;
        }

        return true;
    }

    async function handleUpdate(data) {
        if (verifyPerishable(data)) {
            await api.patch(`/products/${product.id}`, data).then(() => {
                toast.success('Produto cadastrado com sucesso');
            });
        }
        return false;
    }

    return (
        <Center>
            <Box color="white" w="80%" fontSize={'md'}>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <Checkbox
                        fontSize={'md'}
                        fontWeight={'medium'}
                        isChecked={perishable}
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
                            placeholder={product.description}
                        />
                    </Box>
                    <Box>
                        <Text fontSize={'md'} fontWeight={'medium'}>
                            Data de Fabricação
                        </Text>
                        <Input
                            {...register('dateManu', { required: true })}
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
