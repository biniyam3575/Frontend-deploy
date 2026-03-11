import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useParams } from 'react-router';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../components/Product/ProductCard';
import classes from './Result.module.css'; 
import Loading from '../../components/Loading/Loading';

const Result = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryName } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setCategory(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [categoryName]);

  return (
    <Layout>
      <section className={classes.results_container}>
        <div className={classes.results_header}>
            <h1>Results</h1>
            <p>Category / {categoryName}</p>
        </div>
        <hr />
        
        {isLoading ? (
          <Loading />
        ) : (
          <div className={classes.products_grid}>
            {category?.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Result;