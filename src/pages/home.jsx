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
} from '@chakra-ui/react';

function Home() {
    function handleLogout() {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <Tabs bg="black">
            <TabList color="white">
                <Flex
                    alignItems={'center'}
                    fontSize={'2xl'}
                    fontWeight={'bold'}
                    alignContent={'center'}
                >
                    <Text>Home</Text>
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
