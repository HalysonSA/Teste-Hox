import {
    Button,
    ButtonGroup,
    Box,
    Input,
    Text,
    Checkbox,
} from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '../../api/api';
import { toast, ToastContainer } from 'react-toastify';

import { useForm } from 'react-hook-form';

export function EditProduct(product_) {
    const { product } = product_;
    const [perishable, setPerishable] = useState(false);
    const { register, handleSubmit } = useForm();

    function verifyPerishable(data) {
        var dateManu = data.dateManu;
        var dateExp = data.dateExp;

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
        <form onSubmit={handleSubmit(handleUpdate)}>
            <Box color="white" fontSize={'md'}>
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
                <ButtonGroup my="3">
                    <Button
                        borderRadius={'0'}
                        colorScheme={'green'}
                        type="submit"
                    >
                        Salvar
                    </Button>
                    <Button borderRadius={'0'} colorScheme={'red'}>
                        Cancelar
                    </Button>
                </ButtonGroup>
            </Box>
        </form>
    );
}
