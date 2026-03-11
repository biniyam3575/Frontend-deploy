import classes from './ProductCard.module.css';
import Rating from '@mui/material/Rating'; 
import { useContext ,useState} from 'react';
import { Link } from 'react-router';
import { DataContext } from '../DataProvider/DataProvider';
import {Type} from '../../Utils/action.type'

const ProductCard = ({ data }) => {
    const { id, title, image, price, rating } = data;
    const [isLoading, setIsLoading] = useState(true);
    const [state,dispatch] = useContext(DataContext);
    const addToCart = () => {
        dispatch({
            type: Type.ADD_TO_CART,
            item: data
        })
    }
    return (
        <div className={classes.card_container}>
            <Link to={`/product/${id}`} className={classes.card_link}>
                <img src={image} alt={title} />
                <div className={classes.card_details}>
                    <h3>{title}</h3>
                </div>
            </Link>
            
            <div className={classes.rating_container}>
                <Rating value={rating?.rate || 0} precision={0.5} readOnly size="small" />
                <small>({rating?.count || 0})</small>
            </div>
            
            <div className={classes.price_and_button}>
                <p className={classes.price}>${price}</p>
                <button className={classes.button} onClick={addToCart}>Add to cart</button>
            </div>
        </div>
       
        
    );
};

export default ProductCard;