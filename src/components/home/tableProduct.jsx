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
} from '@chakra-ui/react';

import { api } from '../../api/api';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';

import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

export function TableProductsPage() {
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(1);
    const result = useSelector((state) => state.product);
    const totalProducts = result.length;

    var page = result.slice(pageNumber - 1, pageNumber * 10);

    if (pageNumber > 1) {
        page = result.slice(pageNumber * 10 - 10, pageNumber * 10);
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

    async function deleteProduct(id) {
        return(
            await api.delete(`/products/${id}`).then((response) => {
                toast.success('Produto deletado com sucesso');
                dispatch(deleteProduct(id));
            })
        )
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
                            <Th>Descrição</Th>
                            <Th>Data de Fabricação</Th>
                            <Th>Data de Validade</Th>
                            <Th>Preço</Th>
                            <Th>Editar</Th>
                            <Th>Remover</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {page.map((product) => (
                            <Tr key={product.id} p="0">
                                <Td>{product.description}</Td>
                                <Td>{product.dateManu}</Td>
                                <Td>{product.dateExp}</Td>
                                <Td>
                                    R${Number(product.price).toFixed(2).replace('.', ',')}
                                </Td>
                                <Td>
                                    <Center>
                                        <Button
                                            bg="transparent"
                                            _focus={{ bg: 'transparent' }}
                                            _hover={{ bg: 'transparent' }}
                                        >
                                            <EditIcon />
                                        </Button>
                                    </Center>
                                </Td>
                                <Td>
                                    <Center>
                                        <Button
                                            onClick={() =>
                                                deleteProduct(product.id)
                                            }
                                            bg="transparent"
                                            _focus={{ bg: 'transparent' }}
                                            _hover={{ bg: 'transparent' }}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </Center>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Center>
                    <ButtonGroup mt='10' p='5' color="white" position={'absolute'}>
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
