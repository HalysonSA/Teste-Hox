import CreateProductPage from '../components/home/createProduct';

import { TableProductsPage } from '../components/home/tableProduct';

import {
    Tabs,
    Box,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
    Button,
    Flex,
    useMediaQuery,
} from '@chakra-ui/react';

function Home() {
    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

    function handleLogout() {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <Tabs bg="black">
            <TabList color="white">
                <Flex
                    alignItems={'center'}
                    p='2'
                    fontSize={'2xl'}
                    fontWeight={'bold'}
                    alignContent={'center'}
                >
                    {isLargerThan1280 ? <Text>Hox</Text> : null}
                    {isLargerThan1280 ? (
                        <Button
                            right={'0'}
                            position={'absolute'}
                            onClick={handleLogout}
                            bg="transparent"
                            _hover={{ bg: 'transparent' }}
                            _focus={{ bg: 'transparent' }}
                        >
                            Sair
                        </Button>
                    ) : (
                        <Button
                            onClick={handleLogout}
                            bg="transparent"
                            _hover={{ bg: 'transparent' }}
                            _focus={{ bg: 'transparent' }}
                        >
                            Sair
                        </Button>
                    )}
                </Flex>
                <Tab>Cadastro de Produtos</Tab>
                <Tab>Relatório de Produtos</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <CreateProductPage />
                </TabPanel>
                <TabPanel>
                    <TableProductsPage />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

export default Home;
