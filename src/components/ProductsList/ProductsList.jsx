import { Box, Container } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { productsContext } from '../../contexts/productContext/productContext';
import ProductCard from '../ProductCard/ProductCard';

const ProductsList = () => {
    const { products, getProducts } = useContext(productsContext);
    useEffect(() => {
        getProducts()
    }, [])
    // console.log(products);
    return (
        <Container>
            <Box>
                {products.map(item => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </Box>
        </Container>
    );
};

export default ProductsList;