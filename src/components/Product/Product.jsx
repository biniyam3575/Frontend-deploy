import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css';
import Loading from '../Loading/Loading';
const Product = () => {
    const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setProducts(res.data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            {isLoading ? (
            <Loading />
            ) : (
            <section className={classes.products_container}>
                {products.map((singleProduct) => (
                    <ProductCard data={singleProduct} key={singleProduct.id} />
                ))}
            </section>
            )}
        </>
        
    );
};

export default Product;