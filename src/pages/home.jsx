import CreateProductPage from '../components/home/createProduct';

import { TableProductsPage } from '../components/home/tableProduct';

import { Navbar } from '../components/home/navbar';

import { Tabs, TabPanels, TabPanel } from '@chakra-ui/react';


function Home() {
    return (
        <Tabs bg="black">
             <Navbar/>
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
