import React, { useEffect, useState, useContext } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router';
import { productUrl } from '../../Api/endPoints';
import classes from './ProductDetail.module.css';
import Rating from '@mui/material/Rating';
import Loading from '../../components/Loading/Loading';
import { DataContext } from '../../components/DataProvider/DataProvider';
import { Type } from '../../Utils/action.type';

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();
  const [state, dispatch] = useContext(DataContext);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]);

  const addToCart = () => {
    dispatch({ type: Type.ADD_TO_CART, item: product });
  };

  return (
    <Layout>
      {isLoading ? <Loading /> : (
        <section className={classes.detail_container}>
          <div className={classes.image_container}>
            <img src={product.image} alt={product.title} />
          </div>
          
          <div className={classes.info_container}>
            <h1 className={classes.title}>{product.title}</h1>
            
            <div className={classes.rating_wrapper}>
              <Rating value={product.rating?.rate || 0} precision={0.5} readOnly />
              <span className={classes.review_count}>{product.rating?.count} ratings</span>
            </div>
            
            <hr />
            
            <h2 className={classes.price}>${product.price?.toFixed(2)}</h2>
            
            <div className={classes.description_box}>
              <h3>About this item</h3>
              <p>{product.description}</p>
            </div>
            
            <button className={classes.add_button} onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;