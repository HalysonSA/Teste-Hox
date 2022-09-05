import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

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
    useDisclosure,
    Modal,
    ModalContent,
} from '@chakra-ui/react';
import { api } from '../../api/api';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';

import {
    EditIcon,
    DeleteIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
} from '@chakra-ui/icons';

import { orderProduct, deleteProduct } from '../../redux/reducers';
import { EditProduct } from './editProduct';
import { setProducts } from '../../redux/reducers';
import moment from 'moment/moment';

export function TableProductsPage() {
    const dispatch = useDispatch();
    const [decreasing, setDecreasing] = useBoolean();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [pageNumber, setPageNumber] = useState(1);
    const [productSet, setProduct] = useState({});

    const products = useSelector((state) => state.product);

    const totalProducts = products.length;

    useEffect(() => {
        async function getProducts() {
            try {
                const products = await api.get('/products');
                dispatch(setProducts(products.data));
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, []);

    function handleOrderPrice() {
        setDecreasing.toggle();

        if (decreasing) {
            dispatch(
                orderProduct({
                    type: 'priceDec',
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
                    type: 'dateManuDec',
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
                    type: 'dateExpDec',
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
                    type: 'descriptionDec',
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
        return await api.delete(`/products/${id}`).then(() => {
            toast.success('Produto deletado com sucesso');
            dispatch(deleteProduct(id));
        });
    }
    function handleEditProduct(product) {
        setProduct(product);
        onOpen();
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
                            <Tr key={product.id} m="0">
                                <Td>{product.description}</Td>

                                <Td>
                                    {moment(product.dateManu).format(
                                        'DD/MM/YYYY'
                                    )}
                                </Td>
                                <Td>
                                    {product.dateExp === '1111-11-11'
                                        ? '-'
                                        : moment(product.dateExp).format(
                                              'DD/MM/YYYY'
                                          )}
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
                                        onClick={() =>
                                            handleEditProduct(product)
                                        }
                                        _focus={{ bg: 'transparent' }}
                                        _hover={{ bg: 'transparent' }}
                                    >
                                        <EditIcon />
                                    </Button>
                                    <Modal
                                        initialFocusRef={null}
                                        finalFocusRef={null}
                                        isOpen={isOpen}
                                        onClose={onClose}
                                    >
                                        <ModalContent bg="gray.700" p="4">
                                            {productSet.id ? (
                                                <EditProduct
                                                    product={productSet}
                                                />
                                            ) : null}
                                            <Center>
                                                <Button
                                                    borderRadius={'0'}
                                                    w="80%"
                                                    onClick={onClose}
                                                    colorScheme={'red'}
                                                >
                                                    Cancel
                                                </Button>
                                            </Center>
                                        </ModalContent>
                                    </Modal>
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
                            {pageNumber === 1 ? null : <ArrowLeftIcon />}
                        </Button>
                        <Button
                            bg="transparent"
                            fontSize={'lg'}
                            fontWeight={'Bold'}
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
                            {pageNumber < totalProducts / 10 ? (
                                <ArrowRightIcon />
                            ) : null}
                        </Button>
                    </ButtonGroup>
                </Center>
            </TableContainer>
        </div>
    );
}
