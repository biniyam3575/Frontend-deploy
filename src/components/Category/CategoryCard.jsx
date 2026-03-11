import { Link } from 'react-router';
import classes from './Category.module.css';

const CategoryCard = ({ data }) => {
  return (
    <div className={classes.category_card}>
        <Link to = {`category/${data.name}`} >
            <h2>{data.title}</h2>
            <img src={data.imgLink} alt={data.title} />
            <p>Shop now</p>
        </Link>
    </div>
  );
};

export default CategoryCard;