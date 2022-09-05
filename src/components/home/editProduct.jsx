import { Button, ButtonGroup, Box, Input, Text } from '@chakra-ui/react';

export function EditProduct(product_) {
    const {product} = product_
    return (
        <Box color="white" fontSize={'md'}>
            <Text>Descrição</Text>
            <Input variant="flushed" placeholder={product.description} />
            <Text>Preço</Text>
            <Input variant="flushed" placeholder={product.price} />
            <Text>Data de fabricação</Text>
            <Input
                variant="flushed"
                placeholder={product.dateManu}
                type="date"
                max="9999-12-31"
            />
            <Text>Data de validade</Text>
            <Input
                variant="flushed"
                placeholder={product.dateExp}
                type="date"
                max="9999-12-31"
            />
            <ButtonGroup my="3">
                <Button borderRadius={'0'} colorScheme={'green'}>
                    Salvar
                </Button>
                <Button borderRadius={'0'} colorScheme={'red'}>
                    Cancelar
                </Button>
            </ButtonGroup>
        </Box>
    );
}
