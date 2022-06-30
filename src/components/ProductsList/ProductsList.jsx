import { Box, Container, Pagination, Slider, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsContext } from '../../contexts/productContext/productContext';
import ProductCard from '../ProductCard/ProductCard';

const ProductsList = () => {
    const { products, getProducts, pages } = useContext(productsContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('q') ? searchParams.get('q') : '');
    const [currentPage, setCurrentPage] = useState(searchParams.get('_page') ? +searchParams.get('_page') : 1);
    const [price, setPrice] = useState([1, 100000])

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        // console.log('search changed');
        setSearchParams({
            q: search,
            _page: currentPage,
            _limit: 2,
            price_gte: price[0],  //g - greater, e -equal
            price_lte: price[1],  //l - less, e - equal
        })
    }, [search, currentPage, price])


    useEffect(() => {
        getProducts()
    }, [searchParams])

    return (
        <Container>
            <Box>
                <TextField 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    label="Search" variant="outlined" 
                />
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={price}
                    onChange={(e, value) => {
                        setPrice(value)
                    }}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100000}
                    step={1000}
                />
            </Box>
            <Box>
                {products.map(item => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </Box>
            <Box>
                <Pagination onChange={(event, page) => {
                    // console.log(page)
                    setCurrentPage(page)
                }}
                page={currentPage}
                count={pages} 
                color="primary" />
            </Box>
        </Container>
    );
};

export default ProductsList;