import { useSelector } from 'react-redux';
import { useState } from 'react';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    ButtonGroup,
    Center,
    useBoolean,
} from '@chakra-ui/react';

import { api } from '../../api/api';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';

import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

import { orderProduct, deleteProduct } from '../../redux/reducers';

export function TableProductsPage() {
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(1);
    const products = useSelector((state) => state.product);
    const totalProducts = products.length;

    const [decreasing, setDecreasing] = useBoolean();

    function handleOrderPrice() {
        setDecreasing.toggle();

        if (decreasing) {
            dispatch(
                orderProduct({
                    type: 'priceDesc',
                })
            );
        } else {
            dispatch(
                orderProduct({
                    type: 'priceGrow',
                })
            );
        }
    }

    function handleOrderDateManu() {
        setDecreasing.toggle();

        if (decreasing) {
            dispatch(
                orderProduct({
                    type: 'dateManuDesc',
                })
            );
        } else {
            dispatch(
                orderProduct({
                    type: 'dateManuGrow',
                })
            );
        }
    }

    function handleOrderDateExp() {
        setDecreasing.toggle();

        if (decreasing) {
            dispatch(
                orderProduct({
                    type: 'dateExpDesc',
                })
            );
        } else {
            dispatch(
                orderProduct({
                    type: 'dateExpGrow',
                })
            );
        }
    }

    function handleOrderDescription() {
        setDecreasing.toggle();

        if (decreasing) {
            dispatch(
                orderProduct({
                    type: 'descriptionDesc',
                })
            );
        } else {
            dispatch(
                orderProduct({
                    type: 'descriptionGrow',
                })
            );
        }
    }

    var page = products.slice(pageNumber - 1, pageNumber * 10);

    if (pageNumber > 1) {
        page = products.slice(pageNumber * 10 - 10, pageNumber * 10);
    }

    function nextPage() {
        if (pageNumber >= 1 && pageNumber < totalProducts / 10) {
            setPageNumber(pageNumber + 1);
        }
        return pageNumber;
    }

    function previousPage() {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
        return pageNumber;
    }

    async function deleteProductbyId(id) {
        return await api.delete(`/products/${id}`).then((response) => {
            toast.success('Produto deletado com sucesso');
            dispatch(deleteProduct(id));
        });
    }
    async function editProduct(id) {
        console.log(id);
    }

    return (
        <div>
            <TableContainer>
                <Table fontSize={'sm'} colorScheme="white" color="white">
                    <Thead>
                        <Tr>
                            <Th onClick={handleOrderDescription}>Descrição</Th>
                            <Th onClick={handleOrderDateManu}>
                                Data de Fabricação
                            </Th>
                            <Th onClick={handleOrderDateExp}>
                                Data de Validade
                            </Th>
                            <Th onClick={handleOrderPrice}>Preço</Th>
                            <Th>Editar</Th>
                            <Th>Remover</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {page.map((product) => (
                            <Tr key={product.id} p="0">
                                <Td>{product.description}</Td>
                                <Td>{product.dateManu}</Td>
                                <Td>
                                    {product.dateExp ? product.dateExp : '-'}
                                </Td>
                                <Td>
                                    R$
                                    {Number(product.price)
                                        .toFixed(2)
                                        .replace('.', ',')}
                                </Td>
                                <Td>
                                    <Button
                                        bg="transparent"
                                        _focus={{ bg: 'transparent' }}
                                        _hover={{ bg: 'transparent' }}
                                    >
                                        <EditIcon />
                                    </Button>
                                </Td>
                                <Td>
                                    <Button
                                        onClick={() =>
                                            deleteProductbyId(product.id)
                                        }
                                        bg="transparent"
                                        _focus={{ bg: 'transparent' }}
                                        _hover={{ bg: 'transparent' }}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Center>
                    <ButtonGroup
                        mt="10"
                        p="5"
                        color="white"
                        position={'absolute'}
                    >
                        <Button
                            bg="transparent"
                            _focus={{ bg: 'transparent' }}
                            _hover={{ bg: 'transparent' }}
                            onClick={previousPage}
                        >
                            Anterior
                        </Button>
                        <Button
                            bg="transparent"
                            _focus={{ bg: 'transparent' }}
                            _hover={{ bg: 'transparent' }}
                        >
                            {pageNumber}
                        </Button>
                        <Button
                            bg="transparent"
                            _focus={{ bg: 'transparent' }}
                            _hover={{ bg: 'transparent' }}
                            onClick={nextPage}
                        >
                            Próximo
                        </Button>
                    </ButtonGroup>
                </Center>
            </TableContainer>
        </div>
    );
}
